import React, { useCallback, useEffect, useState } from 'react';
import {
    CodeField,
    useClearByFocusCell,
    useBlurOnFulfill, Cursor
} from 'react-native-confirmation-code-field';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
// Types, Styles
import useStyles from 'hooks/useStyles';
import { VerifyCodeProps as Props } from './VerifyCode.types';
import componentStyles from './VerifyCode.styles';
//Components
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
//Images
import AsyncStorage from '@react-native-async-storage/async-storage';
import OkIcon from 'icons/OkIcon.svg';
import SupportChatBlue from 'icons/supportChatBlue.svg';
import IconWarning from 'icons/IconWarning.svg';
import PaperPlane from 'icons/PaperPlane.svg';
import { userReSendCodeMsj } from 'domain/entities/userUnblockAccount';
import unblockService from 'adapter/api/unblockService';
import ModalUnblock from 'src/components/molecules/ModalUnblock/ModalUnblock';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import ModalWarningType2 from 'src/components/molecules/ModalWarningType2/ModalWarningType2';


const VerifyCode: React.FC<Props> = (props) => {
    const { resetForm, setCode, handlerBack, onPressClose, navigateSupportChat } = props;
    const { styles } = useStyles(componentStyles);
    const { t } = useTranslation();
    const { closeModal, setModal } = useBottomSheet();
    const [value, setValue] = useState('');
    const [numberTries, setNumberTries] = useState(0);
    const codeContainer = useBlurOnFulfill({ value, cellCount: 6 });
    const [sendCode] = unblockService.useSendCodeMutation();
    const [reSendCode] = unblockService.useReSendCodeMutation();
    const { setAlertErrorMessage } = useErrorAlert();
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });


    useEffect(() => {
        value.length === 6;
    }, [value]);


    const onValid = useCallback(
        async () => {
            try {
                var val: any = await AsyncStorage.getItem('newData');
                val = JSON.parse(val);
                const getData: any = {
                    "code": value,
                    "tempSessionId": Object.values(val?.idBelongState)[0],
                    "state": Object.keys(val?.idBelongState)[0],
                };
                const respCode = await sendCode(getData).unwrap();
                console.log("lares puestica", respCode)

                if (respCode?.tries) setNumberTries(respCode.tries)

                if (respCode?.cause === "VERIFIED") {
                    let text = t(`unblockAccount.limitIncorrectCodeTwo`);
                    text = text.replace("30", respCode?.timer);
                    openModalWarning(true, text, false)
                } else if (respCode?.timer === -1 && respCode.tries === 5) {
                    openModal(value);
                } else {
                    if (respCode?.timer === -1 && respCode.tries < 5) {
                        setAlertErrorMessage(t(`errors.code150`));
                    } else if (respCode?.timer !== -1 && respCode.tries === 0) {
                        let text = t(`unblockAccount.limitIncorrectCode`);
                        text = text.replace("30", respCode.timer);
                        openModalWarning(false, text, true);
                    } else if (respCode?.code === 160 && respCode.message == "CODE_EXPIRED") {
                        openModalWarning(false, t(`unblockAccount.codeExpired`), false);
                    }
                }
            } catch (error) {
                switch (error) {
                    case '160': //160 Expired code
                        openModalWarning(false, t(`warningMessage.code${error}`), true);
                        break;
                    default:
                        if (error != 160) setAlertErrorMessage(t(`errors.code${error}`))
                        break;
                }
            }
        },
        [value],
    );

    const validateChange = () => {
        if (value.length === 6) {
            setValue(value.substring(0, value.length - 1))
        }
    }

    const openModalWarning = (iconWar: boolean, text: string, isResent: boolean) => {
        setModal({
            render: () => (
                <ModalWarning
                    icon={iconWar ? <IconWarning /> : <OkIcon />}
                    warningText={text}
                    onPress={() => {
                        closeModal();
                        if (isResent) {
                            setNumberTries(0)
                            resetForm();
                        }

                        if (iconWar) {
                            onPressClose();
                        }
                    }}
                />
            ), height: 320, blockModal: true
        });
    }

    const openModal = (value: string) => {
        setModal({
            render: () => (
                <ModalWarning
                    icon={<OkIcon />}
                    warningText={t(`unblockAccount.approveCode`)}
                    styleBtn={{ marginBottom: 24 }}
                    onPress={() => { (setCode(value), closeModal()) }}
                />
            ), height: 250, blockModal: true
        });
    }

    const resendCode = useCallback(
        async () => {
            try {
                var vl: any = await AsyncStorage.getItem('newData');
                vl = JSON.parse(vl);
                const getData: userReSendCodeMsj = {
                    "email": vl?.email,
                    "phoneNumber": vl?.phoneNumber,
                    "name": vl?.name,
                    "idBelongState": vl?.idBelongState,
                    "isEnglish": vl?.isEnglish,
                    "byEmail": vl?.byEmail
                };

                const respCode = await reSendCode(getData).unwrap();

                if (respCode?.cause.toLowerCase() === "attempts" && respCode?.tries == -1) {
                    let msj = t(`unblockAccount.ResendCodeLimitSubTitle`);
                    msj = msj.replace("30", respCode?.timer);

                    const text = <Text style={{ color: '#055293', fontSize: 18, fontWeight: "600", }} maxFontSizeMultiplier={1.3}>
                        <Text style={{ fontSize: 18, color: '#055293', fontWeight: "normal", }} maxFontSizeMultiplier={1.3}>{t(`unblockAccount.CodeRequestLimitTitle`)}{'\n\n'}</Text>
                        {msj}
                    </Text>;

                    setModal({
                        render: () => (
                            <ModalWarningType2
                                isIconAlert
                                warningText={text}
                                variantBtn={'Text'}
                                styleTextBtn={{ color: '#0069A7', fontWeight: "bold" }}
                                textButtonCancel={t('unblockAccount.close')}
                                textButton={t('unblockAccount.continue')}
                                onPressCancel={() => { closeModal(), onPressClose() }}
                                onPress={() => { closeModal() }}
                            />
                        ), height: 480, blockModal: true
                    });
                } else {
                    setModal({
                        render: () => (
                            <ModalWarning
                                icon={<PaperPlane />}
                                warningText={vl.phoneNumber ? t(`unblockAccount.newMessageValidationMobile`) : t(`unblockAccount.newMessageValidationEmail`)}
                                textButton={t(`unblockAccount.continue`)}
                                styleBtn={{ marginBottom: 24 }}
                                onPress={() => { closeModal() }}
                            />
                        ), height: 280, blockModal: false
                    });
                }
            } catch (error) {
                switch (error) {
                    case '230': //230 Attempt limit
                        openModalLimit();
                        break;
                    default:
                        setAlertErrorMessage(t(`errors.code${error}`))
                        break;
                }
            }
        },
        [],
    );

    const openModalLimit = () => {
        const txt: any = <Text style={{ color: '#3CA70D', fontSize: 18 }} maxFontSizeMultiplier={1.3}>
            <Text style={{ fontWeight: "400", fontSize: 18, color: '#055293' }} maxFontSizeMultiplier={1.3}>{t(`unblockAccount.CodeRequestLimitTitle`)}{'\n\n'}</Text>
            {t(`unblockAccount.CodeRequestLimitSubTitle`)}
        </Text>;
        setModal({
            render: () => (
                <ModalUnblock
                    isIconAlert
                    warningText={txt}
                    variantBtn={'Text'}
                    styleTextBtn={{ color: '#3CA70D', fontWeight: "bold", textDecorationLine: 'underline' }}
                    textButton={t(`unblockAccount.cancel`)}
                    onPress={handlerBack}
                    onPrimaryPress={() => { closeModal(); }}
                />
            ), height: 410, blockModal: true
        });
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textOption} maxFontSizeMultiplier={1.3}>
                    {t('unblockAccount.verification')}
                </Text>
                <Text style={styles.textOption2} maxFontSizeMultiplier={1.3}>
                    {t('createAccount.validation.subTitleEmail')}
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
                    <View style={[styles.cell, isFocused && styles.focusCell]}>
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
            <Button onPress={resendCode} textStyle={{ color: '#055293' }} style={{ marginVertical: 40 }} title={t('createAccount.validation.rout')} variant='Underline' />
            <Button
                accessibilityRole="button"
                accesibilityLabel={t('accessibility.next')}
                disabled={value.length === 6 ? false : true}
                title={t('createAccount.buttons.next')}
                onPress={onValid} />
            <Button
                accessibilityRole="button"
                style={styles.btnSupport}
                textStyle={styles.textBtnSupport}
                title={t('unblockAccount.btnSupportChat')}
                variant={'Underline'}
                onPress={navigateSupportChat}
                icon={<SupportChatBlue />}
            />
        </View>
    );
}

export default VerifyCode;