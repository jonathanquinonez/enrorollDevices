import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Linking, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { DrawerContentComponentProps, useDrawerStatus } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import useStyles from 'hooks/useStyles';
import { AsideDrawerProps as Props } from './AsideDrawer.types';
import componentStyles from './AsideDrawer.styles';
import PaymentService from 'adapter/api/paymentService';
import Menu1 from 'assets/icons/GetCare.svg';
import Menu2 from 'assets/icons/Menu2B.svg';
import Menu3 from 'assets/icons/Menu3B.svg';
import Menu4 from 'assets/icons/Menu4B.svg';
import { Body8, BodyLocation } from 'src/screens/GetCareNow/Payment/ModalBody/ModalBody';
import Menu5 from 'assets/icons/Assistent.svg';
import Menu6 from 'assets/images/icons/locations.svg';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { DrawerActions } from '@react-navigation/native';
import MenuLogo from 'assets/images/logo/LogoMenu.svg';
import appConfig from 'config/index';
import Icon from 'src/components/atoms/Icon/Icon';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Row from 'src/components/atoms/Row/Row';
import AsideMenuItem from 'src/components/atoms/AsideMenuItem/AsideMenuItem';
import AsideMenuSubItem from 'src/components/atoms/AsideMenuSubItem/AsideMenuSubItem';
import DeviceInfo from 'react-native-device-info';
import { useCall } from 'hooks/useCall';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import jwtDecode from 'jwt-decode';
import RegisterService from 'adapter/api/registerService';
import { userActions } from 'adapter/user/userSlice';
import MyModal from 'src/components/atoms/Modal/MyModal';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ScheduleCode from 'src/screens/GetCareNow/Payment/configAvailability';
import UsersService from 'adapter/api/usersService';
import OnboardingMentalHealth from '../OnboardingMentalHealth/OnboardingMentalHealth';
import ModalDisclaimer from 'src/components/molecules/ModalDisclaimer/ModalDisclaimer';
import VitalSignIcon from 'assets/icons/vitalsign.svg';
import ModalList from 'src/components/molecules/ModalList/ModalList';
import { ModalListOptions } from 'src/components/molecules/ModalList/ModalList.types';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
/**
 * Render a asideDrawer.
 * @since 1.0.x
 */
