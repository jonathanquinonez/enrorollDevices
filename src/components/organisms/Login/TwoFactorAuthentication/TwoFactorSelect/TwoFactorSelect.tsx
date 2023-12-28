import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import useStyles from 'hooks/useStyles';
import Input from 'src/components/atoms/Input/Input';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Button from 'src/components/atoms/Button/Button';
import componentStyles from './TwoFactorSelect.styles';
import MobileAlt from 'icons/MobileAlt.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation, useRoute } from '@react-navigation/native';
import TwoFactorHeader from 'src/components/organisms/Login/TwoFactorAuthentication/TwoFactorHeader/TwoFactorHeader';
import { twoFactorSelectors } from 'adapter/user/twoFactor/twoFactorSelectors';
import { userSelectors } from 'adapter/user/userSelectors';
import AuthService from 'adapter/api/authService';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import PaperPlane from 'icons/PaperPlane.svg';
import { twoFactorActions } from 'adapter/user/twoFactor/twoFactorSlice';

const TwoFactorSelect = (props: any) => {

    const navigation = useNavigation();
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const [sendByEmail, setSendByEmail] = useState<boolean | undefined>()
    const [asyncError, setAsyncError] = useState<string | undefined>();

    const { email, phone } = useAppSelector(twoFactorSelectors.selectVerifyEmailAndMobile);
    const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
    const [fetchRequestCodeEmailMobile] = AuthService.useFetchRequestCodeEmailMobileMutation();
    const { closeModal, setModal } = useBottomSheet();
    const dispatch = useAppDispatch();


    const openModalWarning = (text: string) => {
      setModal({
          render: () => (
              <ModalWarning
                  icon={<PaperPlane />}
                  warningText={text}
                  onPress={() => { closeModal(); navigation.navigate('TwoFactorVerifyScreen');}}
              />
          ), height: 300, blockModal: true
      });
    }
    
    const openModalBlock = ({nextPage}: { nextPage: boolean}) => {

      const ts: any = <Text style={{ color: '#055293', fontSize: 14 }} maxFontSizeMultiplier={1.3}>
      <Text style={{ fontWeight: "bold", fontSize: 20, color: '#002D57' }} maxFontSizeMultiplier={1.3}>{t(`unblockAccount.yourBlockAccount`)}{'\n\n'}</Text>
          {t(`unblockAccount.excededTheNumero`)}
      </Text>;

      setModal({
        render: () => (
          <ModalWarning
            isIconAlert
            warningText={ts}
            textButton={t(`blackList.navigateUnblockAccount`)}
            onPress={() => {
              nextPage ?
                (closeModal(), navigation.navigate('BlockedAccountScreen'))
                :
                closeModal()
            }}
          />
        ), height: 320, blockModal: false
      });
    }

    const nextSelectCode = useCallback(
      async () => {

        const payload = {
          email,
          phone,
          state: locationSelected,
          isEnglish: t('general.locale') == 'en' ? true : false,
          isEmail: sendByEmail,
          resend: false
        }

        try {
          
          const resp: any = await fetchRequestCodeEmailMobile(payload);
          if(resp?.error) {
            throw Error(resp?.error + resp?.status);
          }

          const { idTemp, attemps } = resp?.data;
          dispatch(twoFactorActions.setIdTempAndAttemps({idTemp, attemps, isEmail: sendByEmail}));

          if(attemps && attemps == '-1') {
            openModalBlock({nextPage: true});
            return;
          }

          openModalWarning(t(`authorizationModal.title${sendByEmail ? 'Email' : 'Mobile'}`));

        } catch (err) {
          throw Error(JSON.stringify(err));
        }
      }, [sendByEmail]
    )


    const maskEmail = (email: string) => {

        let split = email.split('@');
        let hide = split[0].substring(3).split('').fill('*').join('');
        
        if (email)
            if(split[0].length > 3 ){
                return split[0].substring(0, 3) + hide + '@' + split[1];
                // email.substring(0, 3) + new Array(split[0].length - 1).fill('*').join('') + '@' + split[1]
            }else {
                return email;
            }
        return '';
    };
    const maskPhone = (phone = '9999999999') => {
        // 6 digits + special characters () -
        return `******${phone.substring(9, phone.length)}`
    }

    return (
      <>
        <TwoFactorHeader>
          <KeyboardAwareScrollView>
            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
              <Text style={styles.textVerification} maxFontSizeMultiplier={1.2}>
                {t('login.twoFactorAuthentication.title')}
              </Text>
              <Text style={styles.text} maxFontSizeMultiplier={1.2}>
                {t('login.twoFactorAuthentication.description')}
              </Text>
            </View>
            <Text style={styles.textSelectEmail} maxFontSizeMultiplier={1.3}>
              {t('createAccount.inputs.selectEmail')}
            </Text>
            <View style={styles.contentRow}>
              <RadioButton
                accessibilityRole='radio'
                isSelected={sendByEmail}
                onPress={() => setSendByEmail(true)}
                textStyle={styles.textRadioButton}
                style={styles.radioButton} />
              <Input
                editable={false}
                icon={<EnvelopeIcon />}
                inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                placeholder={''}
                value={maskEmail(email ?? '')}
                name={t('createAccount.inputs.selectEmail')} />
            </View>
            <Text style={styles.textMobileNumber} maxFontSizeMultiplier={1.3}>
                {t('createAccount.inputs.selectMobileNumber')}
            </Text>
            <View style={[styles.contentRow, { marginBottom: 32 }]}>
              <RadioButton
                accessibilityRole='radio'
                isSelected={sendByEmail == undefined ? undefined : !sendByEmail}
                onPress={() => setSendByEmail(false)}
                textStyle={styles.textRadioButton}
                style={styles.radioButton} />
              <Input
                editable={false}
                icon={<MobileAlt />}
                inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                placeholder={''}
                value={maskPhone(phone ?? '')}
                name={t('createAccount.inputs.selectMobileNumber')} />
            </View>
            {asyncError && (
              <View style={{ marginBottom: 10, width: '85%', alignSelf: 'center' }}>
                <Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>{t(`errors.code${asyncError}`)}</Text>
              </View>
            )}
            <Button
              accesibilityLabel={t('accessibility.next')}
              style={{ width: 200, marginBottom: 50, alignSelf: 'center' }}
              title={t('createAccount.buttons.next')}
              disabled={sendByEmail == undefined ? true : false}
              onPress={() => nextSelectCode()} />
          </KeyboardAwareScrollView>
        </TwoFactorHeader>
      </>
    );
}

export default TwoFactorSelect;