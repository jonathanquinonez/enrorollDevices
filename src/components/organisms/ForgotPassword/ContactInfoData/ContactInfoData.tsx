import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Input from 'src/components/atoms/Input/Input';
import Checkbox, { CheckboxController } from 'src/components/atoms/Checkbox/Checkbox';
import Button from 'src/components/atoms/Button/Button';
//Styles
import { ContactInfoDataProps as Props, IsChecked, IsCheckedYup } from './ContactInfoData.types';
import componentStyles from './ContactInfoData.styles';
//Images
import MobileAlt from 'icons/MobileAlt.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import ForgotService from 'adapter/api/forgotService';
import { EmailIdentifier } from 'domain/entities/emailIdentifier';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalCodeSentFP from './ModalCodeSentFP/ModalCodeSentFP';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import SupportChatBlue from 'icons/supportChatBlue.svg';


const ContactInfoData = (props: Props) => {
    const { formValues, onPress, idError, isByEmail, resetForm, actionResetForm, navigateSupportChat, openwarning, statusMaintenance } = props;
    const { styles, colors } = useStyles(componentStyles);
    const [inputState, setInputState] = useState(false);
    const [sendEmail] = ForgotService.useSendRecoverEmailMutation();
    const {
        control,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
        getValues
    } = useForm<IsChecked>({
        resolver: yupResolver(IsCheckedYup),
        mode: 'onBlur'
    });
    useEffect(() => reset(), [resetForm])

    const { t } = useTranslation();
    const { setAlertErrorMessage } = useErrorAlert();
    const { setModal, closeModal } = useBottomSheet();
    const [sendByEmail, setSendByEmail] = useState<boolean | undefined>();
    const changeValues = (type: string) => setSendByEmail(type == 'email' ? true : false);


    const handleValidate = () => {
        sendByEmail != true && sendByEmail != false ?
            setAlertErrorMessage(t('forgotPassword.requredCheck'))
            :
            onValidSubmit()
    }

    let maskEmail = (email: string) => {
        let split = email.split('@');
        if (email)
            return (
                email.substring(0, 1) + new Array(split[0].length - 1).fill('*').join('') + '@' + split[1]
            );

        return '';
    };

    const maskPhone = (phone = '9999999999') => {
        // 6 digits + special characters () -
        return `******${phone.substring(9, phone.length)}`
    }

    const onValidSubmit = useCallback(
        async () => {
            try {
                const newData: EmailIdentifier = {
                    "email": formValues.email,
                    "phoneNumber": formValues.mobile,
                    "idBelongState": formValues.id,
                    "isEnglish": t('general.locale') == 'en',
                    "byEmail": sendByEmail ?? false
                };
                const res = await sendEmail(newData).unwrap();

                switch (res?.cause) {
                    case 'SUCCESS':
                        setModal({
                            render: () => (<ModalCodeSentFP isMobile={!sendByEmail} onPress={() => { onPress(newData), isByEmail(sendByEmail) }} />),
                            height: 280
                        })
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
        [sendByEmail, sendEmail, formValues],
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentText}>
                <Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('forgotPassword.textSelectEmail')}</Text>
            </View>
            <Text style={styles.textSelectEmail} maxFontSizeMultiplier={1.3}>
                {t('createAccount.inputs.selectEmail')}
            </Text>
            <View style={styles.contentRow}>
                <RadioButton
                    accessibilityRole='radio'
                    isSelected={sendByEmail}
                    onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => changeValues('email')}
                    textStyle={styles.textRadioButton}
                    style={styles.radioButton} />
                <Input
                    editable={false}
                    icon={<EnvelopeIcon />}
                    inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                    placeholder={''}
                    value={maskEmail(formValues.email ?? '')}
                    name={t('createAccount.inputs.selectEmail')} />
            </View>
            <Text style={styles.textMobileNumber} maxFontSizeMultiplier={1.3}>
                {t('createAccount.inputs.selectMobileNumber')}
            </Text>
            <View style={[styles.contentRow, { marginBottom: 32 }]}>
                <RadioButton
                    accessibilityRole='radio'
                    isSelected={sendByEmail == undefined ? undefined : !sendByEmail}
                    onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => changeValues('mobile')}
                    textStyle={styles.textRadioButton}
                    style={styles.radioButton} />
                <Input
                    editable={false}
                    icon={<MobileAlt />}
                    inputStyle={{ marginBottom: 0, width: Dimensions.get('window').width * 0.75 }}
                    placeholder={''}
                    value={maskPhone(formValues.mobile ?? '')}
                    name={t('createAccount.inputs.selectMobileNumber')} />
            </View>
            <Button
                disabled={idError}
                style={{ width: 'auto', marginTop: 30, marginBottom: 10 }}
                accesibilityLabel={t('accessibility.next')}
                title={t('forgotPassword.buttons.next')}
                onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : () => handleValidate()}
            />
            <Button
                style={styles.btnSupport}
                textStyle={styles.textBtnSupport}
                title={t('unblockAccount.btnSupportChat')}
                variant={'Underline'}
                onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : navigateSupportChat}
                icon={<SupportChatBlue />}
            />
        </View>
    );
}

export default ContactInfoData;