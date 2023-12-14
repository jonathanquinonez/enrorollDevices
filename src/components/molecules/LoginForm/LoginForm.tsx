import React, { useCallback, useMemo } from 'react';
import { useState, useEffect } from 'react';
import {
	View,
	Text,
	ScrollView,
	Dimensions,
	Animated,
	Alert,
	Platform,
	TouchableOpacity,
} from 'react-native';
// Components
import Button from 'src/components/atoms/Button/Button';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Box from '../../atoms/Checkbox/Checkbox';
import useStyles from 'hooks/useStyles';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
// Types, Styles
import { LoginCredentials, LoginFormProps as Props, LoginSchema } from './LoginForm.types';
import componentStyles from './LoginForm.styles';
import Input from 'src/components/atoms/Input/Input';
// Images
import EmailIcon from 'icons/EmailIcon.svg';
import PasswordIcon from 'icons/PasswordIcon.svg';
import Workspaces from 'icons/Workspaces.svg';
import FaceId from 'src/components/atoms/FaceId/FaceId';
// libs
import * as LocalAuthentication from 'expo-local-authentication';

import { CommonActions, useNavigation } from '@react-navigation/native';
import Row from 'src/components/atoms/Row/Row';
import AsyncStorage from 'infrastructure/AsyncStorage';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import IconBiometric from 'icons/Icono-biometria.svg';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ASYNC_STORAGE } from 'config/constants/Global';
import {
	TIMES_ZONES,
	checkMaintenanceStatus,
	extraScrollHeigth,
	getCustomDate,
} from 'src/utils/devices';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import ModalWarning from '../ModalWarning/ModalWarning';
import GeneralService from 'adapter/api/generalService';
import GeneralServiceAuth from 'adapter/api/generalServiceAuth';
import { userActions } from 'adapter/user/userSlice';
import { loaderActions } from 'adapter/loader/loaderSlice';
import FaceIcon from 'icons/faceIcon.svg';
import { ChatKeralty, Keraltyhandles } from '@quillbot/keralty-chat-mobile';

