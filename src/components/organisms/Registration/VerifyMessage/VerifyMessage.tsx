import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CodeField, useClearByFocusCell, useBlurOnFulfill, Cursor } from 'react-native-confirmation-code-field';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { VerifyMessageProps as Props } from './VerifyMessage.types';
import componentStyles from './VerifyMessage.styles';
import Button from 'src/components/atoms/Button/Button';
import RegisterService from 'adapter/api/registerService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import PaperPlane from 'icons/PaperPlane.svg';
import { useNavigation } from '@react-navigation/native';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { TriesToBlock } from 'infrastructure/keraltyApi/models/auth';
import ModalUnblock from 'src/components/molecules/ModalUnblock/ModalUnblock';

const VerifyMessage: React.FC<Props> = (props) => {
    const { resetForm, handlerBack, data, openwarning, statusMaintenance } = props;
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const { reset } = useNavigation();
    const [asyncError, setAsyncError] = useState<string | undefined>();
    const { ecwId } = useAppSelector(userSelectors.selectUser);
    const { closeModal, setModal } = useBottomSheet();
    const [trigger, result] = RegisterService.useLazyLoadUserInfoByCodeQuery();
    const [trigger2, result2] = RegisterService.useLazyLoadMaxUserInfoByCodeQuery();
    const [trigger3, result3] = RegisterService.useLazyLoadUserInfoQuery();
    const [trigger4, result4] = RegisterService.useLazyLoadMaxUserInfoQuery();
    const [resendsmscode] = RegisterService.useResendsmscodeMutation();
    const [resendemail] = RegisterService.useReSendRecoverEmailInitialSaveMutation();
    const [triesToBlock] = RegisterService.useTriesToBlockMutation();
    const [loadingBtn, setLoading] = useState(false);
    const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation()
    const tempSessionId = useAppSelector(userSelectors.selectTempSessionId);

    const navigation = useNavigation()

    const [value, setValue] = useState<any>('');
    const [numberTries, setNumberTries] = useState(0);
    const [valuesParse, setValuesParse] = useState<any>();
    const codeContainer = useBlurOnFulfill({ value, cellCount: 6 });
    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    useEffect(() => {
        if (value) value.length === 6;
    }, [value]);

    useEffect(() => {
        setValue(undefined);
    }, [valuesParse?.sendByEmail]);

    const { setAlertErrorMessage } = useErrorAlert();

    useEffect(() => { getData() }, [AsyncStorage.getItem('resendsmsCode')]);
    const getData = async () => {
        const valuesMs = await AsyncStorage.getItem('resendsmsCode');
        setValuesParse(JSON.parse(valuesMs ?? ''))
    }

    const onValid = useCallback(
        async () => {
            let info = {
                tempSessionId: tempSessionId,
                state: data.userState
            }
            const response = await verifyPartialRegister(info).unwrap()
            if (response == true) {
                try {
                    setLoading(true)
                    const data: TriesToBlock = {
                        email: valuesParse?.email,
                        code: value,
                        byEmail: valuesParse?.sendByEmail,
                        state: valuesParse?.state
                    }
                    const res = await triesToBlock(data).unwrap();
                    switch (res?.cause) {
                        case 'ATTEMPTS':
                            setModal({
                                render: () => (<ModalWarning
                                    isIconAlert
                                    warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts2')}</Text></>}
                                    onPress={() => { closeModal(); resetForm() }} />),
                                height: 380
                            })
                            break;
                        case 'VERIFIED':
                            setModal({
                                render: () => (<ModalWarning
                                    isIconAlert
                                    warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                                    onPress={() => { closeModal(); resetForm() }} />),
                                height: 380
                            })
                            break;

                        default:
                            if (res?.tries) setNumberTries(res.tries)
                            if (res?.timer == -1 && res?.tries == 5) {
                                if (valuesParse?.isFBMax) {
                                    const data = { id: value, email: valuesParse?.email };
                                    if (valuesParse?.sendByEmail) trigger4(data);
                                    else trigger2(data);
                                }
                                else if (valuesParse?.sendByEmail) trigger3({ code: value, state: valuesParse?.state, email: valuesParse?.email });
                                else trigger({ code: value, state: valuesParse?.state, email: valuesParse?.email });
                            }
                            else if (res.tries == 0) openModalWarning(`${t(`errors.limit1`)} ${res.timer} ${t(`errors.limit2`)}`, true)
                            else setAlertErrorMessage(t(`errors.code150`))
                            break;
                    }
                    setValue(undefined);
                    setLoading(false);
                } catch (error) {
                    setValue(undefined);
                    setLoading(false);
                    switch (error) {
                        case '160': //160 Expired code
                            openModalWarning(t(`warningMessage.code${error}`), true)
                        default:
                            if (error != 160) setAlertErrorMessage(t(`errors.code${error}`))
                            break;
                    }
                }
            } else {
                setModal({
                    render: () => (
                        <ModalWarning
                            isIconAlert
                            warningText={t('errors.code998')}
                            onPress={() => { closeModal(), resetLogin() }}
                        />
                    ), height: 280, blockModal: true
                })

            }
        },
        [ecwId, value, valuesParse],
    );
    const resetLogin = () => {
        reset({ index: 0, routes: [{ name: 'Login' }] });
    }

    useMemo(async () => {
        if (result2.error) {
            setAlertErrorMessage(t(`errors.code${result2.error}`))
        }
        if (result2?.data) {
            try {
                await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(result2.data));
                openModal();
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error}`))
            }
        };
    }, [result2])

    useMemo(async () => {
        if (result4.error) {
            setAlertErrorMessage(t(`errors.code${result4.error}`))
        }
        if (result4?.data) {
            try {
                await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(result4.data));
                openModal();
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error}`))
            }
        };
    }, [result4])

    useMemo(async () => {
        if (result.error) {
            setAlertErrorMessage(t(`errors.code${result.error}`))
        }
        if (result?.data) {
            try {
                await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(result.data));
                openModal();
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error}`))
            }
        };
    }, [result])

    useMemo(async () => {
        if (result3.error) {
            setAsyncError(result3.error as string);
        }
        if (result3?.data) {
            try {
                await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(result3.data));
                openModal();
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error}`))
            }
        };
    }, [result3])

    const validateChange = () => {
        if (value && value.length === 6) {
            setValue(value.substring(0, value.length - 1))
        }
    }
    const resendsms = useCallback(
        async () => {
            let info = {
                tempSessionId: tempSessionId,
                state: data.userState
            }
            const response = await verifyPartialRegister(info).unwrap()
            if (response == true) {
                try {
                    const id = valuesParse?.id;
                    let value: any = {
                        mobile: valuesParse?.mobile,
                        isFBMax: valuesParse?.isFBMax,
                        state: valuesParse?.state,
                        email: valuesParse?.email,
                        isEnglish: t('general.locale') == 'en' ? true : false
                    }
                    let res: any;

                    if (id) value.id = id
                    if (valuesParse?.sendByEmail) res = await resendemail(value).unwrap();
                    else res = await resendsmscode(value).unwrap();
                    switch (res?.cause) {
                        case 'SUCCESS':
                            openModal2();
                            break;
                        case 'ATTEMPTS':
                            setModal({
                                render: () => (
                                    <ModalUnblock
                                        isIconAlert
                                        warningText={valuesParse?.sendByEmail ? t('warningMessage.limitEmail') : t('warningMessage.limitPhone')}
                                        warningText2={`${t('warningMessage.remember1')} ${res?.timer + t('warningMessage.min')} ${t('warningMessage.remember2')}`}
                                        variantBtn={'Text'}
                                        styleTextBtn={{ color: colors.primary, fontWeight: "bold", textDecorationLine: 'underline' }}
                                        textButton={t(`common.close`)}
                                        onPrimaryPress={() => closeModal()}
                                        onPress={() => { resetForm(); closeModal() }}
                                    />
                                ), height: 450, blockModal: true
                            });
                            break;
                        case 'VERIFIED':
                            setModal({
                                render: () => (<ModalWarning
                                    isIconAlert
                                    warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                                    onPress={() => { resetForm(); closeModal() }} />),
                                height: 380, blockModal: true
                            })
                            break;
                        case 'TRIES':
                            setModal({
                                render: () => (
                                    <ModalWarning
                                        isIconAlert
                                        warningText={`${t(`errors.limit1`)} ${res?.timer} ${t(`errors.limit2`)}`}
                                        onPress={() => { resetForm(); closeModal() }}
                                    />
                                ), height: 300, blockModal: true
                            });
                            break;
                        default:
                            break;
                    }
                } catch (error) {
                    switch (error) {
                        case '230': //230 Attempt limit
                            openModalLimit()
                            break;
                        default:
                            setAlertErrorMessage(t(`errors.code${error}`))
                            break;
                    }
                }

            } else {
                setModal({
                    render: () => (
                        <ModalWarning
                            isIconAlert
                            warningText={t('errors.code998')}
                            onPress={() => { closeModal(), resetLogin() }}
                        />
                    ), height: 280, blockModal: true
                })
            }
        },
        [resendsmscode, valuesParse],
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
                    onPress={() => {
                        setValue(undefined);
                        handlerBack();
                        closeModal();
                    }}
                    onPrimaryPress={() => { closeModal(); }}
                />
            ), height: 410, blockModal: true
        });
    }

    const openModalWarning = (text: string, isResent: boolean) => {
        setModal({
            render: () => (
                <ModalWarning
                    isIconAlert
                    warningText={text}
                    onPress={() => {
                        closeModal(); if (isResent) {
                            setNumberTries(0)
                            setValue(undefined);
                            resetForm();
                        }
                    }}
                />
            ), height: 300, blockModal: true
        });
    }

    const openModal2 = () => {
        setModal({
            render: () => (
                <View style={styles.containerModal}>
                    <PaperPlane />
                    <Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t(`createAccount.code${valuesParse?.sendByEmail ? 'Email' : 'Mobile'}`)}</Text>
                    <Button
                        onPress={() => closeModal()}
                        title={t('common.accept')}
                        style={{ marginBottom: 24 }} />
                </View>
            ), height: 330, blockModal: true
        });
    }

    const openModal = () => {
        setModal({
            render: () => (
                <View style={styles.containerModal}>
                    <PaperPlane />
                    <Text style={styles.textBlue} maxFontSizeMultiplier={1.3}>{t('createAccount.verificationAlert')}</Text>
                    <Button
                        onPress={() => {
                            closeModal();
                            navigation.dispatch({
                                type: 'RESET',
                                payload: {
                                    routes: [{ name: 'PatientRegistration' }],
                                    index: 0,
                                },
                            })
                        }}
                        title={t('deleteAccount.continue')}
                        style={{ marginBottom: 24 }} />
                </View>
            ), height: 330, blockModal: true
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textOption} maxFontSizeMultiplier={1.3}>
                    {t('createAccount.validation.title')}
                </Text>
                <Text style={styles.textOption2} maxFontSizeMultiplier={1.3}>
                    {t(`createAccount.validation.subTitle${valuesParse?.sendByEmail ? 'Email' : 'Mobile'}`)}
                </Text>
            </View>
            <CodeField
                ref={codeContainer}
                {...props}
                value={value}

                onChangeText={statusMaintenance == 'in_maintenance' ? () => openwarning() : setValue}
                cellCount={6}
                onPressIn={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => validateChange()}
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
            <Button onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : resendsms} style={{ marginVertical: 20 }} title={t('createAccount.validation.rout')} variant='Underline' />
            <Button accesibilityLabel={t('accessibility.next')} disabled={value && value.length === 6 && !loadingBtn ? false : true} title={t('createAccount.buttons.next')} onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : onValid} />
        </View>
    );
}

export default VerifyMessage;