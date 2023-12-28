import React, { useCallback, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { yupResolver } from '@hookform/resolvers/yup';
//Components
import PersonalInfo from './PersonalInfo/PersonalInfo';
import AccountNumber from './AccountNumber/AccountNumber';
// Types, Styles
import { AccountInformationProps as Props, UserInf } from './AccountInformation.types';
import componentStyles from './AccountInformation.styles';
import RegisterService from 'adapter/api/registerService';
import Button from 'src/components/atoms/Button/Button';
import { useForm } from 'react-hook-form';
import { CreateUser } from 'domain/entities/createUser';
import { useTranslation } from 'react-i18next';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import moment from 'moment';
import FORMATS from '../../../../ui-core/utils/formats';

import verifyDomain from 'hooks/verifyDomain';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { useAppDispatch } from 'adapter/hooks';

import { validateNonRepeatingDomains } from '../../../../ui-core/utils/validateNonRepeatingDomains';
import { useAppSelector } from '../../../../adapter/hooks';
import { userSelectors } from '../../../../adapter/user/userSelectors';
import { userActions } from '../../../../adapter/user/userSlice';

//Images
import IconWarningRed from 'icons/IconWarningRed.svg';

const AccountInformation: React.FC<Props> = (props) => {
	const {
		optionNumber,
		handleNext,
		setAccountInfo,
		receiveService,
		setElegibilityData,
		resetForm,
		actionResetForm,
		openwarning,
		statusMaintenance,
		elegibilityData,
	} = props;
	const { styles } = useStyles(componentStyles);

	const [asyncError, setAsyncError] = useState<string | undefined>();
	const [clearTemp, setClearTemp] = useState<boolean>(false);
	const [createUser] = RegisterService.useRegistrationCheckMutation();
	const [docreateuserecwmc] = RegisterService.useMatchAccountInfoMutation();
	const [loadElegibilityData] = RegisterService.useLoadElegibilityDataMutation();
	const [loadMaxUserInfoSSO] = RegisterService.useLazyLoadMaxUserInfoSSOQuery();
	const [verifyCodeEcw] = RegisterService.useVerifyCodeEcwMutation();
	const { requestVerifyDomain } = verifyDomain();
	const selectSSO = useAppSelector(userSelectors.selectSSO);
	const { closeModal, setModal } = useBottomSheet();
	const tempUserSSO = useAppSelector((state) => state.user.tempUserSSO);
	const tempEmailSSOEdited = useAppSelector((state) => state.user.tempEmailSSOEdited);

	const { t } = useTranslation();
	const dispatch = useAppDispatch();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		setValue,
		reset,
		watch,
		setError,
		getValues,
	} = useForm<CreateUser>({
		resolver: yupResolver(UserInf),
		mode: 'onBlur',
	});

	useEffect(() => {
		reset();
		setClearTemp(true);
		setTimeout(() => {
			setClearTemp(false);
		}, 1200);
	}, [resetForm]);
	const { setAlertErrorMessage } = useErrorAlert();

	const onValidSubmit = useCallback(
		async (values) => {
			try {
				// if (
				// 	values?.email?.toLowerCase() == elegibilityData?.email?.toLowerCase() &&
				// 	tempUserSSO &&
				// 	tempUserSSO != 'NO_FB'
				// ) {
				// 	dispatch(userActions.setTempEmailSSOEdited(true));
				// 	showModalSSO();
				// 	return;
				// }
				let isFBMax: boolean | undefined = undefined;
				let id: string = '';
				if (receiveService == 1 && optionNumber == 2) {
					const response = await docreateuserecwmc(values).unwrap();

					const respEcw: any = await verifyCodeEcw({
						accountNumber: response?.accountNumber ? response?.accountNumber : '',
						dateOfBirth: moment(values.dateOfBirth).format(FORMATS.dateISO8601),
					}).unwrap();

					switch (respEcw?.cause) {
						case 'SUCCESS':
							setElegibilityData(undefined);
							setAccountInfo({
								...values,
								isFBMax: !(response?.userId == 'NO_FB'),
								id: response?.userId == 'NO_FB' ? '' : response?.userId,
								accountNumber: response?.accountNumber
									? response?.accountNumber
									: '',
							});
							handleNext({ ...values, isFBMax }, optionNumber == 2 ? 3 : 2);
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
													{respEcw?.timer + t('warningMessage.min')}
												</Text>
												<Text maxFontSizeMultiplier={1.3}>
													{t('warningMessage.attempts2')}
												</Text>
											</>
										}
										onPress={() => {
											closeModal();
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
													{respEcw?.timer + t('warningMessage.min')}
												</Text>
												<Text maxFontSizeMultiplier={1.3}>
													{t('warningMessage.verified2')}
												</Text>
											</>
										}
										onPress={() => {
											closeModal();
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
										warningText={`${t(`errors.limit1`)} ${respEcw?.timer} ${t(
											`errors.limit2`,
										)}`}
										onPress={() => {
											closeModal();
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
				} else {
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

					const response = await requestVerifyDomain(notDomain);

					dispatch(loaderActions.setLoading(false));

					if (response.data) {
						createAccountFunction(values);
					} else {
						setError('email', {
							message: 'emailNotValid',
						});
					}
				}
			} catch (error) {
				dispatch(loaderActions.setLoading(false));
				if (error == 290) {
					setAsyncError('290');
					return;
				}
				if (error == '20' && tempUserSSO && tempUserSSO != 'NO_FB') {
					dispatch(userActions.setTempEmailSSOEdited(true));
					showModalSSO();
				} else {
					setAlertErrorMessage(t(`errors.code${error}`));
				}
			}
		},
		[createUser, optionNumber, receiveService, tempUserSSO, elegibilityData],
	);

	const createAccountFunction = useCallback(
		async (values) => {
			try {
				let isFBMax: boolean | undefined = undefined;
				let id: string = '';
				let responseElegibilityData: any = undefined;
				const response = await createUser(values).unwrap();
				switch (response?.cause) {
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
												{response?.timer + t('warningMessage.min')}
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
												{response?.timer + t('warningMessage.min')}
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
									warningText={`${t(`errors.limit1`)} ${response?.timer} ${t(
										`errors.limit2`,
									)}`}
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
						isFBMax =
							receiveService == 2 &&
							selectSSO?.tokenFB != undefined &&
							selectSSO?.tempUserSSO != undefined
								? true
								: !(response?.cause == 'NO_FB');
						id = response?.cause == 'NO_FB' ? '' : response?.cause;
						if (response?.cause && response?.cause != 'NO_FB')
							responseElegibilityData = await loadElegibilityData(
								response?.cause,
							).unwrap();

						let newTemp = response?.cause;
						dispatch(userActions.setTempUserSSO(newTemp));

						if (
							receiveService == 2 &&
							selectSSO?.tokenFB != undefined &&
							selectSSO?.tempUserSSO != undefined
						) {
							const response = await loadMaxUserInfoSSO(newTemp).unwrap();
							setElegibilityData(response);
							id = newTemp;
						} else {
							setElegibilityData(responseElegibilityData);
						}
						setAccountInfo({ accountNumber: '', id, dateOfBirth: '', isFBMax });
						handleNext({ ...values, isFBMax }, optionNumber == 2 ? 3 : 2);
						break;
				}
			} catch (error) {
				if (error == '20' && tempUserSSO && tempUserSSO != 'NO_FB') {
					dispatch(userActions.setTempEmailSSOEdited(true));
					showModalSSO();
				} else {
					setAlertErrorMessage(t(`errors.code${error}`));
				}
			}
		},
		[createUser, optionNumber, receiveService],
	);

	const showModalSSO = () => {
		setModal({
			render: () => (
				<ModalWarning
					icon={<IconWarningRed />}
					warningText={t(`login.ssoEmail.messageError`)}
					textButton={t(`login.ssoEmail.btnError`)}
					onPress={() => {
						closeModal();
					}}
				/>
			),
			height: 320,
			blockModal: true,
		});
	};

	return (
		<View style={styles.container}>
			<View style={{ alignItems: 'center', marginTop: 32 }}>
				{optionNumber == 0 || optionNumber == 2 ? (
					<>
						<PersonalInfo
							control={control}
							errors={errors}
							setValue={setValue}
							clearTemp={clearTemp}
							elegibilityData={elegibilityData}
							getValues={undefined}
						/>
					</>
				) : (
					<AccountNumber
						openwarning={openwarning}
						statusMaintenance={statusMaintenance}
						setAsyncError={setAsyncError}
						handleNext={handleNext}
						setAccountInfo={setAccountInfo}
						actionResetForm={actionResetForm}
					/>
				)}
				{optionNumber == 0 || optionNumber == 2 ? (
					<Button
						style={{ width: 200, marginVertical: 15 }}
						title={t('createAccount.buttons.next')}
						accesibilityLabel={t('accessibility.next')}
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: handleSubmit(onValidSubmit)
						}
					/>
				) : (
					<></>
				)}

				{asyncError && (
					<View style={{ marginBottom: 10, width: '85%' }}>
						<Text style={{ color: 'red' }} maxFontSizeMultiplier={1.3}>
							{t(`errors.code${asyncError}`)}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export default AccountInformation;
