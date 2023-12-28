import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, View, Text } from 'react-native';
import { useConfirmPayment, CardField } from '@stripe/stripe-react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PaymentScreenProps as Props, ValidateEmail } from './PaymentScreen.types';
import componentStyles from './PaymentScreen.styles';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { userActions } from 'adapter/user/userSlice';
import CreditCard from 'src/components/molecules/CreditCard/CreditCard';
import Button from 'src/components/atoms/Button/Button';
import Input from 'src/components/atoms/Input/Input';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PaymentTransaction } from 'src/screens/GetCareNow/Payment/ModalBody/ModalBody.types';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import PaymentService from 'adapter/api/paymentService';


/**
 * Render a PaymentScreen.
 * @since 1.0.0
 */
const PaymentScreen = (props: Props) => {
  const { style, ageDataInsurance, cancelPayment, transactionId, setAlertErrorMessage, closeModal } = props;
  const { styles, colors } = useStyles(componentStyles);
  const [focusedField, setFocusedField] = useState('');
  const [expiryMonth, setExpiryMonth] = useState(0);
  const [expiryYear, setExpiryYear] = useState(0);
  const [numCard, setNumCard] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [paymentIntent] = PaymentService.usePaymentIntentMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<{ email: string }>({
    resolver: yupResolver(ValidateEmail),
    mode: 'onBlur'
  })

  const fetchPaymentIntentClientSecret = useCallback(
    async () => {
      try {
        if (transactionId) {
          const { clientSecret } = await paymentIntent(transactionId).unwrap();
          return { clientSecret, id: transactionId };
        } else {
          return { clientSecret: '', id: '', codeError: '' };
        }
      } catch (error) {
        return { clientSecret: '', id: '', codeError: error };
      }
    },
    [paymentIntent, transactionId],
  );

  const { confirmPayment, loading } = useConfirmPayment();
  const financial = (x: string | undefined) => {
    return x ? Number.parseFloat(x).toFixed(2) : 0;
  }
  const handlePayPress = useCallback(async () => {
    if (isValid) {
      dispatch(userActions.setPaymentResponse(undefined))

      // Gather the customer's billing information (for example, email)
      const billingDetails = {
        email: getValues('email'),
      };

      // Fetch the intent client secret from the backend
      const { clientSecret, id, codeError } = await fetchPaymentIntentClientSecret();
      dispatch(loaderActions.setLoading(true));
      if (clientSecret) {
        dispatch(userActions.setIsPaymentProcess(120))
        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret,
          {
            paymentMethodType: 'Card',
            paymentMethodData: {
              billingDetails,
            },
          },
          {
            setupFutureUsage: undefined,
          }
        );

        if (error) {
          dispatch(userActions.setPaymentResponse({
            ...error, id, status: 'Declined'
          }))
        } else if (paymentIntent) {
          dispatch(userActions.setPaymentResponse({ ...paymentIntent, id, payId: paymentIntent.id }))
        };
      }
      dispatch(userActions.setIsPaymentProcess(1))
      dispatch(loaderActions.setLoading(false));
      closeModal();
      if(codeError) setAlertErrorMessage(t(`errors.code${codeError}`))
    }
  }, [isValid])

  return (
    <View style={{ alignSelf: 'center' }}>
      <CreditCard
        isValid={isValid}
        numCard={numCard}
        cardType={focusedField}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear} />
      <Text style={styles.label} maxFontSizeMultiplier={1.3}>Card information*</Text>
      <CardField
        postalCodeEnabled={false}
        accessible={true}
        autofocus={false}
        cardStyle={styles.input}
        style={styles.containerInput}
        accessibilityViewIsModal
        onCardChange={(cardDetails) => {
          if (cardDetails.validCVC == 'Valid' &&
            cardDetails.validExpiryDate == 'Valid' &&
            cardDetails.validNumber == 'Valid') setIsValid(true)
          else setIsValid(false)

          setExpiryMonth(cardDetails.expiryMonth)
          setNumCard(cardDetails.last4)
          setExpiryYear(cardDetails.expiryYear)
        }}
        onFocus={(focusedField) => {
          if (focusedField) setFocusedField(focusedField)
        }}
      />
      <Input
        icon={<EnvelopeIcon />}
        labelStyle={{ color: colors.BLACK3 }}
        inputStyle={{ width: Dimensions.get('window').width * 0.8 }}
        styleError={{ width: Dimensions.get('window').width * 0.8 }}
        placeholder={t('createAccount.placeholders.eMail')}
        label={t('createAccount.inputs.eMail')}
        keyboardType='email-address'
        name={'email'}
        onPressIn={() => setFocusedField('CardNumber')}
        control={control}
        error={errors.email}
      />
      <Button
        style={styles.btn}
        onPress={handleSubmit(handlePayPress)}
        title={`${t('common.pay')} $${financial(ageDataInsurance?.total.toString()) ?? 0.00}`}
        disabled={loading} />

      <Button
        style={[styles.btn, { marginTop: 10 }]}
        onPress={() => {
          cancelPayment();
        }}
        title={t('common.cancel')}
        disabled={loading} />
    </View>
  )
}

export default PaymentScreen