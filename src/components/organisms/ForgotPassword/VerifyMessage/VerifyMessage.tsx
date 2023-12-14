import React, { useCallback, useEffect, useState } from 'react';
import {
    CodeField,
    useClearByFocusCell,
    useBlurOnFulfill, Cursor
} from 'react-native-confirmation-code-field';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
// Types, Styles
import { VerifyMessageProps as Props } from './VerifyMessage.types';
import componentStyles from './VerifyMessage.styles';
import Button from 'src/components/atoms/Button/Button';
import RegisterService from 'adapter/api/registerService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import OkIcon from 'icons/OkIcon.svg';
import SupportChatBlue from 'icons/supportChatBlue.svg';
import CheckCircle from 'icons/CheckCircle.svg';
import { useNavigation } from '@react-navigation/native';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ForgotService from 'adapter/api/forgotService';
import ModalCodeSentFP from '../ContactInfoData/ModalCodeSentFP/ModalCodeSentFP';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import ModalUnblock from 'src/components/molecules/ModalUnblock/ModalUnblock';


const VerifyMessage = (props: Props) => {
    const { newData, setCode, resetForm, isByEmail, handlerBack, navigateSupportChat, openwarning, statusMaintenance } = props;
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const [asyncError, setAsyncError] = useState<string | undefined>();
    const { ecwId } = useAppSelector(userSelectors.selectUser);
    const { closeModal, setModal } = useBottomSheet();
    const [reSendEmail] = ForgotService.useReSendRecoverEmailMutation();
    const [validationCode] = ForgotService.useValidationCodeMutation();
    const [numberTries, setNumberTries] = useState(0);
    const { setAlertErrorMessage } = useErrorAlert();
    const [loadingBtn, setLoading] = useState(false);

    const [value, setValue] = useState<string | undefined>('');
    const codeContainer = useBlurOnFulfill({ value, cellCount: 6 });

    const [propss, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useEffect(() => {
        value?.length === 6;
    }, [value]);

    useEffect(() => {
        setValue(undefined);
    }, [isByEmail]);

    const onValid = useCallback(
        async () => {
            try {
                setLoading(true);
                const state = Object.keys(newData.idBelongState ?? {})[0];
                const tempSessionId = newData.idBelongState[state]
                const valueValidation = {
                    code: value ?? '',
                    tempSessionId,
                    state
                }
                const res = await validationCode(valueValidation).unwrap();
                switch (res?.cause) {
                    case 'ATTEMPTS':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts2')}</Text></>}
                                onPress={() => { closeModal(); resetForm() }} />),
                            height: 380, blockModal: true
                        })
                        break;
                    case 'VERIFIED':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                                onPress={() => { closeModal(); resetForm() }} />),
                            height: 380, blockModal: true
                        })
                        break;

                    default:
                        if (res?.tries) setNumberTries(res.tries)
                        if (res?.timer == -1 && res?.tries == 5) openModal2(value ?? '')
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
        },
        [value, newData],
    );


    const validateChange = () => {
        if (value?.length === 6) {
            setValue(value.substring(0, value.length - 1))
        }
    }
    const resendsms = useCallback(
        async () => {
            try {
                const res = await reSendEmail(newData).unwrap();

                switch (res?.cause) {
                    case 'SUCCESS':
                        setModal({
                            render: () => (<ModalCodeSentFP isMobile={!isByEmail} onPress={() => closeModal()} />),
                            height: 280
                        })
                        break;
                    case 'ATTEMPTS':
                        setModal({
                            render: () => (
                                <ModalUnblock
                                    isIconAlert
                                    warningText={newData.byEmail ? t('warningMessage.limitEmail') : t('warningMessage.limitPhone')}
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
                        if (error != 160) setAlertErrorMessage(t(`errors.code${error}`))
                        break;
                }
            }
        },
        [reSendEmail, newData],
    );

    const openModalWarning = (text: string, isResent: boolean) => {
        setModal({
            render: () => (
                <ModalWarning
                    isIconAlert
                    warningText={text}
                    onPress={() => {
                        closeModal();
                        if (isResent) {
                            setNumberTries(0)
                            setValue(undefined);
                            resetForm();
                        }
                    }}
                />
            ), height: 300, blockModal: true
        });
    }

    const openModal2 = (value: string) => {
        setModal({
            render: () => (
                <ModalWarning
                    icon={<OkIcon />}
                    warningText={t('forgotPassword.approveCode')}
                    styleBtn={{ marginBottom: 24 }}
                    onPress={() => { setCode(value); closeModal() }}
                />
            ), height: 250, blockModal: true
        });
    }

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

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.textOption} maxFontSizeMultiplier={1.3}>
                    {t('forgotPassword.contactInfo')}
                </Text>
                <Text style={styles.textOption2} maxFontSizeMultiplier={1.3}>
                    {t(`createAccount.validation.subTitle${isByEmail ? 'Email' : 'Mobile'}`)}
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
            <Button onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : resendsms} textStyle={{ color: '#055293' }} style={{ marginVertical: 20 }} title={t('createAccount.validation.rout')} variant='Underline' />
            <Button accesibilityLabel={t('accessibility.next')} disabled={value?.length === 6 && !loadingBtn ? false : true} title={t('createAccount.buttons.next')} onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : onValid} />
            <Button
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

export default VerifyMessage;