const LoginForm = (props: Props) => {
	const { onSubmit, boobleState, autoFocus } = props;
	const { closeModal, setModal } = useBottomSheet();
	const { styles, colors } = useStyles(componentStyles);
	const [isBiometricSupported, setIsBiometricSupported] = useState(false);
	const [isCheckBiometric, setCheckIsBiometric] = useState(false);
	const [tempValidation, setTempValidation] = useState(false);
	const [serverDate] = GeneralService.useServerDateMutation();
	const [get_maintenance] = GeneralServiceAuth.useMaintenanceMutation();
	const {
		serverDate: startDateState,
		hourDifference,
		statusMaintenance,
		maintenanceData,
	} = useAppSelector(userSelectors.selectServerDate);
	const dispatch = useAppDispatch();

	const navigation = useNavigation();
	const { t } = useTranslation();
	const { setAlertErrorMessage } = useErrorAlert();
	const { previousRoute, currentRoute } = useAppSelector(userSelectors.selectRoute);

	const [userBiometrical, setUserBiometrical] = useState<LoginCredentials>();

	const {
		control,
		handleSubmit,
		formState: { errors, isDirty },
		reset,
		getValues,
	} = useForm<LoginCredentials>({
		resolver: yupResolver(LoginSchema),
		mode: 'onBlur',
	});

	//New Implementation
	const onAuthenticate = async (credentials: LoginCredentials, type: string = 'form') => {
		const auth = await LocalAuthentication.authenticateAsync({
			promptMessage: 'Authenticate',
			fallbackLabel: 'Enter password',
		});
		if (auth.success) {
			reset(credentials);
			onSubmit({
				credentials,
				type,
			});
		}
	};

	const handleLoginBiometrical = useCallback(
		(values: LoginCredentials) => {
			console.log('LOGIN WITH BIOMETRICAL');
			if (values.email && values.password && getValues('email')) {
				if (JSON.stringify(values) !== JSON.stringify(userBiometrical)) {
					onAuthenticate(values, 'biometricalUpdate');
					return;
				} else {
					onAuthenticate(userBiometrical, 'biometrical');
					return;
				}
			}
			if (!getValues('email') && userBiometrical) {
				onAuthenticate(userBiometrical, 'biometrical');
				return;
			}
		},
		[userBiometrical],
	);

	const handleLogin = async (values: LoginCredentials) => {
		console.log('LOGIN WITHOUT BIOMETRICAL');
		if (values.email && values.password) {
			await AsyncStorage.save(ASYNC_STORAGE.BIOMETRICALOPTION, 'false');
			onSubmit({
				credentials: values,
				type: 'form',
			});
			return;
		} else {
			setAlertErrorMessage(t('error'));
		}
	};

	const handleCheckBox = async (isChecked: boolean) => {
		setCheckIsBiometric(isChecked);
		if (!isChecked) await AsyncStorage.save(ASYNC_STORAGE.BIOMETRICALOPTION, 'false');
	};

	const validateModalBiometric = async () => {
		const biometricalModal = await AsyncStorage.getValueFor(ASYNC_STORAGE.BIOMETRICALMODAL);
		if (!biometricalModal) {
			setModal({
				render: () => (
					<ModalWarning
						icon={Platform.OS === 'ios' ? <FaceIcon /> : <IconBiometric />}
						title={
							Platform.OS === 'ios'
								? t('buttonShettAutBiometric.titleFaceId')
								: t('buttonShettAutBiometric.titleFinger')
						}
						warningText={t('buttonShettAutBiometric.sub')}
						onPress={() => {
							setCheckIsBiometric(false);
							closeModal();
						}}
						onPressCancel={async () => {
							await AsyncStorage.save(ASYNC_STORAGE.BIOMETRICALMODAL, 'true');
							closeModal();
						}}
						styleSubtitle={{ color: '#5B5C5B' }}
						textButton={t('indoormodal.buttonDisAgree')}
						textButtonCancel={t('buttonShettAutBiometric.buttonAgree')}
						colorTextBtnCancel="#FFF"
						styleBtnCancel={{ width: 'auto' }}
						styleBtn={{ alignSelf: 'center', minHeight: 45 }}
						variantBtn="Underline"
						colorTextBtn="#0071A3"
						variantBtnCancel="Contained"
						accessibilityRole1="button"
						accessibilityRole2="button"
						accesibilityLabel1={t('accessibility.accept')}
						accesibilityLabel2={t('accessibility.disagree')}
					/>
				),
				blockModal: true,
			});
		}
	};

	const validationsBiometric = async () => {
		//Validate hardware compatibility
		const compatible = await LocalAuthentication.hasHardwareAsync();
		setIsBiometricSupported(compatible);

		//Validate Biometrical Option
		if (compatible) {
			const userBiometricalStore = await AsyncStorage.getValueFor(
				ASYNC_STORAGE.BIOMETRICALUSER,
			);
			if (userBiometricalStore) setUserBiometrical(JSON.parse(userBiometricalStore));
			const biometricalOption = await AsyncStorage.getValueFor(
				ASYNC_STORAGE.BIOMETRICALOPTION,
			);
			if (biometricalOption && biometricalOption.includes('true')) {
				setCheckIsBiometric(true);
				const isLogout = await AsyncStorage.getValueFor('logout');
				if (isLogout && isLogout.includes('false')) {
					userBiometricalStore && onAuthenticate(JSON.parse(userBiometricalStore));
					if (userBiometricalStore) {
						handleLoginBiometrical(JSON.parse(userBiometricalStore));
					}
				} else {
					AsyncStorage.save('logout', 'false');
				}
			}
		}
	};

	const getServerDate = useCallback(async () => {
		const resp = await serverDate({}).unwrap();
	}, [serverDate]);

	const getMaintenance = useCallback(async () => {
		try {
			const resp = await get_maintenance({}).unwrap();
			if (resp.length) {
				const dataMan = resp.find((v: any) => v?.platform == 'app');
				dataMan && dataMan?.status && dispatch(userActions.setMaintenanceData(dataMan));
			}
			dispatch(loaderActions.setLoading(true));
			setTimeout(() => {
				setTempValidation(true);
				dispatch(loaderActions.setLoading(false));
				setTimeout(() => {
					setTempValidation(false);
				}, 5000);
			}, 2000);
		} catch (error) {}
	}, [get_maintenance, startDateState, hourDifference]);

	useEffect(() => {
		getMaintenance();
		getServerDate();
		validationsBiometric();
	}, []);

	useEffect(() => {
		if (isCheckBiometric) {
			validateModalBiometric();
		}
	}, [isCheckBiometric]);

	const opentAlert = useCallback(() => {
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
			const locale = t('general.locale') == 'en' ? 'en' : 'es';
			const body = message[`body_${locale}`];
			if (body) {
				const textView = body.replace('[message]', textMessage);
				setAlertErrorMessage(textView, 'warning');
			}
		}
	}, [startDateState, maintenanceData]);

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

		if (maintenanceData && message && statusMaintenance == 'in_maintenance') {
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
	}, [startDateState, maintenanceData, statusMaintenance]);

	useEffect(() => {
		if (statusMaintenance == 'upcoming_maintenance') {
			opentAlert();
		}
		if (statusMaintenance == 'in_maintenance' && tempValidation) {
			openwarning();
		}
	}, [statusMaintenance, tempValidation]);

	useEffect(() => {
		if (hourDifference !== undefined && startDateState)
			setTimeout(() => {
				increaseDateByOneSecond(new Date(startDateState));
			}, 100);
	}, [hourDifference]);

	const increaseDateByOneSecond = (date: Date) => {
		const startDate = date;
		try {
			const message = maintenanceData?.message;
			const payload = maintenanceData?.payload;
			startDate.setSeconds(startDate.getSeconds() + 60);
			dispatch(userActions.setServerDate(startDate.toISOString()));
			if (maintenanceData?.status) {
				const status = checkMaintenanceStatus(
					payload?.date_end ?? '',
					payload?.date_init ?? '',
					startDate.toISOString(),
				);
				dispatch(userActions.setStatusMaintenance(status));
			}
		} catch (error) {}
	};

	useEffect(() => {
		if (previousRoute == 'Home') openwarning();
		reset();
	}, [previousRoute, currentRoute]);
	const ref = React.useRef<Keraltyhandles>(null);
	const extraScrollHeight = extraScrollHeigth();
	return (
		<View style={styles.container}>
			<KeyboardAwareScrollView
				enableAutomaticScroll
				keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
				extraScrollHeight={extraScrollHeight}
				enableOnAndroid={true}
				contentContainerStyle={styles.contentContainer}
			>
				<Row style={styles.containerForm}>
					<Input
						autoFocus={autoFocus}
						placeholder={t('login.placeholder.email')}
						keyboardType="email-address"
						labelStyle={styles.input}
						onPressIn={() => {
							statusMaintenance == 'in_maintenance' && openwarning();
						}}
						icon={<EmailIcon />}
						label={t('login.label.email')}
						name="email"
						control={control}
						error={errors.email}
						autoCapitalize="none"
						inputStyle={{ width: windowDimentions.width * 0.82 }}
						maxFontSizeMultiplier={1.3}
					/>
					<Input
						accesibilityLabel={t('accessibility.seePassword')}
						placeholder={t('login.placeholder.password')}
						labelStyle={styles.input}
						onPressIn={() => {
							statusMaintenance == 'in_maintenance' && openwarning();
						}}
						icon={<PasswordIcon />}
						label={t('login.label.password')}
						passwordInput
						control={control}
						error={errors.password}
						name="password"
						autoCapitalize="none"
						inputStyle={{ width: windowDimentions.width * 0.82 }}
						maxFontSizeMultiplier={1.3}
					/>
					<Button
						accesibilityLabel={t('accessibility.forgot')}
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: () => {
										navigation.navigate('ForgotPassword');
								  }
						}
						style={{ marginVertical: 24 }}
						title={t('login.hyperlinks.forgotPassword')}
						variant="Underline"
					/>
					{isBiometricSupported ? (
						<Row>
							<FaceId
								onPress={
									statusMaintenance == 'in_maintenance'
										? () => openwarning()
										: () => {
												handleCheckBox(!isCheckBiometric);
										  }
								}
							/>
							<Box
								style={styles.check}
								value={isCheckBiometric}
								onPress={
									statusMaintenance == 'in_maintenance'
										? () => openwarning()
										: handleCheckBox
								}
							/>
						</Row>
					) : (
						<></>
					)}
					<Button
						accesibilityLabel={t('accessibility.login')}
						title={t('login.button.login')}
						// onPress={statusMaintenance == 'in_maintenance' ? () => openwarning() :
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: isCheckBiometric
								? handleSubmit(handleLoginBiometrical)
								: handleSubmit(handleLogin)
						}
					/>
					<Button
						accesibilityLabel={t('accessibility.create_account')}
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: () => {
										dispatch(userActions.setTempUserSSO(undefined));
										navigation.dispatch(
											CommonActions.navigate({ name: 'CreateAccount' }),
										);
								  }
						}
						style={{ marginVertical: 24 }}
						title={t('login.hyperlinks.createAccount')}
						variant="Underline"
					/>
					<View style={{ height: 80 }} />

					{/* 	<IconButton
						accessibilityLabel={t('accessibility.otherOptions')}
						onPress={
							statusMaintenance == 'in_maintenance'
								? () => openwarning()
								: () => {
										boobleState(true);
								  }
						}
						style={{ marginBottom: 16 }}
						icon={<Workspaces />}
						variant="RadianceGreen"
					/> */}
					<Text style={styles.text} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>
						{t('login.text')}
					</Text>
					<View style={styles.justifyText}>
						<Button
							allowFontScaling
							accesibilityLabel={t('accessibility.privacy')}
							title={t('login.hyperlinks.privacyPolicy')}
							variant="Underline"
							textStyle={{ color: colors.BLUEDC1 }}
							onPress={
								statusMaintenance == 'in_maintenance'
									? () => openwarning()
									: () => {
											navigation.dispatch(
												CommonActions.navigate({ name: 'PrivacyPolicy' }),
											);
									  }
							}
						/>
						<Button
							allowFontScaling
							accesibilityLabel={t('accessibility.terms')}
							title={t('login.hyperlinks.termsConditions')}
							variant="Underline"
							textStyle={{ color: colors.BLUEDC1 }}
							onPress={
								statusMaintenance == 'in_maintenance'
									? () => openwarning()
									: () => {
											navigation.dispatch(
												CommonActions.navigate({ name: 'TermsConditions' }),
											);
									  }
							}
						/>
					</View>
				</Row>
			</KeyboardAwareScrollView>
		</View>
	);
};
const Height = Dimensions.get('screen').height;

export default LoginForm;
