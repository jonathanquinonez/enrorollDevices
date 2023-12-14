import React, { useCallback, useEffect, useMemo } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PasswordData, PasswordDataFPProps as Props, PasswordInfo } from './PasswordDataFP.types';
import componentStyles from './PasswordDataFP.styles';
//Components
import Button from 'src/components/atoms/Button/Button';
import Input from 'src/components/atoms/Input/Input';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ForgotService from 'adapter/api/forgotService';
import { ChangePasswordDTO } from 'infrastructure/keraltyApi/models/auth';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
//Images
import LockAltIcon from 'icons/LockAltIcon.svg';
import OkIcon from 'icons/OkIcon.svg';
import BlockPassIcon from 'icons/BlockPassIcon.svg';
import SupportChatBlue from 'icons/supportChatBlue.svg';

/**
 * Render a PasswordDataFP.
 * @since 1.0.0
 */
const PasswordDataFP = (props: Props) => {
  const { style, handlerNext, formValues, valueCode, navigateSupportChat } = props;
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();
  const { setAlertErrorMessage } = useErrorAlert();
  const [changePassword] = ForgotService.useChangePasswordMutation();
  const { closeModal, setModal } = useBottomSheet();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<PasswordData>({
    resolver: yupResolver(PasswordInfo),
    mode: 'onBlur'
  })

  useEffect(()=>{
    if(errors.pass?.type && errors.pass?.type != 'required') openModalOk();
  },[errors])

  const openModalOk = () => {
    setModal({
        render: () => (
            <View style={styles.containerModal}>
                <BlockPassIcon />
                <Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t(`forgotPassword.infoPass`)}</Text>
                <Button
                    onPress={() => closeModal()}
                    title={t('common.accept')}
                    style={{ marginBottom: 24 }} />
            </View>
        ), height: 330
    });
}

  const onValidSubmit = useCallback(
    async (value: PasswordData) => {
      try {
        const data: ChangePasswordDTO = {
          pass: value.pass,
          code: valueCode,
          idBelongState: formValues.id
        }
        await changePassword(data).unwrap();
        openModal2();
      } catch (error) {
        setAlertErrorMessage(t(`errors.code${error}`))
      }
    },
    [changePassword, valueCode, formValues],
  );

  const openModal2 = () => {
    setModal({
      render: () => (
        <View style={styles.containerModal}>
          <OkIcon />
          <Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t('forgotPassword.confirmed')}</Text>
          <Button
            onPress={() => { closeModal(); handlerNext() }}
            title={t('common.accept')}
            style={{ marginBottom: 24 }} />
        </View>
      ), height: 250, blockModal: true
    });
  }

  return (
    <View style={styles.container}>
      <Input
        icon={<LockAltIcon />}
        labelStyle={{ color: colors.BLUEDC1, marginTop: 20 }}
        passwordInput
        inputStyle={{ width: Dimensions.get('window').width * 0.88 }}
        placeholder={t('createAccount.placeholders.createPassword')}
        label={t('createAccount.inputs.createPassword')}
        name='pass'
        showPasswordStrength
        control={control}
        error={errors.pass}
      />
      <Input
        icon={<LockAltIcon />}
        labelStyle={{ color: colors.BLUEDC1 }}
        passwordInput
        inputStyle={{ width: Dimensions.get('window').width * 0.88 }}
        placeholder={t('createAccount.placeholders.confirmPassword')}
        label={t('createAccount.inputs.confirmPassword')}
        name='confirmPassword'
        control={control}
        error={errors.confirmPassword} />

      <Button
        accesibilityLabel={t('accessibility.next')}
        style={{ marginTop: 30 }}
        title={t('forgotPassword.buttons.next')}
        onPress={handleSubmit(onValidSubmit)}
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

export default PasswordDataFP