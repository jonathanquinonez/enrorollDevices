import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
// Hooks
import { yupResolver } from '@hookform/resolvers/yup';
import useStyles from 'hooks/useStyles';
// Types, Styles
import {
	PersonalInfo,
	PersonalInfoData,
	PersonalInfoDataBAProps as Props,
} from './PersonalInfoDataBA.types';
import componentStyles from './PersonalInfoDataBA.styles';
import { MASK } from 'ui-core/utils/mask';
//Components
import Button from 'src/components/atoms/Button/Button';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Input from 'src/components/atoms/Input/Input';
import { useForm } from 'react-hook-form';
//Images
import SupportChatBlue from 'icons/supportChatBlue.svg';
import User from 'icons/User.svg';
import EnvelopeIcon from 'icons/EnvelopeIcon.svg';
import MobileAlt from 'icons/MobileAlt.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { windowDimentions } from 'ui-core/utils/globalStyles';

/**
 * Render a PersonalInfoDataBA.
 * @since 1.0.0
 */
const PersonalInfoDataBA = (props: Props) => {
	const { style, handlerNext, navigateSupportChat, emailValid } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setError,
		setValue,
	} = useForm<PersonalInfoData>({
		resolver: yupResolver(PersonalInfo),
		mode: 'onBlur',
	});

	// Validación por props del correo
	useEffect(() => {
		if (emailValid == null) {
			// Validación segmentos repetidos
			setError('email', {
				type: 'manual',
				message: 'invalidEmail',
			});
		} else if (emailValid) {
			// Validacion en back
			setError('email', {
				message: 'emailNotValid',
			});
		}
	}, [emailValid]);

	return (
		<View style={styles.container}>
			<Text style={styles.title_font} maxFontSizeMultiplier={1.3}>
				{t('unblockAccount.personalInfo')}
			</Text>
			<Text accessibilityRole="header" style={styles.subtitle} maxFontSizeMultiplier={1.3}>
				{t('unblockAccount.subtitle1')}
			</Text>
			<Text
				style={{
					alignSelf: 'flex-start',
					marginLeft: 27,
					fontSize: 14,
					color: colors.BLUEDC1,
					fontFamily: 'proxima-bold',
					marginTop: 15,
					marginBottom: -5,
				}}
			>
				{t('consents.requiredFields')}
			</Text>

			<Input
				icon={<User />}
				keyboardType="name-phone-pad"
				labelStyle={{ marginTop: 20 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('createAccount.placeholders.firstName')}
				label={t('createAccount.inputs.firstName')}
				name={'firstName'}
				control={control}
				error={errors.firstName}
			/>
			<Input
				icon={<User />}
				keyboardType="name-phone-pad"
				labelStyle={{ marginTop: 10 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('createAccount.placeholders.lastName')}
				label={t('createAccount.inputs.lastName')}
				name={'lastName'}
				control={control}
				error={errors.lastName}
			/>
			<Input
				icon={<EnvelopeIcon />}
				labelStyle={{ marginTop: 10 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('createAccount.placeholders.eMail')}
				label={t('createAccount.inputs.eMail')}
				keyboardType="email-address"
				name={'email'}
				control={control}
				error={errors.email}
			/>

			<Input
				icon={<MobileAlt />}
				keyboardType="numeric"
				mask={MASK.phone}
				labelStyle={{ marginTop: 10 }}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('createAccount.placeholders.mobile')}
				label={t('createAccount.inputs.mobile')}
				name={'mobile'}
				control={control}
				error={errors.mobile}
				autoCorrect={false}
			/>

			<Button
				accessibilityRole="button"
				style={{ marginVertical: 20 }}
				title={t('unblockAccount.btnNext')}
				onPress={handleSubmit(handlerNext)}
			/>

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
};

export default PersonalInfoDataBA;
