import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MASK } from 'ui-core/utils/mask';
//Components
import Input from 'src/components/atoms/Input/Input';
import Button from 'src/components/atoms/Button/Button';
import ForgotService from 'adapter/api/forgotService';
import { useLoading } from '../../LoadingProvider/LoadingProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { PersonalInfFP, ValidateStates } from 'infrastructure/keraltyApi/models/auth';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
//Styles and Types
import componentStyles from './PersonalInfoData.styles';
import { PersonalInfoDataProps as Props, PersonalInf } from './PersonalInfoData.types';
import { UserIdentifier } from 'domain/entities/userIdentifier';
//Images
import EmailIcon from 'icons/EmailIcon.svg';
import MobileAlt from 'icons/MobileAlt.svg';
import moment from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalStates from 'src/components/molecules/ModalStates/ModalStates';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import SupportChatBlue from 'icons/supportChatBlue.svg';

import verifyDomain from 'hooks/verifyDomain';
import { useAppDispatch } from 'adapter/hooks';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { validateNonRepeatingDomains } from 'ui-core/utils/validateNonRepeatingDomains';

const PersonalInfoData = (props: Props) => {
	const {
		onSubmit,
		position,
		resetForm,
		actionResetForm,
		navigateSupportChat,
		openwarning,
		statusMaintenance,
	} = props;
	const { styles, colors } = useStyles(componentStyles);
	const [asyncError, setAsyncError] = useState<string | undefined>();
	const [errorsObj, setErrorsObj] = useState(false);
	const { t } = useTranslation();
	const { setLoading } = useLoading();
	const { closeModal, setModal } = useBottomSheet();

	//SERVICES
	const [validateUserInfo] = ForgotService.useValidateUserExistenceMutation();
	const [validateTempSession] = ForgotService.useValidateTempSessionMutation();
	const [validateStates] = ForgotService.useValidateAccountByStateMutation();

	const dispatch = useAppDispatch();
	const { requestVerifyDomain } = verifyDomain();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		setError,
		watch,
	} = useForm<PersonalInfFP>({
		resolver: yupResolver(PersonalInf),
		mode: 'onBlur',
	});

	useEffect(() => {
		reset();
	}, [resetForm]);
	useEffect(() => {
		if (Object.keys(errors).length > 0 && Object.keys(errors).length < 3) setErrorsObj(true);
		else setErrorsObj(false);
	}, [errors.dateOfBirth, errors.email, errors.mobile]);

	const { setAlertErrorMessage } = useErrorAlert();
	const handleSuccessStep = useCallback(
		async (values: PersonalInfFP, state?: string) => {
			try {
				dispatch(loaderActions.setLoading(true));
				const correctedMailDomain = validateNonRepeatingDomains(values?.email);

				if (!correctedMailDomain) {
					dispatch(loaderActions.setLoading(false));
					setError('email', {
						type: 'manual',
						message: 'invalidEmail',
					});
					return;
				}

				const email = values?.email;
				const notDomain = email.split('@')[1];
				const responseTwo = await requestVerifyDomain(notDomain);
				dispatch(loaderActions.setLoading(false));
				if (responseTwo.data) {
					const validStateValue: ValidateStates = {
						mobile: values.mobile,
						email: values.email.toLocaleLowerCase(),
						dateOfBirth: moment(values.dateOfBirth).format(FORMATS.dateISO8601),
					};

					const response: any = await validateStates(validStateValue).unwrap();

					if (response?.length > 1 && !state) {
						setModal({
							render: () => (
								<ModalStates
									listStates={response}
									state={(v) => handleSuccessStep(values, v)}
									closeModal={closeModal}
								/>
							),
							height: 400,
							blockModal: true,
						});
					} else {
						const isValid = await validateTempSession({
							email: values.email.toLocaleLowerCase(),
							state: response?.length == 1 ? response[0] : state,
						}).unwrap();
						switch (isValid?.cause) {
							case 'SUCCESS':
								const res = await validateUserInfo({
									...values,
									dateOfBirth: validStateValue.dateOfBirth,
									state: response?.length == 1 ? response[0] : state,
								}).unwrap();
								onSubmit({ id: res, ...validStateValue });
								break;
							case 'ATTEMPTS':
								setModal({
									render: () => (
										<ModalWarning
											isIconAlert
											warningText={
												<>
													<Text maxFontSizeMultiplier={1.3}>
														{t('warningMessage.attempts1')}
													</Text>
													<Text
														maxFontSizeMultiplier={1.3}
														style={{ fontFamily: 'proxima-bold' }}
													>
														{isValid?.timer + t('warningMessage.min')}
													</Text>
													<Text maxFontSizeMultiplier={1.3}>
														{t('warningMessage.attempts2')}
													</Text>
												</>
											}
											onPress={() => {
												closeModal();
												actionResetForm();
											}}
										/>
									),
									height: 380,
								});
								break;
							case 'VERIFIED':
								setModal({
									render: () => (
										<ModalWarning
											isIconAlert
											warningText={
												<>
													<Text maxFontSizeMultiplier={1.3}>
														{t('warningMessage.verified1')}
													</Text>
													<Text
														maxFontSizeMultiplier={1.3}
														style={{ fontFamily: 'proxima-bold' }}
													>
														{isValid?.timer + t('warningMessage.min')}
													</Text>
													<Text maxFontSizeMultiplier={1.3}>
														{t('warningMessage.verified2')}
													</Text>
												</>
											}
											onPress={() => {
												closeModal();
												actionResetForm();
											}}
										/>
									),
									height: 380,
								});
								break;
							case 'TRIES':
								setModal({
									render: () => (
										<ModalWarning
											isIconAlert
											warningText={`${t(`errors.limit1`)} ${
												isValid?.timer
											} ${t(`errors.limit2`)}`}
											onPress={() => {
												closeModal();
												actionResetForm();
											}}
										/>
									),
									height: 300,
									blockModal: true,
								});
								break;
							default:
								break;
						}
					}
					setAsyncError(undefined);
				} else {
					setError('email', {
						message: 'emailNotValid',
					});
				}
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`));
			}
		},
		[position],
	);

	const onValidSubmit = (values: PersonalInfFP) => {
		handleSuccessStep(values);
		// reset(values);
	};

	return (
		<View style={styles.container}>
			<Text
				style={{
					alignSelf: 'flex-start',
					marginLeft: 27,
					fontSize: 14,
					color: colors.BLUEDC1,
					fontFamily: 'proxima-bold',
					marginTop: 5,
					marginBottom: 5,
				}}
			>
				{t('consents.requiredFields')}
			</Text>
			<DatePickerController
				control={control}
				label={t('createAccount.inputs.dateBirth')}
				error={errors.dateOfBirth}
				name={'dateOfBirth'}
				pikerStyle={{ width: Dimensions.get('window').width * 0.85 }}
			/>
			<Input
				icon={<MobileAlt />}
				keyboardType="numeric"
				mask={MASK.phone}
				inputStyle={{ width: Dimensions.get('window').width * 0.85 }}
				placeholder={t('forgotPassword.placeholders.mobile')}
				label={t('createAccount.inputs.mobile')}
				name={'mobile'}
				control={control}
				error={errors.mobile}
				autoCorrect={false}
			/>
			<Input
				icon={<EmailIcon />}
				labelStyle={styles.label}
				inputStyle={styles.input}
				placeholder={t('login.placeholder.email')}
				name="email"
				control={control}
				error={errors.email}
				keyboardType={'email-address'}
				label={t('forgotPassword.eMail')}
				caretHidden={false}
			/>
			{/* {errorsObj && (
				<View style={{ marginBottom: 0, width: '85%' }}>
					<Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>
						{t(`error`)}
					</Text>
				</View>
			)} */}
			<Button
				accesibilityLabel={t('accessibility.next')}
				style={{ width: 'auto', marginVertical: 15 }}
				title={t('forgotPassword.buttons.next')}
				onPress={
					statusMaintenance == 'in_maintenance'
						? () => openwarning()
						: handleSubmit(onValidSubmit)
				}
			/>

			<Button
				accesibilityLabel={t('accessibility.linkSupport')}
				style={styles.btnSupport}
				textStyle={styles.textBtnSupport}
				title={t('unblockAccount.btnSupportChat')}
				variant={'Underline'}
				onPress={
					statusMaintenance == 'in_maintenance'
						? () => openwarning()
						: navigateSupportChat
				}
				icon={<SupportChatBlue />}
			/>
		</View>
	);
};

/* 
Datos de prueba
{
    "dateOfBirth": "2022-12-01",
    "mobile": "(972)468-1190",
    "email": "pruebatnfl@yopmail.com",
}
{
    "dateOfBirth": "1987-05-26",
    "mobile": "(347)745-1952",
    "email": "ramirezfredy@yopmail.com",
}
{
    "dateOfBirth": "1997-08-25",
    "mobile": "5076044542",
    "email": "karenramirez@yopmail.com",
}
*/

export default PersonalInfoData;
