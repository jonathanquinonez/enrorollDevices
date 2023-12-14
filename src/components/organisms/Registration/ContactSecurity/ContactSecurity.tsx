import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Password from './Password/Password';
import ContactAndSecurity from './ContactAndSecurity/ContactAndSecurity';
import CreateAccount from './CreateAccount/CreateAccount';
// Types, Styles
import { ContactPasswordInfo, ContactSecurityInfo, ContactSecurityProps as Props } from './ContactSecurity.types';
import componentStyles from './ContactSecurity.styles';
import Button from 'src/components/atoms/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserComplementaryInfo } from 'domain/entities/userComplementaryInfo';
import { UserConfirmCredentials } from 'domain/entities/userConfirmCredentials';
import moment from 'moment';


const ContactSecurity: React.FC<Props> = (props) => {
    const { values, handleNext, accountInfo, elegibilityData, resetForm, openwarning, statusMaintenance } = props;
    const { styles } = useStyles(componentStyles);
    const { t } = useTranslation();

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm<UserComplementaryInfo>({
        resolver: yupResolver(ContactSecurityInfo),
        mode: 'onBlur'
    });

    const {
        control: control2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        setValue: setValue2,
        reset: reset2
    } = useForm<UserConfirmCredentials>({
        resolver: yupResolver(ContactPasswordInfo),
        mode: 'onBlur'
    });

    useEffect(() => { reset(); reset2() }, [resetForm])

    const formatPhone = (value: string) => {
        return `(${value.substring(0, 3) ?? ''})${value.substring(4, 7) ?? ''}-${value.substring(8, 12) ?? ''}`
    }

    const formatearNumeroTelefono = (numero: any): any => {
        const cleaned = ('' + numero).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ')' + match[2] + '-' + match[3];
        }
        return null; // Devuelve null si el número no se puede formatear
    }

    if (elegibilityData?.city) {
        setValue('address1', elegibilityData.address1)
        setValue('address2', elegibilityData.address2)
        setValue('city', elegibilityData.city)
        let homePhone = elegibilityData?.homePhone.replace(/[^\d]/g, '');
        if (elegibilityData.homePhone) setValue('homePhone', formatearNumeroTelefono(homePhone))
        setValue('ssn', elegibilityData.ssn)
        setValue('zipCode', elegibilityData.zipCode)
    }

    const onValidate = useCallback(
        (value) => {
            handleNext(value, values.type == 2 ? 4 : 3)
        },
        [values],
    );
    useEffect(() => {
        console.log('---->-2-->', values.hadSanitas, values.type)
    }, [values.hadSanitas])
    return (
        <View style={styles.container}>
            <Text style={styles.title} maxFontSizeMultiplier={1.3}>
                {(values.hadSanitas == 1 && values.type == 1) ? t('createAccount.titlesContactSecurity.contactAndSecurity') :
                    (values.hadSanitas == 1 && values.type == 2) ? t('createAccount.titlesContactSecurity.password') :
                        (values.hadSanitas == 2) ? t('createAccount.titlesContactSecurity.createAccount') : ''
                }
            </Text>
            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginTop: 32 }}>

                    {(values.hadSanitas == 2) ?
                        <>
                            <CreateAccount control={control} errors={errors} elegibilityData={elegibilityData} setValue={setValue} />
                            <Password control={control} errors={errors} setValue={statusMaintenance == 'in_maintenance' ? () => openwarning() : setValue} />
                        </> : (values.hadSanitas == 1 && values.type == 2) ?
                            <Password control={control2} errors={errors2} setValue={statusMaintenance == 'in_maintenance' ? () => openwarning() : setValue2} />
                            :
                            <ContactAndSecurity resetForm={resetForm} accountInfo={accountInfo} handleNext={statusMaintenance == 'in_maintenance' ? () => openwarning() : handleNext} />}
                </View>
                <View style={{ alignSelf: 'center' }}>
                    {(values.hadSanitas == 2 || (values.hadSanitas == 1 && values.type == 2)) ?
                        <Button
                            accesibilityLabel={t('accessibility.next')}
                            style={{ width: 200, marginBottom: 15 }}
                            title={t('createAccount.buttons.next')}
                            onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() : (values.hadSanitas == 1 && values.type == 2) ? handleSubmit2(onValidate) : handleSubmit(onValidate)} /> : <></>}
                </View>
            </View>
        </View>
    );
};

export default ContactSecurity;