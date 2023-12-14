
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { safeScreen } from 'ui-core/utils/globalStyles';
import componentStyles from './Root.styles';
import { CommonActions, DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';
import useStyles from 'hooks/useStyles';
import RootOrganism from 'src/components/organisms/Root/Root';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Logo from 'src/components/atoms/Logo/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuIcon from 'icons/menu.svg';
import ProfileIcon from 'icons/profile.svg';
import Facesmile from 'icons/face-smile.svg';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { LinearGradient } from 'expo-linear-gradient';
import Row from 'src/components/atoms/Row/Row';

import { useTranslation } from 'react-i18next';
import Header from 'src/components/molecules/Header/Header';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ModalAnnualVisit from 'src/components/molecules/RootBody/ModalAnnualVisit/ModalAnnualVisit';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import AuthService from 'adapter/api/authService';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import useLogout from 'hooks/useLogout';
import { userActions } from 'adapter/user/userSlice';
import UsersService from 'adapter/api/usersService';
import { enrollDeviceService } from 'adapter/api/enrollDeviceService';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

const Root = (props: any) => {
	const { styles, colors } = useStyles(componentStyles);
	const navigation: any = useNavigation();
	const { t } = useTranslation();
	const { closeModal, setModal } = useBottomSheet();
	const { setAlertErrorMessage } = useErrorAlert();
	const { locationSelected, token } = useAppSelector(userSelectors.selectIsLoggedIn);
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);
	const { ecwId, ...valueUser } = useAppSelector(userSelectors.selectUser);
	const [checkAnnualVisitCode] = AuthService.useCheckAnnualVisitCodeMutation();
	const [checkTermsAndPrivacyVersion] = AuthService.useCheckTermsAndPrivacyVersionMutation();
	const [updateTermsAndPrivacyVersion] = AuthService.useUpdateTermsAndPrivacyVersionMutation();
	const dispatch = useAppDispatch();

	const [notificationApp] = UsersService.useNotificationAppMutation();

	const [validatesession] = UsersService.useUserDataMutation();
	const [createEnrollDevice] = enrollDeviceService.useCreateEnrollDeviceMutation();
	const [getEnrollDeviceByToken] = enrollDeviceService.useGetEnrollDeviceByTokenMutation();
	const { handleLogout } = useLogout();

	const handlerLeftDrawer = () => {
		navigation.dispatch(DrawerActions.toggleDrawer());
	};

	const handlerRigthDrawer = () => {
		const drawerNavigation: any = navigation.getParent('RigthDrawer');
		drawerNavigation?.openDrawer();
	};

	const annualVisit = useCallback(
		async (value: string) => {
			const isTempAcceptAnnualVisit = await AsyncStorage.getItem('isTempAcceptAnnualVisit')
			if (!isTempAcceptAnnualVisit) {
				try {
					const res: any = await checkAnnualVisitCode({ code: value, state: locationSelected || '' });
					if (!res?.data) {
						setModal({
							render: () => (
								<ModalAnnualVisit setAlertErrorMessage={setAlertErrorMessage} />
							),
							height: 300
						})
					}
				} catch (error) {
					setAlertErrorMessage('Error: ' + error);
				}
			}
		},
		[checkAnnualVisitCode],
	);

	const handleBiometricalTerms = async () => {
		const biometricalTerms = await AsyncStorage.getItem(ASYNC_STORAGE.BIOMETRICALTERMS);
		if (biometricalTerms && biometricalTerms.includes('true')) {
			setModal({
				render: () => (<ModalWarning
					styleSubtitle={{ color: '#5B5C5B' }}
					onPress={async () => {
						await AsyncStorage.removeItem(ASYNC_STORAGE.BIOMETRICALTERMS);
						closeModal();
						// handlerCheckTermsAndPrivacyVersion()
						annualVisit(ecwId)
					}}
					title={t('indoormodal.titleFaceId')}
					warningText={t('indoormodal.description')}
					icon={<Facesmile />} />),
				height: 340,
				blockModal: true
			})
		} else {
			annualVisit(ecwId)
		}
	}

	const updateTermsAndPrivacy = useCallback(async (isConsents: boolean) => {
		try {
			await updateTermsAndPrivacyVersion({ versionPrivacy: true, versionTerms: true, state: locationSelected ?? '', authId: valueUser.authUid }).unwrap()
			if (!isConsents) handleBiometricalTerms()
		} catch (error) {
			handleBiometricalTerms()
		}
	}, [valueUser, locationSelected, ecwId])

	const get_validatesession = useCallback(async () => {
		try {
			const resp = await validatesession({ state: locationSelected ?? '', token: valueUser?.authUid ?? '' }).unwrap();

			await AsyncStorage.setItem('loadUserInfoByCode', JSON.stringify(resp));
			dispatch(userActions.setEditAccountdata({ ...resp.patientInformation, isNewVersion: true })); //Envia la data a los consents
			closeModal();
			navigation.navigate('Consents');
		} catch (error) {
			console.log('------------error------------', error)
			handleBiometricalTerms()
		}
	}, [locationSelected, token])

	const modalCreateEnrollDevice = useCallback(async () => {
		try {
			const token = await messaging().getToken();
			const version = await DeviceInfo.getSystemVersion();
			const nameDevice = await DeviceInfo.getSystemName();

			const authUid = valueUser.authUid;
			const state = valueUser.state;
			const tokenFCM = token;
			const deviceName = await DeviceInfo.getDeviceName();
			const deviceSOVersion = nameDevice + " " + version;
			closeModal();
			await createEnrollDevice({ authUid, state, tokenFCM, deviceName, deviceSOVersion }).unwrap();


		} catch (error) {
			handleBiometricalTerms()
		}
	}, [])

	const navigateTermsAndPolicy = (terms: boolean) => {
		closeModal();
		navigation.dispatch(
			CommonActions.navigate({
				name: terms ? 'TermsConditions' : 'PrivacyPolicy',
			})
		);
	}

	const openModalWarning = (title: string, newVersion: string, subTitle1: string, subTitle2: string, data: any) => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					termsAndPrivacy={data}
					title={title}
					styleBtn={{ width: 130 }}
					styleSubtitle={{ fontSize: 14, color: '#212121', marginTop: 10, }}
					warningText={<>
						<Text
							maxFontSizeMultiplier={1.3}
							onPress={() => navigateTermsAndPolicy(data?.policy === true && data?.terms === false ? true : false)}
							style={{ paddingHorizontal: 1, fontSize: 14, color: '#212121', lineHeight: 22, }}
						>{subTitle1}</Text>
						<Text
							maxFontSizeMultiplier={1.3}
							onPress={() => navigateTermsAndPolicy(data?.policy === true && data?.terms === false ? true : false)}
							style={{ paddingHorizontal: 1, fontSize: 14, color: '#212121', lineHeight: 22, fontFamily: 'proxima-bold', textDecorationLine: 'underline' }}
						>{newVersion}</Text>
						<Text
							maxFontSizeMultiplier={1.3}
							style={{ justifyContent: 'center', alignSelf: 'center', alignContent: 'center' }}
							onPress={() => navigateTermsAndPolicy(data?.policy === true && data?.terms === false ? true : false)}
						>{subTitle2}</Text>
					</>}
					onPress={() => {
						updateTermsAndPrivacy(data?.consents);
						if (data?.consents === false) openModalUpdateConsents();
						else closeModal();
					}}
					onPressCancel={() => {
						handleLogout()
						closeModal();
					}}

				/>
			), height: 320, blockModal: true
		});
	}
	const openModalUpdateConsents = () => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					title={t('consents.modalTitle')}
					styleSubtitle={{ fontSize: 14, color: '#212121', marginTop: 10, }}
					warningText={t('consents.modalSubTitle')}
					textButton={t('consents.btnModal')}
					onPress={() => {
						get_validatesession()
					}}
				/>
			), height: 320, blockModal: true
		});
	}
	const openModalEnrollDevice = () => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					styleSubtitle={{ fontSize: 14, color: '#055293', marginTop: 10, fontFamily: "Proxima Nova", textAlign: "center" }}
					warningText={t('consents.enrollDeviceModal')}
					textButton={t('consents.btnModalEnrollDevice')}
					textButtonCancel={t('modalCheck.close')}
					onPress={async () => {
						modalCreateEnrollDevice();
					}}
					onPressCancel={() => {
						closeModal();
					}}
				/>
			), height: 320, blockModal: true
		});
	}

	const handlerCheckTermsAndPrivacyVersion = useCallback(async () => {
		try {
			const res: any = await checkTermsAndPrivacyVersion({ email: valueUser.email, state: locationSelected || '' });
			const resp = await validatesession({ state: locationSelected ?? '', token: valueUser?.authUid ?? '' }).unwrap();
			const token = await messaging().getToken();
			const state = valueUser?.state;
			const newDevice = await getEnrollDeviceByToken({ state, token }).unwrap();
			console.log('-----res-----',res)
			if (res?.data?.policy === true && res?.data?.terms === true && res?.data?.consents == true && ecwId) handleBiometricalTerms()
			if (resp?.healthOptins?.push && Object.keys(newDevice).length === 0 && !newDevice.some((item: any) => item?.tokenFCM === token)) {
				openModalEnrollDevice();
			}
			if (res?.data?.policy === false && res?.data?.terms === false) {
				console.log("policy, 3 terms", res?.policy, res?.terms)
				openModalWarning(t('termAndPrivacy.tAndP'),
					t('termAndPrivacy.changeTwo'),
					t('termAndPrivacy.changeTwo1'),
					t('termAndPrivacy.changeTwo2'), res?.data)
			}
			else if (res?.data?.terms === false) {
				console.log("1 terms", res?.policy, res?.terms)
				openModalWarning(t('termAndPrivacy.term'),
					t('termAndPrivacy.changeOne'),
					t('termAndPrivacy.changeOne1'),
					t('termAndPrivacy.changeOne2'), res?.data)
			}
			else if (res?.data?.policy === false) {
				console.log("2 terms", res?.policy, res?.terms)
				openModalWarning(t('termAndPrivacy.privacy'),
					t('termAndPrivacy.changeOne'),
					t('termAndPrivacy.changeOne1'),
					t('termAndPrivacy.changeOne2'), res?.data)
			}
			else if (res?.data?.consents === false) {
				openModalUpdateConsents();
			}
			else { console.log("policy, 3 terms", res?.policy, res?.terms) }
		} catch (error) {
			setAlertErrorMessage('Error: ' + error);
		}
	}, [valueUser, locationSelected, ecwId])

	const get_notifications_status = useCallback(async () => {
		try {
			console.log('----aqí----')
			await notificationApp({}).unwrap();
		} catch (error) {
			console.log('---error---', error)
		}
	}, [notificationApp])

	useEffect(() => {
		if (currentRoute == 'Home' &&
			previousRoute == 'PrivacyPolicy' || previousRoute == 'TermsConditions') handlerCheckTermsAndPrivacyVersion();
		//annualVisit(ecwId)
		if (previousRoute == 'Consents') {
			handlerCheckTermsAndPrivacyVersion()
		}
	}, [ecwId, currentRoute, previousRoute])

	useEffect(() => {
		handlerCheckTermsAndPrivacyVersion();
		//annualVisit(ecwId)
	}, [ecwId]);


	useEffect(() => {
		if (valueUser?.authUid) get_notifications_status()
		//annualVisit(ecwId)
	}, [valueUser?.authUid])

	return (
		<SafeScreen>
			<LinearGradient
				colors={['#0069A7', '#003554']}
				locations={[0.18, 0.34]}
				style={styles.container}
			>
				<Header
					logoWithoutText
					iconLeft={<MenuIcon />}
					onPressLeft={handlerLeftDrawer}
					onPressRight={handlerRigthDrawer}
					iconRight={<ProfileIcon />}
					showLine

					accessibilityRole2='menu'
					accessibilityRole='menu'
				/>
				<Row style={{ flexGrow: 9 }}>
					<RootOrganism />
				</Row>
			</LinearGradient>
		</SafeScreen>
	);
};

export default Root;