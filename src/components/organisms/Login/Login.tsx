/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState, useCallback, useMemo } from 'react';
import { Buffer } from 'buffer';
// Types, Styles
import { LoginProps as Props } from './Login.types';
import HeaderLogin from 'src/components/molecules/HeaderLogin/HeaderLogin';
import LoginForm from 'src/components/molecules/LoginForm/LoginForm';
import Row from 'src/components/atoms/Row/Row';
import AuthService from 'adapter/api/authService';
//
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { View, Text } from 'react-native';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { SubmitCredentials } from 'src/components/molecules/LoginForm/LoginForm.types';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
import { twoFactorActions } from 'adapter/user/twoFactor/twoFactorSlice';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalStates from 'src/components/molecules/ModalStates/ModalStates';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useNavigation } from '@react-navigation/native';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';

/**
 * Render a login.
 * @since 2.0.0
 */
const LoginOrganism = (props: Props) => {
	const [login] = AuthService.useLoginSecurityMutation();
	const [doLoginAllStates] = AuthService.useDoLoginAllStatesMutation();
	const [fetchVerifyEmailAndMobile] = AuthService.useFetchVerifyEmailAndMobileMutation();
	const { setAlertErrorMessage } = useErrorAlert();
	const { t } = useTranslation();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const [autoFocus, setautoFocus] = useState(true);
	const { closeModal: closeModalAction, setModal } = useBottomSheet();
	const {
		serverDate: startDateState,
		hourDifference,
		statusMaintenance,
		maintenanceData,
	} = useAppSelector(userSelectors.selectServerDate);

	const openwarning = useCallback(() => {
		const message = maintenanceData?.message;
		const payload = maintenanceData?.payload;
		const dateInitET = getCustomDate({
			date: payload?.date_init ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.ET,
		});
		const dateEndET = getCustomDate({
			date: payload?.date_end ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.ET,
		});
		const dateInitCT = getCustomDate({
			date: payload?.date_init ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.CT,
		});
		const dateEndCT = getCustomDate({
			date: payload?.date_end ?? '',
			language: t('general.locale'),
			timeZone: TIMES_ZONES.CT,
		});

		const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${
			t('general.locale') === 'es' ? 'al' : 'to'
		} ${dateEndET.date} ${dateEndET.time} / ${dateEndCT.time}`;
		// const privateTextMessage = `${dateEndET.time} - ${dateEndCT.time}`;

		if (maintenanceData && message) {
			const body = t('warningMessage.maintenance');
			if (body) {
				const textView = body.replace('[message]', textMessage);
				setModal({
					render: () => (
						<ModalWarning
							delateBtn
							isIconAlert
							styleTitle={{ color: '#055293', fontSize: 16 }}
							styleSubtitle={{ color: '#055293', fontSize: 14 }}
							onPress={() => {
								closeModal();
							}}
							title={textView}
							warningText={t('warningMessage.maintenanceSub')}
						/>
					),
					blockModal: true,
				});
			}
		}
	}, [startDateState, maintenanceData]);

	const handlePageBlockedAccount = () => {
		navigation.navigate('BlockedAccountScreen');
	};

	const closeModal = () => {
		closeModalAction();
	};

	const openModalWarning = (text: string, textBtn: string, nextPage: boolean, title?: string) => {
		setautoFocus(false);
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					warningText={text}
					title={title}
					textButton={textBtn}
					onPress={() => {
						nextPage ? (closeModal(), handlePageBlockedAccount()) : closeModal();
					}}
				/>
			),
			height: 320,
			blockModal: false,
		});
	};

	const twoFactorAuthentication = async (value: any, state: any) => {
		try {
			const buff = Buffer.from(
				JSON.stringify({
					pass: value.credentials.password.trim(),
					email: value.credentials.email.trim(),
					state,
				}),
				'utf-8',
			);
			const base64 = buff.toString('base64');

			const response: any = await fetchVerifyEmailAndMobile({ info: base64 });
			if (response?.error) {
				if (response?.error == 410) {
					const ts: any = (
						<Text
							style={{ color: '#055293', fontSize: 14 }}
							maxFontSizeMultiplier={1.3}
						>
							<Text
								style={{ fontWeight: 'bold', fontSize: 20, color: '#002D57' }}
								maxFontSizeMultiplier={1.3}
							>
								{t(`unblockAccount.yourBlockAccount`)}
								{'\n\n'}
							</Text>
							{t(`unblockAccount.passExpired`)}
						</Text>
					);
					return openModalWarning(ts, t(`blackList.navigateUnblockAccount`), true);
				}
			}

			const phone = response?.data?.phone;
			const email = response?.data?.email;

			dispatch(twoFactorActions.setVerifyEmailAndMobile({ email, phone, value }));
			navigation.navigate('TwoFactorSelectScreen');
		} catch (err: any) {
			throw Error(JSON.stringify(err));
		}
	};

	const onValidSubmit = useCallback(
		async (values: SubmitCredentials, state?: string) => {
			if (values.credentials) {
				const buff = Buffer.from(
					JSON.stringify({
						pass: values.credentials.password.trim(),
						email: values.credentials.email.trim(),
						state: '',
					}),
					'utf-8',
				);
				const base64 = buff.toString('base64');
				const response: any = await doLoginAllStates({ info: base64 });
				if (response?.data && response?.data.length > 1 && !state) {
					setModal({
						render: () => (
							<ModalStates
								listStates={response?.data}
								state={(v) => onValidSubmit(values, v)}
								closeModal={closeModal}
							/>
						),
						height: 400,
						blockModal: false,
					});
				} else if (response.error) {
					setAlertErrorMessage(t(`errors.loginFailure`));
				} else {
					const getVal = response.data[response?.data.length - 1];
					switch (getVal) {
						case '4':
						case '3':
						case '2':
							setAlertErrorMessage(t(`unblockAccount.error80`));
							break;
						case '1':
							setAlertErrorMessage(t(`unblockAccount.lastChance`));
							break;
						case '0':
							const title: any = (
								<Text
									style={{
										fontWeight: 'bold',
										fontSize: 20,
										color: '#002D57',
									}}
									maxFontSizeMultiplier={1.3}
								>
									{t(`unblockAccount.yourBlockAccount`)}
								</Text>
							);
							const subtitle: any = (
								<Text
									style={{ color: '#055293', fontSize: 14 }}
									maxFontSizeMultiplier={1.3}
								>
									{t(`unblockAccount.excededTheNumero`)}
								</Text>
							);
							openModalWarning(
								subtitle,
								t(`unblockAccount.unblockAccount`),
								true,
								title,
							);
							break;
						case '-2':
							const txt: any = (
								<Text
									style={{ color: '#055293', fontSize: 14 }}
									maxFontSizeMultiplier={1.3}
								>
									<Text
										style={{
											fontWeight: 'bold',
											fontSize: 20,
											color: '#002D57',
										}}
										maxFontSizeMultiplier={1.3}
									>
										{t(`blackList.title`)}
										{'\n\n'}
									</Text>
									{t(`blackList.subTitle`)}
								</Text>
							);
							openModalWarning(txt, t(`blackList.btnClose`), false);
							break;
						default:
							if (isNaN(getVal) != false) {
								let newState;
								if (response?.data.length == 1) {
									dispatch(userActions.setLocation(response?.data[0]));
									newState = response?.data[0];
								} else {
									dispatch(userActions.setLocation(state));
									newState = state;
								}
								if (
									values.credentials.email.toLowerCase() ===
									'testdemo@yopmail.com'
								) {
									//Valida si el usuario es el de pruebas, sino, entonces hace la doble autenticación
									await login({
										...values.credentials,
										state:
											response?.data.length == 1 ? response?.data[0] : state,
										isBiometric:
											values.type === 'biometrical' ||
											values.type === 'biometricalUpdate'
												? true
												: false,
									}).then(async (result: any) => {
										if (result.data) {
											if (result.data?.token == '-1') {
												const ts: any = (
													<Text
														style={{ color: '#055293', fontSize: 14 }}
														maxFontSizeMultiplier={1.3}
													>
														<Text
															style={{
																fontWeight: 'bold',
																fontSize: 20,
																color: '#002D57',
															}}
															maxFontSizeMultiplier={1.3}
														>
															{t(`unblockAccount.yourBlockAccount`)}
															{'\n\n'}
														</Text>
														{t(`unblockAccount.passExpired`)}
													</Text>
												);
												openModalWarning(
													ts,
													t(`blackList.navigateUnblockAccount`),
													true,
												);
											}

											if (values.type === 'biometricalUpdate') {
												await AsyncStorage.setItem(
													ASYNC_STORAGE.BIOMETRICALTERMS,
													'true',
												);
												await AsyncStorage.setItem(
													ASYNC_STORAGE.BIOMETRICALUSER,
													JSON.stringify({
														...values.credentials,
														state: response?.data[0],
													}),
												);
												await AsyncStorage.setItem(
													ASYNC_STORAGE.BIOMETRICALOPTION,
													'true',
												);
											}
											if (values.type === 'biometrical') {
												await AsyncStorage.setItem(
													ASYNC_STORAGE.BIOMETRICALUSER,
													JSON.stringify({
														...values.credentials,
														state: response?.data[0],
													}),
												);
												await AsyncStorage.setItem(
													ASYNC_STORAGE.BIOMETRICALOPTION,
													'true',
												);
											}
										} else {
											setAlertErrorMessage(t(`errors.code${result.error}`));
										}
									});
								} else {
									twoFactorAuthentication(values, newState);
								}
							}
					}
				}
			}
		},
		[login],
	);

	const [isBubbleMenu, setIsBubbleMenu] = useState(false);
	const [boobleState, setBoobleState] = useState(false);

	useMemo(
		() => (!isBubbleMenu ? setTimeout(() => setBoobleState(false), 200) : setBoobleState(true)),
		[isBubbleMenu],
	);

	return (
		<View style={{ flex: 1 }}>
			<Row style={{ backgroundColor: '#034268' }}>
				<HeaderLogin />
			</Row>
			<Row width={4} style={{ backgroundColor: '#034268' }}>
				<LoginForm
					onSubmit={onValidSubmit}
					boobleState={setIsBubbleMenu}
					autoFocus={autoFocus}
				/>
			</Row>
			{/* 			{boobleState ? (
				<BubbleMenu
					openwarning={openwarning}
					statusMaintenance={statusMaintenance}
					buttons={[
						{
							title: t('bobbleMenu.appointments'),
							icon: <AppointmentsIcon />,
							route: 'VimView',
						},
						{
							title: t('bobbleMenu.support'),
							icon: <SupportChatIcon />,
							route: 'ChatSanitas',
						},
						{
							title: t('bobbleMenu.symptoms'),
							icon: <CheckSymptomsIcon />,
							route: 'SymtomsView',
						},
					]}
					onPress={(status) => setIsBubbleMenu(!status)}
					isActive={isBubbleMenu}
				/>
			) : (
				<></>
			)} */}
		</View>
	);
};

export default LoginOrganism;
