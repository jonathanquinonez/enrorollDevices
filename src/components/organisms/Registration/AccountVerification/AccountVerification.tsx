import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Components
import Input from 'src/components/atoms/Input/Input';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Button from 'src/components/atoms/Button/Button';
// Types, Styles
import { AccountVerificationProps as Props } from './AccountVerification.types';
import componentStyles from './AccountVerification.styles';
//Images
import PaperPlane from 'icons/PaperPlane.svg';
import MobileAlt from 'icons/MobileAlt.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import RegisterService from 'adapter/api/registerService';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import moment from 'moment';
import { userActions } from 'adapter/user/userSlice';
import FORMATS from 'ui-core/utils/formats';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useAppDispatch } from 'adapter/hooks';

const AccountVerification: React.FC<Props> = (props) => {
    actionResetForm: () => Promise<void>
    const { values, data, verifyMessage, optionNumber, receiveService, resetForm, actionResetForm } = props;
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const [sendByEmail, setSendByEmail] = useState<boolean | undefined>()
    const [dataInitialSaveByAccountNumber, setInitialSaveByAccountNumber] = useState()
    const [dataInitialSave, setInitialSave] = useState()
    const [asyncError, setAsyncError] = useState<string | undefined>();
    const { closeModal, setModal } = useBottomSheet();
    const changeValues = (type: string) => setSendByEmail(type == 'email' ? true : false);
    const [initialSave] = RegisterService.useInitialSaveMutation();
    const [verifyPartialRegister] = RegisterService.usePartialRecordMethodMutation();
    const [initialSaveByAccountNumber] = RegisterService.useInitialSaveByAccountNumberMutation();
    const dispatch = useAppDispatch();
    const dataMs = {
        email: data?.userData?.patientInformation?.email?.toLowerCase() ?? data?.userSecurity?.email?.toLowerCase() ?? '',
        mobile: data?.userData?.patientInformation?.mobile ?? data?.userSecurity?.mobile ?? '',
        isFBMax: data?.userSecurity?.isFBMax ?? values.accountInfo?.isFBMax,
        id: data?.userSecurity?.id ?? values.accountInfo?.id,
        state: data?.userData?.patientInformation?.state ?? data?.userState ?? data?.userSecurity?.state,
        sendByEmail,
        idBelongState: {}
    }

    useEffect(() => {
        AsyncStorage.setItem('resendsmsCode', JSON.stringify(dataMs));
    }, [data, sendByEmail])


    useEffect(() => {
        const isEnglish = t('general.locale') == 'en' ? true : false;

        if (sendByEmail != undefined) {
            let resp: any = {};
            resp.email = data?.userSecurity?.email?.toLowerCase() ?? data.userData?.patientInformation?.email?.trim()?.toLowerCase() ?? '';
            resp.pass = data?.userSecurity?.pass;
            resp.id = data?.userSecurity?.id ?? values.accountInfo?.id;
            resp.user = {
                id: data?.userSecurity?.id ?? values.accountInfo?.id,
                idEcw: values.accountInfo.accountNumber,
                isEnglish,
                isFBMax: data?.userSecurity?.isFBMax ?? values.accountInfo?.isFBMax,
                sendByEmail: sendByEmail != undefined ? sendByEmail.toString() : '',
                patientInformation: {
                    dateOfBirth: values.accountInfo?.dateOfBirth ? moment(values.accountInfo.dateOfBirth).format(FORMATS.dateISO8601) : '', // fehca
                    email: data?.userSecurity?.email?.toLowerCase() ?? data.userData?.patientInformation?.email?.trim().toLowerCase() ?? '',
                    mobile: data?.userSecurity?.mobile ?? data.userData?.patientInformation?.mobile.trim() ?? ''
                }
            }
            setInitialSaveByAccountNumber(resp);

            if (data.userSecurity?.address1) {
                data.userSecurity.address1 == data.userSecurity.address1.trim() ?? ''
            }
            if (data.userSecurity?.address2) {
                data.userSecurity.address2 == data.userSecurity.address2.trim() ?? ''
            }
            let resp2: any = {};
            const id = data?.userSecurity?.id ?? values.accountInfo?.id;
            if (id) {
                resp2 = {
                    id: id,
                    email: data?.userSecurity?.email?.toLowerCase() ?? data.userData?.patientInformation?.email?.trim().toLowerCase() ?? '',
                    pass: data?.userSecurity?.pass ?? data.userData?.patientInformation?.pass.trim() ?? '',
                    user: {
                        id: id,
                        isEnglish,
                        isFBMax: data?.userSecurity?.isFBMax ?? values.accountInfo?.isFBMax,
                        sendByEmail: sendByEmail != undefined ? sendByEmail.toString() : '',
                        patientInformation: {
                            mobile: data?.userSecurity?.mobile ?? data.userData?.patientInformation?.mobile.trim() ?? ''
                        }
                    }
                }
                dispatch(userActions.setEditAccountdata(undefined))
            } else {
                const isEnglish = t('general.locale') == 'en';
                resp2.user = data.userData;
                resp2.user.sendByEmail = sendByEmail != undefined ? sendByEmail.toString() : '';
                resp2.user.isEnglish = isEnglish;
                resp2.user.patientInformation = { ...resp2.user.patientInformation, ...data.userSecurity };
                resp2.email = resp2.user.patientInformation.email?.trim().toLowerCase() ?? '';
                resp2.pass = resp2.user.patientInformation.pass ?? '';
                resp2.user.patientInformation.dateOfBirth = resp2.user?.patientInformation?.dateOfBirth ? moment(resp2.user?.patientInformation?.dateOfBirth).format(FORMATS.dateISO8601) : ''; //fehca
                delete resp2.user.patientInformation.confirmPassword;
                delete resp2.user.patientInformation.pass;
                delete resp2.user.patientInformation.terms;
                delete resp2.user.patientInformation.policy;
            }
            setInitialSave(resp2)
        }
    }, [sendByEmail, data, values]);

    const { setAlertErrorMessage } = useErrorAlert();
    const onValidSubmitInitialSaveByAccountNumber = useCallback(
        async (values) => {
            try {
                const res = await initialSaveByAccountNumber(values).unwrap();
                dispatch(userActions.setStateRegister(data.userState))
                switch (res?.cause) {
                    case 'SUCCESS':
                        if (res.tempSessionId) {
                            dispatch(userActions.setTempsessionId(res.tempSessionId))
                            let info = {
                                tempSessionId: res.tempSessionId,
                                state: data.userState
                            }
                            const response = await verifyPartialRegister(info).unwrap();
                            if (response == true) {
                                openModalWarning(t(`authorizationModal.title${sendByEmail ? 'Email' : 'Mobile'}`))
                            } else {
                                setModal({
                                    render: () => (
                                        <ModalWarning
                                            isIconAlert
                                            warningText={`${t('errors.code998')}`}
                                            onPress={() => { actionResetForm(); closeModal() }}
                                        />
                                    ), height: 300, blockModal: true
                                });
                            }
                        }

                        break;
                    case 'ATTEMPTS':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts2')}</Text></>}
                                onPress={() => { actionResetForm(); closeModal() }} />),
                            height: 380
                        })
                        break;
                    case 'VERIFIED':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                                onPress={() => { actionResetForm(); closeModal() }} />),
                            height: 380
                        })
                        break;
                    case 'TRIES':
                        setModal({
                            render: () => (
                                <ModalWarning
                                    isIconAlert
                                    warningText={`${t(`errors.limit1`)} ${res?.timer} ${t(`errors.limit2`)}`}
                                    onPress={() => { actionResetForm(); closeModal() }}
                                />
                            ), height: 300, blockModal: true
                        });
                        break;
                    default:
                        break;
                }
            } catch (error) {
                setAlertErrorMessage(t(`errors.code${error == '30' ? '20' : error}`))
            }
        },
        [initialSaveByAccountNumber, sendByEmail],
    );

    const onValidSubmitInitialSave = useCallback(
        async (values) => {
            try {
                dispatch(userActions.setEditAccountdata(values)); //Envia la data a los consents
                closeModal()
                const res = await initialSave(values).unwrap();
                switch (res?.cause) {
                    case 'SUCCESS':
                        dispatch(userActions.setTempsessionId(res.tempSessionId));
                        if (res.tempSessionId) {
                            let info = {
                                tempSessionId: res.tempSessionId,
                                state: data.userState
                            }
                            const response = await verifyPartialRegister(info).unwrap()
                            if (response == true) {
                                openModalWarning(t(`authorizationModal.title${sendByEmail ? 'Email' : 'Mobile'}`))
                            } else {
                                setModal({
                                    render: () => (
                                        <ModalWarning
                                            isIconAlert
                                            warningText={`${t('errors.code998')}`}
                                            onPress={() => { actionResetForm(); closeModal() }}
                                        />
                                    ), height: 300, blockModal: true
                                });
                            }
                        }
                        break;
                    case 'ATTEMPTS':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.attempts2')}</Text></>}
                                onPress={() => { actionResetForm(); closeModal() }} />),
                            height: 380
                        })
                        break;
                    case 'VERIFIED':
                        setModal({
                            render: () => (<ModalWarning
                                isIconAlert
                                warningText={<><Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified1')}</Text> <Text maxFontSizeMultiplier={1.3} style={{ fontFamily: 'proxima-bold' }}>{res?.timer + t('warningMessage.min')}</Text> <Text maxFontSizeMultiplier={1.3}>{t('warningMessage.verified2')}</Text></>}
                                onPress={() => { actionResetForm(); closeModal() }} />),
                            height: 380
                        })
                        break;
                    case 'TRIES':
                        setModal({
                            render: () => (
                                <ModalWarning
                                    isIconAlert
                                    warningText={`${t(`errors.limit1`)} ${res?.timer} ${t(`errors.limit2`)}`}
                                    onPress={() => { actionResetForm(); closeModal() }}
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
        [initialSave, sendByEmail],
    );

    const openModalWarning = (text: string) => {
        setModal({
            render: () => (
                <ModalWarning
                    icon={<PaperPlane />}
                    warningText={text}
                    onPress={() => { closeModal(); verifyMessage() }}
                />
            ), height: 300, blockModal: true
        });
    }

    let maskEmail = (email: string) => {

        let split = email.split('@');
        let hide = split[0].substring(3).split('').fill('*').join('');

        if (email)
            if (split[0].length > 3) {
                return split[0].substring(0, 3) + hide + '@' + split[1];
                // email.substring(0, 3) + new Array(split[0].length - 1).fill('*').join('') + '@' + split[1]
            } else {
                return email;
            }
        return '';
    };

    const maskPhone = (phone = '9999999999') => {
        // 6 digits + special characters () -
        return `******${phone.substring(9, phone.length)}`
    }

    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 20 }}>
                <Text style={styles.textVerification} maxFontSizeMultiplier={1.3}>
                    {t('createAccount.textVerification')}
                </Text>
                <Text style={styles.text} maxFontSizeMultiplier={1.3}>
                    {t('createAccount.selectMobileNumberEmail')}
                </Text>
            </View>
            <Text style={styles.textMobileNumber} maxFontSizeMultiplier={1.3}>
                {t('createAccount.inputs.selectMobileNumber')}
            </Text>
            <View style={[styles.contentRow, { marginBottom: 32 }]}>
                <RadioButton
                    accessibilityRole='radio'
                    accessibilityHint={t('accessibility.selectSMS')}
                    isSelected={sendByEmail == undefined ? undefined : !sendByEmail}
                    onPress={() => changeValues('mobile')}
                    textStyle={styles.textRadioButton}
                    style={styles.radioButton} />
                <Input
                    editable={false}
                    icon={<MobileAlt />}
                    inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                    placeholder={''}
                    value={maskPhone(data?.userData?.patientInformation?.mobile ?? data?.userSecurity?.mobile ?? '')}
                    name={t('createAccount.inputs.selectMobileNumber')} />
            </View>
            <Text style={styles.textSelectEmail} maxFontSizeMultiplier={1.3}>
                {t('createAccount.inputs.selectEmail')}
            </Text>
            <View style={styles.contentRow}>
                <RadioButton
                    accessibilityRole='radio'
                    accessibilityHint={t('accessibility.selectEmail')}
                    isSelected={sendByEmail}
                    onPress={() => changeValues('email')}
                    textStyle={styles.textRadioButton}
                    style={styles.radioButton} />
                <Input
                    editable={false}
                    icon={<EnvelopeIcon />}
                    inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                    placeholder={''}
                    value={maskEmail(data?.userData?.patientInformation?.email ?? data?.userSecurity?.email ?? '')}
                    name={t('createAccount.inputs.selectEmail')} />
            </View>

            {asyncError && (
                <View style={{ marginBottom: 10, width: '85%', alignSelf: 'center' }}>
                    <Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>{t(`errors.code${asyncError}`)}</Text>
                </View>
            )}
            <Button
                accesibilityLabel={t('accessibility.next')}
                style={{ width: 200, marginBottom: 15, alignSelf: 'center' }}
                title={t('createAccount.buttons.next')}
                disabled={sendByEmail == undefined ? true : false}
                onPress={() => {
                    (receiveService == 1 && optionNumber == 2) ?
                        onValidSubmitInitialSaveByAccountNumber(dataInitialSaveByAccountNumber)
                        : data?.userSecurity?.mobile ?
                            onValidSubmitInitialSaveByAccountNumber(dataInitialSaveByAccountNumber) :
                            onValidSubmitInitialSave(dataInitialSave)
                }} />
        </View>
    );
}

export default AccountVerification;