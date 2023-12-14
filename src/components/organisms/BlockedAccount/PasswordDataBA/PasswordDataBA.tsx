import React, { useCallback, useEffect } from 'react'
import { View, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SupportChatBlue from 'icons/supportChatBlue.svg';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PasswordData, PasswordDataBAProps as Props, PasswordInfo } from './PasswordDataBA.types';
import componentStyles from './PasswordDataBA.styles';
//Components
import Button from 'src/components/atoms/Button/Button';
import Input from 'src/components/atoms/Input/Input';
//Images
import LockAltIcon from 'icons/LockAltIcon.svg';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { userSendPass } from 'domain/entities/userUnblockAccount';
import unblockService from 'adapter/api/unblockService';
import OkIcon from 'icons/OkIcon.svg';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';

/**
 * Render a PasswordDataBA.
 * @since 1.0.0
 */
const PasswordDataBA = (props: Props) => {
  const { style, handlerNext, formValues, valueCode, navigateSupportChat } = props;
  const { styles, colors } = useStyles(componentStyles);
  const { closeModal, setModal } = useBottomSheet();
  const { setAlertErrorMessage } = useErrorAlert();
  const [sendPass] = unblockService.useSendPassMutation();
  const { t } = useTranslation();


  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<PasswordData>({   
    resolver: yupResolver(PasswordInfo),  
    mode: 'onBlur'
  }) 

  const handleValidate = ()=>{    
    setModal({
      render: () => (
          <ModalWarning
              isIconAlert
              warningText={ t(`unblockAccount.passwordValidation`) }
              textButton={ t(`unblockAccount.accept`) }
              onPress={() => { closeModal() }}
          />  
      ), height: 320, blockModal: false
    });         
  }

  const onValidSubmit = useCallback(
    async (value: PasswordData) => {
      try {
        var vl: any = await AsyncStorage.getItem('newData');    
        vl = JSON.parse( vl ); 
        
        const data: userSendPass = {
          pass: value.pass,
          idBelongState: vl?.idBelongState,
          code: valueCode
        }
        await sendPass(data).unwrap();
        openModal2();
      }catch( error ) {
        setAlertErrorMessage(t(`errors.code${error}`))
      }
    },
    [sendPass, valueCode, formValues],
  );

  const openModal2 = () => {
    setModal({
      render: () => (
        <View style={styles.containerModal}>
          <OkIcon />
          <Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t('forgotPassword.confirmed')}</Text>
          <Button
            onPress={() => { closeModal(); AsyncStorage.removeItem('newData'); handlerNext() }}
            title={t('common.accept')}
            style={{ marginBottom: 24 }} />
        </View>
      ), height: 250, blockModal: true
    });
  }

  return (   
    <View style={styles.container}>
      <Text style={styles.title_font} maxFontSizeMultiplier={1.3}>{t('unblockAccount.password')}</Text>

      <Input
        icon={<LockAltIcon />}
        labelStyle={{ color: colors.BLUEDC1 }}
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
        accessibilityRole="button"
        style={{marginTop: 30}}
        title={t('unblockAccount.btnNext')}
        onPress={ Object.keys( errors ).length > 0 ? handleValidate : handleSubmit( onValidSubmit ) } 
      />
      <Button
        accessibilityRole="button"
        accesibilityHint='button'
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

export default PasswordDataBA