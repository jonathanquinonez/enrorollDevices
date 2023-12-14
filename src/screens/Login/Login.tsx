import React, { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useStyles from 'hooks/useStyles';
import ModalNewVisit from 'src/components/molecules/LoginForm/ModalNewVisit/ModalNewVisit';

//Styles
import componentStyles from './Login.styles';
import LoginOrganism from 'src/components/organisms/Login/Login';
import { ASYNC_STORAGE } from 'config/constants/Global';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import DeviceInfo from 'react-native-device-info';
import useVersion from 'hooks/useVersion';
import ModalNewVersion from 'src/components/molecules/LoginForm/ModalNewVersion/ModalNewVersion';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { useTranslation } from 'react-i18next';
import SSOService from 'adapter/api/ssoService';
import Splash from 'src/components/atoms/Splash/Splash';
import { userActions } from 'adapter/user/userSlice';
import Config from 'react-native-config';
import { useNavigation } from '@react-navigation/native';
import { twoFactorActions } from 'adapter/user/twoFactor/twoFactorSlice';
import { Text } from 'react-native';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { userSelectors } from 'adapter/user/userSelectors';
import { TIMES_ZONES, getCustomDate } from 'src/utils/devices';
import IconWarningRed from 'icons/IconWarningRed.svg';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import i18n from 'i18n/i18n';
import { IToken } from './Login.types';

const Login = (props: any) => {
	const params = props.route.params || {};
	const { styles, colors } = useStyles(componentStyles);
	const { setModal, closeModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();
	const { requestToken, requestVersion } = useVersion();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const [authSSO] = SSOService.useSsoAuthMutation();
	const navigation = useNavigation();
	const {
		serverDate: startDateState,
		hourDifference,
		statusMaintenance,
		maintenanceData,
	} = useAppSelector(userSelectors.selectServerDate);
	const [show, setShow] = useState(true);

	function isNewerVersion(oldVer: string, newVer: string) {
		const oldParts = oldVer.split('.');
		const newParts = newVer.split('.');
		for (var i = 0; i < newParts.length; i++) {
			const a = ~~newParts[i];
			const b = ~~oldParts[i];
			if (a > b) return true;
			if (a < b) return false;
		}
		return false;
	}

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

	const ssoAuthentication = async (token: string) => {
		try {
			if (statusMaintenance == 'in_maintenance') {
				openwarning();
				dispatch(loaderActions.setLoading(false));
				params.tokenFB = false;
				return;
			}

			const resp: any = await authSSO({
				ssoToken: token
			}).unwrap();
			//const desencrypt : IToken = jwtDecode(token)	 
			if( resp ){
				//await i18n.changeLanguage(desencrypt?.language);
				setShow(false);
				if (resp?.code == 1) {
					let email = resp?.data?.email;
					let phone = resp?.data?.mobile;
					let value = { credentials: { email, password: '' } };
					dispatch(twoFactorActions.setVerifyEmailAndMobile({ email, phone, value }));
					dispatch(userActions.setLocation('FL'));
					navigation.navigate('TwoFactorSelectScreen');
				} else if (resp?.code == 2) {
					let tempUserSSO = resp?.data?.tempUser;
					dispatch(userActions.setTempUserSSO(tempUserSSO));
					navigation.navigate('CreateAccount');
				} else if (resp?.code == 3) {
					navigation.navigate('CreateAccount');
				} else if (resp?.code == 4) {
					const value = {
						accountNumber: resp?.data?.accountNumber,
						dateOfBirth: resp?.data?.dateOfBirth,
						state: 'FL',
					};
					navigation.navigate('CreateAccountSSO', { sso: value });
				} else if (resp?.code == 5) {
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
							{t('login.twoFactorAuthentication.textBlockMessage')}
						</Text>
					);
					showModalSSO(ts);
				} else if (resp?.code == 6) {
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
							{t('unblockAccount.passExpired')}
						</Text>
					);
					showModalSSO(ts);
				}
			}
		} catch (error) {
			params.tokenFB = false;
			const ts: any = (
				<Text style={{ color: '#055293', fontSize: 14 }} maxFontSizeMultiplier={1.3}>
					<Text
						style={{ fontWeight: 'bold', fontSize: 20, color: '#002D57' }}
						maxFontSizeMultiplier={1.3}
					>
						{t(`login.sso.titleError`)}
						{'\n\n'}
					</Text>
					{t('login.sso.messageError')}
				</Text>
			);
			showModalSSOError(ts);
			//setAlertErrorMessage('Error user not exist in Eligibility');
		}
	};

	const showModalSSO = (text: string) => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					warningText={text}
					textButton={t(`blackList.navigateUnblockAccount`)}
					onPress={() => {
						closeModal();
						navigation.navigate('BlockedAccountScreen');
					}}
				/>
			),
			height: 320,
			blockModal: true,
		});
	};
	const showModalSSOError = (text: string) => {
		setModal({
			render: () => (
				<ModalWarning
					icon={<IconWarningRed />}
					warningText={text}
					textButton={t(`login.sso.btnError`)}
					onPress={() => {
						closeModal();
						setShow(false);
					}}
				/>
			),
			height: 320,
			blockModal: true,
		});
	};

	const getShow = async () => {
		try {
			dispatch(loaderActions.setLoading(true));
			const tokenVersion = await requestToken();
			const versionRequest = await requestVersion(tokenVersion.data['access_token']);
			const version = versionRequest.data;
			const appVersion = DeviceInfo.getVersion();
			const resultDiff = isNewerVersion(appVersion.toString(), version.toString());
			dispatch(loaderActions.setLoading(false));
			if (resultDiff) {
				setModal({
					render: () => <ModalNewVersion />,
					height: 400,
					blockModal: true,
				});
			} else {
				const value = await AsyncStorage.getItem(ASYNC_STORAGE.NEW_VISIT);
				if (!value) {
					setModal({
						render: () => <ModalNewVisit />,
						height: 400,
						blockModal: true,
					});
				}
			}
		} catch (error: any) {
			dispatch(loaderActions.setLoading(false));
			Config.APP_ENV != undefined &&
				setAlertErrorMessage(
					'Error: ' + error.toString().includes('AxiosError')
						? t(`errors.code999`)
						: error,
				);
		}
	};

	useEffect(() => {
		getShow();
		if (params && params.tokenFB) {
			//navigation.navigate('TwoFactorSelectScreen');
			dispatch(userActions.setTokenFB(params.tokenFB));
			ssoAuthentication(params.tokenFB);
		}
	}, [params.tokenFB]);

	return (
		<SafeScreen>
			{params && params.tokenFB && show ? <Splash startTime={0} /> : <LoginOrganism />}
		</SafeScreen>
	);
};

export default Login;
