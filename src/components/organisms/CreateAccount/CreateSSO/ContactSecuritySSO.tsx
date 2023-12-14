import React, { useCallback, useEffect } from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import Password from '../../Registration/ContactSecurity/Password/Password';
import ContactAndSecurity from '../../Registration/ContactSecurity/ContactAndSecurity/ContactAndSecurity';
import CreateAccount from '../../Registration/ContactSecurity/CreateAccount/CreateAccount';
// Types, Styles
import { ContactPasswordInfo, ContactSecurityInfo, ContactSecurityProps as Props } from '../../Registration/ContactSecurity/ContactSecurity.types';
import componentStyles from '../../Registration/ContactSecurity/ContactSecurity.styles';
import Button from 'src/components/atoms/Button/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { UserComplementaryInfo } from 'domain/entities/userComplementaryInfo';
import { UserConfirmCredentials } from 'domain/entities/userConfirmCredentials';


const ContactSecuritySSO: React.FC<Props> = (props) => {
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

    if (elegibilityData?.city) {
        setValue('address1', elegibilityData.address1)
        setValue('address2', elegibilityData.address2)
        setValue('city', elegibilityData.city)
        if (elegibilityData.homePhone) setValue('homePhone', formatPhone(elegibilityData.homePhone))
        setValue('ssn', elegibilityData.ssn)
        setValue('zipCode', elegibilityData.zipcode)
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
                {t('createAccount.titlesContactSecurity.contactAndSecurity')}
            </Text>
            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'center', marginTop: 32 }}>
                    <ContactAndSecurity resetForm={resetForm} accountInfo={accountInfo} handleNext={statusMaintenance == 'in_maintenance' ? () => openwarning() : handleNext} />
                </View>
            </View>
        </View>
    );
};

export default ContactSecuritySSO;