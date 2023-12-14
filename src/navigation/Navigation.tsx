import {
	LinkingOptions,
	NavigationContainer,
	StackActions,
	useNavigation,
	useNavigationContainerRef,
} from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CustomDarkTheme, CustomLightTheme } from 'config/theme';
import { ASYNC_STORAGE, ONBOARDING_VALUES } from 'config/constants/Global';

import { NavigationProps as Props, RootStackParamList } from './Navigation.types';
import { AppState, Dimensions, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import Onboarding from 'src/screens/Onboarding/Onboarding';
import Login from 'src/screens/Login/Login';
import TwoFactorSelectScreen from 'src/screens/Login/TwoFactorAuthentication/TwoFactorSelectScreen';
import TwoFactorVerifyScreen from 'src/screens/Login/TwoFactorAuthentication/TwoFactorVerifyScreen';
import ForgotPassword from 'src/screens/ForgotPassword/ForgotPassword';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import PrivacyPolicy from 'src/screens/PrivacyPolicy/PrivacyPolicy';
import CreateAccount from 'src/screens/CreateAccount/CreateAccount';
import CreateAccountSSO from 'src/screens/CreateAccount/CreateAccountSSO';
import BlockedAccountScreen from 'src/screens/BlockedAccount/BlockedAccountScreen';
import TermsConditions from 'src/screens/TermsConditions/TermsConditions';
import PatientRegistration from 'src/screens/PatientRegistration/PatientRegistration';
import DrawerNavigatorRigth from './DrawerNavigator/DrawerNavigator';
import LoadingProvider from 'src/components/organisms/LoadingProvider/LoadingProvider';
import BottomSheetProvider, {
	useBottomSheet,
} from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalPaymentsProvider from 'src/components/atoms/ModalPaymentsProvider/ModalPaymentsProvider';
import { SymtomsView } from 'src/screens/Symtoms/SymtomsView';
import { VimView } from 'src/screens/VinView/VimView';
import AuthService from 'adapter/api/authService';
import { GetCareScreen } from 'src/screens/GetCareNow/GetCareScreen';
import DeleteAccountScreen from 'src/screens/PersonalInformation/DeleteAccount/DeleteAccountScreen';
import ErrorAlertProvider from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import SessionTimeout from 'src/components/organisms/SessionTimeout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { selectIsLoading } from 'adapter/loader/loaderSelectors';
import { useRef } from 'react';
import { loaderActions } from 'adapter/loader/loaderSlice';
import analytics from '@react-native-firebase/analytics';
import { userActions } from 'adapter/user/userSlice';
import ChatSanitas from 'src/screens/ChatSanitas/ChatSanitas';
import { StripeProvider } from '@stripe/stripe-react-native';
import appConfig from 'config/index';
import GeneralService from 'adapter/api/generalService';
import { TIMES_ZONES, checkMaintenanceStatus, getCustomDate } from 'src/utils/devices';
import { useTranslation } from 'react-i18next';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import useLogout from 'hooks/useLogout';

const Navigation = (props: Props) => {
	const { colorScheme, showOnboarding, setShowOnboardingScreen } = props;

	const [eventState, setEventState] = useState<any>();
	const timeoutRef = useRef<any>(null);
	const isLoading = useAppSelector(selectIsLoading);
	const dispatch = useAppDispatch();

	const routeNameRef = useRef<string>();
	const navigationRef = useNavigationContainerRef();
	const { isLoggedIn } = useAppSelector(userSelectors.selectIsLoggedIn);
	const user = useAppSelector(userSelectors.selectUser);

	const linking: LinkingOptions<RootStackParamList> = {
		prefixes: ['mysanitas://'],
		config: {
			screens: {
				Login: {
					path: 'login/:tokenFB',
				},
			},
		},
	};

	useEffect(() => {
		if (isLoading) {
			if (!timeoutRef.current) {
				timeoutRef.current = setTimeout(() => {
					dispatch(loaderActions.setLoading(false));
				}, 15 * 1 * 1000);
			}
		} else {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		}
	}, [isLoading]);

	return (
		<NavigationContainer
			theme={colorScheme === 'dark' ? CustomDarkTheme : CustomLightTheme}
			linking={linking}
			fallback={<Text>.</Text>}
			ref={navigationRef}
			onReady={() => {
				routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
			}}
			onStateChange={async (state) => {
				setEventState(state);
				//Google analitycs
				const previousRouteName = routeNameRef.current;
				const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;
				if (previousRouteName !== currentRouteName) {
					await analytics().logScreenView({
						screen_name: currentRouteName,
						screen_class: currentRouteName,
					});
					if (isLoggedIn) {
						await analytics().logEvent('click_keralty_native', {
							ecw_id: user.ecwId,
							auth_id: user.authUid,
							screen_name: currentRouteName,
						});
					}
				}
				routeNameRef.current = currentRouteName;
				dispatch(userActions.setIsPaymentProcess(0));
				dispatch(userActions.setPreviousRoute(previousRouteName));
				dispatch(userActions.setCurrentRoute(currentRouteName));
			}}
		>
			<LoadingProvider>
				<BottomSheetProvider>
					<ErrorAlertProvider eventState={eventState}>
						<ModalPaymentsProvider>
							<StripeProvider
								publishableKey={`${appConfig.PUBLISHABLEKEY_PAYMENT}`}
							// merchantIdentifier="merchant.identifier" // required for Apple Pay
							>
								<SafeAreaProvider
									onTouchStart={() =>
										setEventState({ eventState, num: 1 + eventState?.num })
									}
								>
									<RootNavigator
										showOnboarding={showOnboarding}
										setShowOnboardingScreen={setShowOnboardingScreen}
									/>
								</SafeAreaProvider>
							</StripeProvider>
							<SessionTimeout eventState={eventState} />
						</ModalPaymentsProvider>
					</ErrorAlertProvider>
				</BottomSheetProvider>
			</LoadingProvider>
		</NavigationContainer>
	);
};
export default Navigation;

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = (props: any) => {
	const { showOnboarding, setShowOnboardingScreen } = props;

	const [appStatus, setAppStatus] = useState('loading');
	const { isLoggedIn, token, locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const [dataUser, setDataUser] = useState(false);

	const user = useAppSelector(userSelectors.selectUser);
	AuthService.useLoadUserBySessionQuery(
		{ token: token || '', state: locationSelected || '' },
		{ skip: !token },
	);
	const getOnboardingStatus = async (): Promise<string | null> => {
		try {
			return AsyncStorage.getItem(ASYNC_STORAGE.ONBOARDING);
		} catch (err) {
			return null;
		}
	};

	useEffect(() => {
		getOnboardingStatus().then((onboardingStatus) => {
			if (onboardingStatus !== ONBOARDING_VALUES.SHOWN) {
				setShowOnboardingScreen(true);
				return;
			}
			setShowOnboardingScreen(false);
		});
		if (isLoggedIn && token != '-1') {
			setDataUser(true);
		}
	}, [isLoggedIn]);

	/* if (appStatus === 'loading') {
		return showOnboarding ? <Onboarding /> : <Login noAutoFocus />;
	} */

	const dispatch = useAppDispatch();
	const [get_ServerDate] = GeneralService.useServerDateMutation();
	const [appState, setAppState] = useState(AppState.currentState);
	const [isInBackgroundvar, setIsInBackgroundvar] = useState(true);
	const isInBackgroundRef = useRef(isInBackgroundvar);
	const { serverDate, hourDifference, statusMaintenance, maintenanceData } = useAppSelector(
		userSelectors.selectServerDate,
	);
	const { currentRoute } = useAppSelector(userSelectors.selectRoute);
	const currentRouteRef = useRef(currentRoute);
	const maintenanceDataRef = useRef(maintenanceData);
	const userAuthUidRef = useRef(user?.authUid);
	const { t } = useTranslation();
	const { reset, navigate }: any = useNavigation();
	const { handleLogout } = useLogout();
	const navigationRef = useNavigationContainerRef();
	const { closeModal, setModal } = useBottomSheet();

	useEffect(() => {
		currentRouteRef.current = currentRoute;
	}, [currentRoute]);

	useEffect(() => {
		maintenanceDataRef.current = maintenanceData;
	}, [maintenanceData]);

	useEffect(() => {
		userAuthUidRef.current = user?.authUid;
	}, [user]);

	useEffect(() => {
		if (hourDifference !== undefined && serverDate)
			setTimeout(() => {
				increaseDateByOneSecond(new Date(serverDate));
			}, 100);
	}, [hourDifference]);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: any) => {
			if (appState.match(/inactive|background/) && nextAppState === 'active') {
				console.log('La aplicación volvió al modo activo desde segundo plano');
				isInBackgroundRef.current = false; // Actualiza la variable de ref
				dispatch(userActions.setServerDate(undefined));
				dispatch(userActions.setHourDifference(undefined));
				getServerDate();
			}
			setAppState(nextAppState);
		};
		const subscription = AppState.addEventListener('change', handleAppStateChange);
		return () => {
			subscription.remove();
		};
	}, [appState]);

	const getServerDate = useCallback(async () => {
		await get_ServerDate({}).unwrap();
		isInBackgroundRef.current = true; // Actualiza la variable de ref
	}, [get_ServerDate]);

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

		const textMessage = `${dateInitET.date} ${dateInitET.time} / ${dateInitCT.time} ${t('general.locale') === 'es' ? 'al' : 'to'
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
	}, [serverDate, maintenanceData]);

	const increaseDateByOneSecond = (date: Date) => {
		const startDate = date;

		const performTask = () => {
			try {
				startDate.setSeconds(startDate.getSeconds() + 60);
				const res = saveTime(startDate);
				if (maintenanceDataRef?.current?.status) {
					const status = checkMaintenanceStatus(
						maintenanceDataRef?.current?.payload?.date_end,
						maintenanceDataRef?.current?.payload?.date_init,
						startDate.toISOString(),
					);
					dispatch(userActions.setStatusMaintenance(status));
					const nav = currentRouteRef?.current;
					if (status == 'in_maintenance') {
						if (userAuthUidRef.current) {
							navigate('Home');
							setTimeout(() => {
								handleLogout();
							}, 300);
						}

						if (
							nav == 'SymtomsView' ||
							nav == 'ChatSanitas' ||
							(nav == 'VimView' && !userAuthUidRef.current)
						) {
							reset({ index: 0, routes: [{ name: 'Login' }] });
							setTimeout(() => {
								openwarning();
							}, 300);
						}
					}
				}
				if (res === 'error') clearInterval(intervalId);
			} catch (error) {
				clearInterval(intervalId);
			}
		};

		// Ejecuta la tarea una vez inmediatamente
		performTask();

		// Luego, ejecuta la tarea cada minuto
		const intervalId = setInterval(performTask, 60000);
	};

	const saveTime = (startDate: Date) => {
		if (isInBackgroundRef.current) {
			dispatch(userActions.setServerDate(startDate.toISOString()));
			return 'ok';
		} else {
			return 'error';
		}
	};

	return (
		<Stack.Navigator>
			{!isLoggedIn && showOnboarding && (
				<Stack.Screen
					name="Onboarding"
					component={Onboarding}
					options={{ headerShown: false }}
				/>
			)}
			{isLoggedIn && dataUser && user?.authUid ? (
				<Stack.Screen
					name="Root"
					component={DrawerNavigatorRigth}
					options={{ headerShown: false }}
				/>
			) : (
				<>
					<Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
					<Stack.Screen
						name="PatientRegistration"
						component={PatientRegistration}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="TwoFactorSelectScreen"
						component={TwoFactorSelectScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="TwoFactorVerifyScreen"
						component={TwoFactorVerifyScreen}
						options={{ headerShown: false }}
					/>
				</>
			)}
			<Stack.Screen
				name="Consents"
				component={PatientRegistration}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ForgotPassword"
				component={ForgotPassword}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="PrivacyPolicy"
				component={PrivacyPolicy}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="TermsConditions"
				component={TermsConditions}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CreateAccount"
				component={CreateAccount}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="CreateAccountSSO"
				component={CreateAccountSSO}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="BlockedAccountScreen"
				component={BlockedAccountScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen name="VimView" component={VimView} options={{ headerShown: false }} />
			<Stack.Screen
				name="GetCareScreen"
				component={GetCareScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="DeleteAccount"
				component={DeleteAccountScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="ChatSanitas"
				component={ChatSanitas}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
};
