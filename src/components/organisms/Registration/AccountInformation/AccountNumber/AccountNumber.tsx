import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { AccountNumberProps as Props, AccountInf } from './AccountNumber.types';
import componentStyles from './AccountNumber.styles';
import Input from 'src/components/atoms/Input/Input';
import { yupResolver } from '@hookform/resolvers/yup';

//Images
import IdCard from 'icons/IdCard.svg';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import { useForm } from 'react-hook-form';
import { AccountInfo } from 'domain/entities/accountInfo';
import RegisterService from 'adapter/api/registerService';
import Button from 'src/components/atoms/Button/Button';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { Dimensions, Platform } from 'react-native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
/**
 * Render a AccountNumber.
 * @since 1.0.0
 */
const AccountNumber: React.FC<Props> = (props) => {
  const { setAsyncError, handleNext, setAccountInfo, actionResetForm, openwarning, statusMaintenance } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();
  const { closeModal, setModal } = useBottomSheet();

  const [validateAccount] = RegisterService.useValidateAccountMutation();
  const [verifyCodeEcw] = RegisterService.useVerifyCodeEcwMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<AccountInfo>({
    resolver: yupResolver(AccountInf),
    mode: 'onBlur'
  })
  const { setAlertErrorMessage } = useErrorAlert();
  const onValidSubmit = useCallback(
    async (values) => {
      try {
        const response = await verifyCodeEcw(values).unwrap();

        switch (response?.cause) {
          case 'SUCCESS':
            const res = await validateAccount(values).unwrap();
            handleNext({ ...values, state: res?.state }, 3);
            setAccountInfo(values)
            break;
          case 'ATTEMPTS':
            setModal({
              render: () => (<ModalWarning
                isIconAlert
                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{response?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts2')}</Text></>}
                onPress={() => { closeModal(); actionResetForm() }} />),
              height: 380
            })
            break;
          case 'VERIFIED':
            setModal({
              render: () => (<ModalWarning
                isIconAlert
                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{response?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                onPress={() => { closeModal(); actionResetForm() }} />),
              height: 380
            })
            break;
          case 'TRIES':
            setModal({
              render: () => (
                <ModalWarning
                  isIconAlert
                  warningText={`${t(`errors.limit1`)} ${response?.timer} ${t(`errors.limit2`)}`}
                  onPress={() => {
                    closeModal(); actionResetForm();
                  }}
                />
              ), height: 300, blockModal: true
            });
            break;

          default:
            break;
        }
      } catch (error) {
        setAlertErrorMessage(t(`errors.code${error}`))
      }
    },
    [validateAccount],
  );

  return (
    <>
      <Input
        icon={<IdCard />}
        inputStyle={{ width: '85%' }}
        placeholder={t('createAccount.inputs.accountNumber')}
        label={t('createAccount.inputs.accountNumber')}
        name={'accountNumber'}
        control={control}
        error={errors.accountNumber}
      />

      <DatePickerController
        control={control}
        name={'dateOfBirth'}
        label={t('createAccount.inputs.dateBirth')}
        error={errors.dateOfBirth}
        style={{ width: '85%' }}
        pikerStyle={{ width: Dimensions.get('window').width * 0.85 }}
      />
      <Text style={styles.note}>{t('createAccount.note')}</Text>

      <Button
        style={{ width: 200, marginBottom: 15 }}
        accesibilityLabel={t('accessibility.next')}
        title={t('createAccount.buttons.next')}
        onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : handleSubmit(onValidSubmit)} />
    </>
  );
};

export default AccountNumber;