const AsideDrawer: React.FC<DrawerContentComponentProps & Props> = (props) => {
	const { navigation } = props;
	const { t } = useTranslation();
	const { styles } = useStyles(componentStyles);
	const isDrawerOpen = useDrawerStatus() === 'open';
	const [activeSection, setActiveSection] = useState(-1);
	const { openLink } = useCall();
	const { closeModal, setModal } = useBottomSheet();
	const appVersion = DeviceInfo.getVersion();
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);

	const handleSectionCollapse = (index: number) => {
		setActiveSection(index);
	};
	const [onboardingValueByEmail] = UsersService.useOnboardingValueByEmailMutation();
	const [updateOnboardingByEmail] = UsersService.useUpdateOnboardingByEmailMutation();
	const userInfo = useAppSelector(userSelectors.selectUser);
	const { setAlertErrorMessage } = useErrorAlert();
	const [numberInsuranceModal, setNumberInsuranceModal] = useState<string | number>('0');
	const [validateInsurance] = PaymentService.useValidateMutation();
	const [ageModal, setShowModal] = useState(false);
	const [validateHintForm] = RegisterService.useValidateHintFormMutation();
	const { token, locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const coverage = useAppSelector(userSelectors.selectActiveCoverage);
	const { authUid } = useAppSelector(userSelectors.selectUser);
	const currentDate = moment(new Date(Date.now()));

	const dispatch = useAppDispatch();

	const onFinish = useCallback(async () => {
		try {
			await updateOnboardingByEmail({
				email: userInfo.email,
				state: userInfo.state,
			}).unwrap();
			closeModal();
		} catch (error) {
			closeModal();
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [updateOnboardingByEmail]);

	const openOnboardingMentalHealth = (statusOnboarding: boolean) => {
		closeModal();
		if (statusOnboarding)
			setTimeout(() => {
				setModal({
					render: () => <OnboardingMentalHealth onFinish={onFinish} />,
					height: 570,
					blockModal: true,
				});
			}, 300);
	};

	const getOnboardingValue = useCallback(async () => {
		try {
			const resp = await onboardingValueByEmail({
				email: userInfo.email,
				state: userInfo.state,
			}).unwrap();
			setModal({
				render: () => (
					<ModalDisclaimer onPress={() => openOnboardingMentalHealth(!Boolean(resp))} />
				),
				height: 395,
				blockModal: true,
			});
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [onboardingValueByEmail]);

	const navigateVideo = async () => {
		await Linking.openURL(appConfig.TELADOC_URL);
	};

	const validateHint = async () => {
		let response: boolean = await validateHintForm({
			patientId: authUid,
			state: locationSelected ?? '',
		}).unwrap();
		return response;
	};
	const gotoLink = () => {
		//closeModal();
		Linking.openURL('https://www.mysanitas.com/en/fl#state-locations');
	};
	const openModalLocation = () => {
		setModal({
			render: () => (
				<BodyLocation
					onPress={() => {
						closeModal(), gotoLink();
					}}
					setShowModal={closeModal}
				/>
			),
			height: 470,
			blockModal: false,
		});
	};
	const navigateChat = useCallback(async () => {
		try {
			const response = await validateInsurance({
				authUid: authUid,
				state: locationSelected ?? '',
				token: 'Bearer ' + token,
				service: 'Videocall',
			}).unwrap();
			if (response?.code == '1') {
				let responseHint = await validateHint();
				switch (true) {
					case (jwtDecode(token ? token : '') as any).activeCoverage || responseHint:
						//	navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': currentRoute })
						dispatch(
							userActions.setStateVewChat({
								queue: 'provider',
								stateView: true,
							}),
						);
						break;
					case coverage || responseHint:
						//		navigation.navigate('ChatSanitas', { type: 'doctor', 'prevRoute': currentRoute })
						dispatch(
							userActions.setStateVewChat({
								queue: 'provider',
								stateView: true,
							}),
						);
						break;
					default:
						navigation.navigate('ChatDoctorScreen');
						break;
				}
			}
			if (response.code == '2') {
				setNumberInsuranceModal(8);
				handleShowModal(true);
			}
			if (response.code == '3') {
				setNumberInsuranceModal(9);
				handleShowModal(true);
			}
			if (response.code == '4') {
				setNumberInsuranceModal(10);
				handleShowModal(true);
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [validateInsurance, authUid, locationSelected, token]);
	const handleShowModal = (option: boolean) => {
		setShowModal(option);
	};
	const handlerCall = async () => {
		await openLink({
			number: '8449624362',
			prompt: false,
			skipCanOpen: true,
		});
	};

	const needHelpOptions: ModalListOptions[] = [
		{
			name: 'needhelpMH.modalOption0',
			handlerAction: () => {
				closeModal();
				navigation.navigate('NeedHelpScreen', {
					payload: {
						phone: '1-800-799-SAFE',
						phoneText: 'needhelpMH.modalOption0phone',
						website: 'www.thehotline.org',
						optionTitle: 'needhelpMH.modalOption0',
					},
				});
			},
		},
		{
			name: 'needhelpMH.modalOption1',
			handlerAction: () => {
				closeModal();
				navigation.navigate('NeedHelpScreen', {
					payload: {
						phone: '988',
						phoneText: 'needhelpMH.modalOption1phone',
						website: 'www.988lifeline.org',
						optionTitle: 'needhelpMH.modalOption1',
					},
				});
			},
		},
		{
			name: 'needhelpMH.modalOption2',
			handlerAction: () => {
				closeModal();
				navigation.navigate('NeedHelpScreen', {
					payload: {
						phone: '1-800-962-2873',
						phoneText: 'needhelpMH.modalOption2phone',
						website: 'www.myflfamilies.com',
						optionTitle: 'needhelpMH.modalOption2',
					},
				});
			},
		},
		{
			name: 'needhelpMH.modalOption3',
			handlerAction: () => {
				closeModal();
				navigation.navigate('NeedHelpScreen', {
					payload: {
						phone: '1-800-985-5990',
						phoneText: 'needhelpMH.modalOption3phone',
						website: 'www.cdc.gov',
						optionTitle: 'needhelpMH.modalOption3',
					},
				});
			},
		},
		{
			name: 'needhelpMH.modalOption4',
			handlerAction: () => {
				closeModal();
				navigation.navigate('NeedHelpScreen', {
					payload: {
						phone: '911',
						phoneText: 'needhelpMH.modalOption4phone',
						website: 'www.911.gov',
						optionTitle: 'needhelpMH.modalOption4',
					},
				});
			},
		},
	];

	const handlerNeedHelp = () => {
		setModal({
			render: () => <ModalList onPress={() => closeModal()} options={needHelpOptions} />,
			height: Dimensions.get('window').height * 0.65,
			blockModal: false,
		});
	};

	const handlerTelevisit = async () => {
		/* const newDate = moment(new Date(Date.now()));
		const isWithinSchedule = newDate.day() === ScheduleCode.startDay
			|| newDate.day() === ScheduleCode.endDay
			|| (newDate.hour() > ScheduleCode.startTime && newDate.hour() < ScheduleCode.endTime); */

		dispatch(userActions.setIsTelevisitNavigate(true));

		navigation.navigate('ChatStack');
	};

	const handlerVitalSign = async () => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					title={t('anura.modalA.title')}
					styleTitle={{ color: '#002F87' }}
					title2={t('anura.modalA.title2')}
					styleTitle2={{ color: '#212121', fontSize: 14, fontFamily: 'proxima-bold' }}
					warningText={t('anura.modalA.text')}
					styleSubtitle={{
						color: '#212121',
						fontFamily: 'proxima-regular',
						fontSize: 14,
						justifyContent: 'flex-start',
						textAlign: 'left',
					}}
					textButton={'Continue'}
					textButtonCancel="Close"
					onPressCancel={() => closeModal()}
					onPress={() => {
						closeModal();
						navigation.navigate('VitalSignScreen');
					}}
				/>
			),
			height: 600,
			blockModal: true,
		});
	};

	const handleCloseModal = () => {
		handleShowModal(false);
	};

	useEffect(() => {
		if (!isDrawerOpen) {
			setActiveSection(-1);
		}
	}, [isDrawerOpen]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Row style={{ justifyContent: 'center', marginTop: 30 }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 20,
						alignItems: 'center',
					}}
				>
					<IconButton
						accessibilityLabel={t('accessibility.closeMenu')}
						accessibilityRole="button"
						style={{ backgroundColor: '#055293' }}
						icon={<Icon name="arrow-left" />}
						onPress={() => {
							navigation.dispatch(DrawerActions.toggleDrawer());
						}}
					/>
					<MenuLogo />
				</View>
			</Row>
			<Row style={{ flexGrow: 6 }}>
				<ScrollView>
					<View style={styles.container}>
						<AsideMenuItem
							accessibilityLabel={t('accessibility.listDr')}
							index={1}
							currentIndex={activeSection}
							onPress={handleSectionCollapse}
							text={t('menuLeftHome.get')}
							isDropdown
							icon={<Menu1 height={40} />}
						>
							<AsideMenuSubItem
								text={t('menuLeftHome.subGet.chat')}
								onPress={navigateChat}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subGet.videoTn')}
								//text={t('menuLeftHome.subGet.videoFl')}
								onPress={handlerTelevisit}
							/>

							{locationSelected != 'TN' ? (
								<AsideMenuSubItem
									text={t('menuLeftHome.subGet.clinical')}
									onPress={handlerCall}
								/>
							) : null}
						</AsideMenuItem>

						<AsideMenuItem
							accessibilityLabel={t('accessibility.listDr')}
							index={2}
							currentIndex={activeSection}
							onPress={handleSectionCollapse}
							text={t('menuLeftHome.health')}
							isDropdown
							icon={<Menu3 height={40} />}
						>
							<AsideMenuSubItem
								text={t('menuLeftHome.subHealth.lab')}
								onPress={() => navigation.navigate('LabScreen')}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subHealth.rf')}
								onPress={() => navigation.navigate('ReferalsScreen')}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subHealth.med')}
								onPress={() => navigation.navigate('MedicationScreen')}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subHealth.r')}
								onPress={() => navigation.navigate('RegistryScreen')}
							/>

							<AsideMenuSubItem
								text={t('menuLeftHome.subHealth.imm')}
								onPress={() => navigation.navigate('InmmunizationScreen')}
							/>
						</AsideMenuItem>
						<AsideMenuItem
							accessibilityLabel={t('accessibility.listDr')}
							index={3}
							currentIndex={activeSection}
							onPress={handleSectionCollapse}
							text={t('menuLeftHome.appo')}
							isDropdown
							icon={<Menu4 height={40} />}
						>
							<AsideMenuSubItem
								text={t('menuLeftHome.subAppo.book')}
								onPress={() => navigation.navigate('VimView')}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subAppo.previous')}
								onPress={() => navigation.navigate('PreviusBookingScreen')}
							/>
							<AsideMenuSubItem
								text={t('menuLeftHome.subAppo.upcoming')}
								onPress={() => navigation.navigate('UpcomingBookingScreen')}
							/>
						</AsideMenuItem>
						{locationSelected === 'FL' && (
							<AsideMenuItem
								accessibilityLabel={t('accessibility.listDr')}
								index={4}
								currentIndex={activeSection}
								onPress={handleSectionCollapse}
								text={t('home.mentalHealthTitle')}
								isDropdown
								icon={
									<Image
										style={{ width: 28, height: 28, marginLeft: 8 }}
										source={require('assets/icons/MentalHealthIcons/Mental.png')}
									/>
								}
							>
								<AsideMenuSubItem
									text={t('about.title')}
									onPress={() => {
										getOnboardingValue();
										navigation.navigate('AboutScreen');
									}}
								/>
								<AsideMenuSubItem
									text={t('bobbleMenu.appointments')}
									onPress={() => {
										getOnboardingValue();
										navigation.navigate('AppointmentsScreen');
									}}
								/>
								<AsideMenuSubItem
									text={t('educationalResoulce.title')}
									onPress={() => {
										getOnboardingValue();
										navigation.navigate('EducationalResources');
									}}
								/>
								<AsideMenuSubItem
									text={t('menuLeftHome.needHelp')}
									onPress={() => handlerNeedHelp()}
								/>
								<AsideMenuSubItem
									text={t('menuLeftHome.selfManagementTools')}
									onPress={() => {
										getOnboardingValue();
										navigation.navigate('SelfManagementToolsScreen');
									}}
								/>
							</AsideMenuItem>
						)}

						<AsideMenuItem
							index={5}
							currentIndex={activeSection}
							onPress={handleSectionCollapse}
							text={t('wellness.cardTitle')}
							isDropdown
							icon={
								<Image
									style={{ width: 38, height: 28, marginLeft: 8 }}
									source={require('assets/icons/MentalHealthIcons/iconWellnessMenu.png')}
								/>
							}
						>
							{/* <AsideMenuSubItem
								text={t('home.check')}
								onPress={() =>
									navigation.navigate('SymtomsView', { action: 'SYPTOMS' })
								}
							/> */}
							{/* <AsideMenuSubItem
								text={t('menuLeftHome.vitalSign')}
								onPress={handlerVitalSign}
							/> */}
							<AsideMenuSubItem
								text={t('library.health')}
								onPress={() => navigation.navigate('HealthLibrary')}
							/>
						</AsideMenuItem>
						{/* <AsideMenuItem
							accessibilityLabel={t('accessibility.listDr')}
							text={t('menuLeftHome.virtual')}
							icon={<Menu5 height={40} />}
							onPress={() =>
								navigation.navigate('SymtomsView', { action: 'ASSISTANT' })
							}
						/> */}
						<AsideMenuItem
							accessibilityLabel={t('accessibility.listDr')}
							text={t('menuLeftHome.location')}
							icon={
								<Image
									style={{ width: 37, height: 33, marginLeft: 5 }}
									source={require('assets/icons/MentalHealthIcons/location.png')}
								/>
							}
							onPress={() => openModalLocation()}
						/>
					</View>
				</ScrollView>
			</Row>
			<Row
				style={{
					marginTop: 5,
					justifyContent: 'flex-end',
					paddingHorizontal: 20,
					paddingBottom: 15,
				}}
			>
				<Text style={styles.visitText} maxFontSizeMultiplier={1.3}>
					{t('menuLeftHome.version')}
					{appVersion}
				</Text>
			</Row>
			<MyModal
				open={ageModal}
				height={
					numberInsuranceModal == 10
						? 420
						: numberInsuranceModal == 9 || numberInsuranceModal == 8
						? 380
						: 450
				}
				onClose={handleCloseModal}
				onRequestClose={handleCloseModal}
				blockModal={false}
			>
				{numberInsuranceModal == 8 ||
				numberInsuranceModal == 9 ||
				numberInsuranceModal == 10 ? (
					<Body8
						ageDataInsurance={numberInsuranceModal}
						modalPaypal={() => null}
						setShowModal={setShowModal}
					/>
				) : (
					<></>
				)}
			</MyModal>
		</SafeAreaView>
	);
};

export default AsideDrawer;
