import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { VerificationDataBAProps as Props } from './VerificationDataBA.types';
import componentStyles from './VerificationDataBA.styles';
//Components
import Button from 'src/components/atoms/Button/Button';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Input from 'src/components/atoms/Input/Input';
import SupportChatBlue from 'icons/supportChatBlue.svg';
//Images
import AsyncStorage from '@react-native-async-storage/async-storage';
import MobileAlt from 'icons/MobileAlt.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import { userUnblockAccount, userOptonValidate } from 'domain/entities/userUnblockAccount';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ModalCodeSentFP from '../../ForgotPassword/ContactInfoData/ModalCodeSentFP/ModalCodeSentFP';
import ForgotService from 'adapter/api/forgotService';
import unblockService from 'adapter/api/unblockService';
import PaperPlane from 'icons/PaperPlane.svg';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';

/**
 * Render a VerificationDataBA.
 * @since 1.0.0
 */
const VerificationDataBA = (props: Props) => {
  const { style, onPress, onPressClose, formValues, navigateSupportChat } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();
  const { setAlertErrorMessage } = useErrorAlert();
  const { setModal, closeModal } = useBottomSheet();
  const [sendByEmail, setSendByEmail] = useState<boolean | undefined>()
  const changeValues = (type: string) => setSendByEmail(type == 'email' ? true : false);
  const [sendVal] = unblockService.useGetBelongIdStateMutation();
  const [sendCode] = unblockService.useSendRecoverAccountMutation();


  const handleValidate = () => {
    sendByEmail != true && sendByEmail != false ?
      setAlertErrorMessage(t('forgotPassword.requredCheck'))
      :
      onValidSubmit()
  }


  const onValidSubmit = useCallback(
    async () => {
      try {
        const getData: userOptonValidate = {
          "email": formValues.email,
          "phoneNumber": sendByEmail ? null : formValues.mobile,
          "name": formValues.firstName,
          "idBelongState": formValues.idBelongState,
          "isEnglish": t('general.locale') == 'en',
          "byEmail": sendByEmail ? true : false
        };

        const respCode = await sendCode(getData).unwrap();
        var text: any;

        if (respCode?.cause == 'VERIFIED' || respCode?.cause == 'ATTEMPTS') {
          text = respCode?.cause == 'VERIFIED' ? t(`unblockAccount.limitIncorrectCodeTwo`) : t(`unblockAccount.limitIncorrectCodeThree`);
          text = text.replace("30", respCode?.timer);
          setModal({
            render: () => (
              <ModalWarning
                isIconAlert
                warningText={text}
                onPress={() => { closeModal(), onPressClose() }}
              />
            ), height: 310, blockModal: true
          });
        } else {
          setModal({
            render: () => (<ModalCodeSentFP isMobile={!sendByEmail} onPress={() => (onPress(getData), AsyncStorage.setItem('newData', JSON.stringify(getData)))} />),
            height: 310
          })
        }
      } catch (error) {
        if (error == '230') {
          const txt = <Text style={{ color: '#3CA70D', fontSize: 18 }} maxFontSizeMultiplier={1.3}>
            <Text style={{ fontWeight: "400", fontSize: 18, color: '#055293' }} maxFontSizeMultiplier={1.3}>{t(`unblockAccount.CodeRequestLimitTitle`)}{'\n\n'}</Text>
            {t(`unblockAccount.CodeRequestLimitSubTitle`)}
          </Text>;
          setModal({
            render: () => (
              <ModalWarning
                icon={<PaperPlane />}
                warningText={txt}
                variantBtn={'Text'}
                styleTextBtn={{ color: '#3CA70D', fontWeight: "bold", textDecorationLine: 'underline' }}
                textButton={'Close'}
                onPress={() => { closeModal() }}
              />
            ), height: 380, blockModal: true
          });
        } else {
          setAlertErrorMessage(t(`errors.code${error}`));
        }
      }
    },
    [sendByEmail, sendCode],
  );

  let maskEmail = (email: string) => {
    let split = email.split('@');
    if (email)
      return (
        email.substr(0, 3) + new Array(split[0].length - 1).fill('*').join('') + '@' + split[1]
      );
    return '';
  };

  const maskPhone = (phone = '9999999999') => {
    // 6 digits + special characters () -
    return `******${phone.substring(9, phone.length)}`
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title_font} maxFontSizeMultiplier={1.3}>{t('unblockAccount.verification')}</Text>
      <Text style={styles.subtitle} maxFontSizeMultiplier={1.3}>{t('unblockAccount.subtitle2')}</Text>

      <Text style={styles.textSelectEmail} maxFontSizeMultiplier={1.3}>
        {t('createAccount.inputs.selectEmail')}
      </Text>
      <View style={styles.contentRow}>
        <RadioButton
          accessibilityRole='radio'
          isSelected={sendByEmail}
          onPress={() => changeValues('email')}
          textStyle={styles.textRadioButton}
          style={styles.radioButton} />
        <Input
          icon={<EnvelopeIcon />}
          editable={false}
          inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
          placeholder={''}
          value={maskEmail(formValues?.email)}
          name={t('createAccount.inputs.selectEmail')} />
      </View>

      <Text style={styles.textMobileNumber} maxFontSizeMultiplier={1.3}>
        {t('createAccount.inputs.selectMobileNumber')}
      </Text>
      <View style={[styles.contentRow, { marginBottom: 32 }]}>
        <RadioButton
          accessibilityRole='radio'
          isSelected={sendByEmail == undefined ? undefined : !sendByEmail}
          onPress={() => changeValues('mobile')}
          textStyle={styles.textRadioButton}
          style={styles.radioButton} />
        <Input
          icon={<MobileAlt />}
          editable={false}
          inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
          placeholder={''}
          value={maskPhone(formValues?.mobile)}
          name={t('createAccount.inputs.selectMobileNumber')} />
      </View>
      <Button
        accessibilityRole="button"
        title={t('unblockAccount.btnNext')}
        onPress={() => handleValidate()}
      />

      <Button
        accessibilityRole="button"
        style={ styles.btnSupport }
        textStyle={ styles.textBtnSupport }
        title={ t('unblockAccount.btnSupportChat') }
        variant={'Underline'}
        onPress={ navigateSupportChat }
        icon={ <SupportChatBlue /> } 
      />  
    </View>
  )
}

export default VerificationDataBA