import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {CodeField,useClearByFocusCell,useBlurOnFulfill, Cursor} from 'react-native-confirmation-code-field';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import useStyles from 'hooks/useStyles';
import Button from 'src/components/atoms/Button/Button';
import { VerifyMessageProps as Props } from './TwoFactorVerify.type';
import componentStyles from './TwoFactorVerify.style';
import TwoFactorHeader from '../TwoFactorHeader/TwoFactorHeader';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { twoFactorSelectors } from 'adapter/user/twoFactor/twoFactorSelectors';
import { userSelectors } from 'adapter/user/userSelectors';
import AuthService from 'adapter/api/authService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE } from 'config/constants/Global';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { twoFactorActions } from 'adapter/user/twoFactor/twoFactorSlice';
import PaperPlane from 'icons/PaperPlane.svg';

const TwoFactorVerify: React.FC<Props> = (props) => {
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const { reset } = useNavigation();
    const [loadingBtn, setLoading] = useState(false);
    const navigation = useNavigation()
    const [value, setValue] = useState<any>('');
    const [numberTries, setNumberTries] = useState(0);
    const [valuesParse, setValuesParse] = useState<any>();
    const codeContainer = useBlurOnFulfill({ value, cellCount: 6 });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });
    const { email, phone, value: valueLogin} = useAppSelector(twoFactorSelectors.selectVerifyEmailAndMobile);
    const { isEmail, idTemp } = useAppSelector(twoFactorSelectors.selectRequestCodeEmailMobile);
    const { } = useAppSelector(twoFactorSelectors.selectVerifyEmailAndMobile);
    const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
    const [ sendConfirmCode ] = AuthService.useSendConfirmCodeMutation();
    const { setAlertErrorMessage } = useErrorAlert();
    const [login] = AuthService.useLoginSecurityMutation();
    const { closeModal, setModal } = useBottomSheet();
    const [fetchRequestCodeEmailMobile] = AuthService.useFetchRequestCodeEmailMobileMutation();
    const dispatch = useAppDispatch();

    const openModalCodeExpired = (text: string, textBtn: string) => {
        setModal({
          render: () => (
            <ModalWarning
              isIconAlert
              warningText={text}
              textButton={textBtn}
              onPress={() => {closeModal(), reset({ index: 0, routes: [{ name: 'Login' }] })}}
            />
          ), height: 320, blockModal: false
        });
    }

    const openModalResend = () => {
        setModal({ 
            render: () => (
                <ModalWarning
                    icon={ <PaperPlane /> }
                    warningText={ isEmail ? t(`login.twoFactorAuthentication.textResenCodeEmail`) : t(`login.twoFactorAuthentication.textResenCodePhone`) }
                    textButton={ t(`unblockAccount.accept`) }
                    styleBtn={{ marginBottom: 24 }}
                    onPress={() => { closeModal() }}
                />
            ), height: 280, blockModal: false
        });
    }

    const validateChange = () => {
        if (value && value.length === 6) {
            setValue(value.substring(0, value.length - 1))
        }
    }

    const openModalBlock = ({nextPage, message}: { nextPage: boolean, message: string}) => {

        const ts: any = <Text style={{ color: '#055293', fontSize: 14 }} maxFontSizeMultiplier={1.3}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: '#002D57' }} maxFontSizeMultiplier={1.3}>{t(`unblockAccount.yourBlockAccount`)}{'\n\n'}</Text>
            {message}
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

    const resendsms = useCallback(
        async () => {

            try {

                const payload = {
                    email,
                    phone,
                    state: locationSelected,
                    isEnglish: t('general.locale') == 'en' ? true : false,
                    isEmail,
                    resend: true
                }

                const resp: any = await fetchRequestCodeEmailMobile(payload);
                if(resp?.error) {
                    throw Error(resp?.error + resp?.status);
                }

                const { idTemp, attemps } = resp?.data;
                dispatch(twoFactorActions.setIdTempAndAttemps({idTemp, attemps, isEmail}));

                if(attemps && attemps == '-1') {
                    openModalBlock({nextPage: true, message: t('login.twoFactorAuthentication.textBlockResenCode')});
                    return;
                }

                openModalResend();
                console.log("payload: ", payload);
                console.log("resp: ", resp);

            } catch (err) {
                
            }
            
        }, []
    )


    const onSendCode = useCallback(
        async () => {

            try {
                
                const payload = {
                    idTemp,
                    code: value,
                    state: locationSelected
                }
                console.log("payloadConfirm: ", payload);

                const resp: any = await sendConfirmCode(payload);
                if(resp?.error) {
                    throw Error(resp?.error + resp?.status);
                }

                const { success, attemps} = resp?.data;

                if(attemps && attemps == '-1') {
                    openModalBlock({nextPage: true, message: t('login.twoFactorAuthentication.textBlockMessage')});
                    return;
                }

                if(success && success == "true") {
                    
                    const { email, password } = valueLogin?.credentials;
                    const payloadLogin = {
                        email,
                        password,
                        state: locationSelected!,
                        isBiometric: valueLogin.type === 'biometrical' || valueLogin.type === 'biometricalUpdate' ? true : false
                    }

                    console.log("payloadLogin: ", payloadLogin);

                    loginApp(payloadLogin);
                    
                }else{

                    if(success && success == 'CODE_EXPIRED') {
                        openModalCodeExpired(t(`unblockAccount.codeExpired`), t(`unblockAccount.accept`));
                    }

                    setNumberTries(attemps);
                    setAlertErrorMessage(t(`errors.code150`));
                }

            } catch (err) {
                throw Error(JSON.stringify(err));
            }

        }, [value]
    )


    const loginApp = async (payloadLogin: any) => {
        await login(payloadLogin).then(async (result: any) => {
            if (result.data) {
                if (result.data?.token == '-1') {
                    openModalBlock({nextPage: true, message: t('login.twoFactorAuthentication.textBlockMessage')});
                }

                if (valueLogin.type === 'biometricalUpdate') {
                    await AsyncStorage.setItem(ASYNC_STORAGE.BIOMETRICALTERMS, 'true');
                    await AsyncStorage.setItem(ASYNC_STORAGE.BIOMETRICALUSER, JSON.stringify({ ...valueLogin.credentials, state: locationSelected }));
                    await AsyncStorage.setItem(ASYNC_STORAGE.BIOMETRICALOPTION, 'true');
                }
                if (valueLogin.type === 'biometrical') {
                    await AsyncStorage.setItem(ASYNC_STORAGE.BIOMETRICALUSER, JSON.stringify({ ...valueLogin.credentials, state: locationSelected }));
                    await AsyncStorage.setItem(ASYNC_STORAGE.BIOMETRICALOPTION, 'true');
                }

            } else {
                setAlertErrorMessage(t(`errors.code${result.error}`))
            }
        })

    }

    return (
        <TwoFactorHeader>
            <View style={styles.container}>
                <View>
                    <Text style={styles.textOption} maxFontSizeMultiplier={1.2}>
                        {t('login.twoFactorAuthentication.title')}
                    </Text>
                    <Text style={styles.textOption2} maxFontSizeMultiplier={1.2}>
                        {t('login.twoFactorAuthentication.descriptionVerify')}
                    </Text>
                </View>
                <CodeField
                    ref={codeContainer}
                    {...props}
                    value={value}

                    onChangeText={setValue}
                    cellCount={6}
                    onPressIn={() => validateChange()}
                    rootStyle={styles.codeFiledRoot}
                    keyboardType="numeric"
                    renderCell={({ index, symbol, isFocused }) => (
                        <View style={[styles.cell, isFocused && styles.focusCell]} key={index}>
                            <Text
                                maxFontSizeMultiplier={1.3}
                                key={index}
                                style={{
                                    fontFamily: 'proxima-regular',
                                    fontSize: 18,
                                    color: '#5B5C5B',
                                    textAlign: 'center'
                                }}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        </View>
                    )}
                />
                {numberTries == 1 && (
                    <View style={{ marginBottom: 10, width: '85%', alignSelf: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'red', fontSize: 10 }} maxFontSizeMultiplier={1.3}>{t(`createAccount.triesA`)}</Text>
                    </View>
                )}
                <Button onPress={() => resendsms()} style={{ marginBottom: 50, marginTop: 30 }} title={t('createAccount.validation.rout')} variant='Underline' />
                <Button accesibilityLabel={t('accessibility.next')} disabled={value && value.length === 6 ? false : true} style={{ marginTop: 20 }} title={t('createAccount.buttons.next')} onPress={() => onSendCode()} />
            </View>
        </TwoFactorHeader>
    );
}

export default TwoFactorVerify;