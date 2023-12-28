import React, { useEffect, useState } from 'react';
import { useColorScheme, View, Text, Dimensions, Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';

// Hooks
import useStyles from 'hooks/useStyles';
import { useCall } from 'hooks/useCall';
import { useNavigation } from '@react-navigation/native';

// Config
import { Colors } from 'config/theme';
import appConfig from 'config/index';
// Types
import { BottomTabParamList } from './BottomTabNavigator.types';
import componentStyles from './BottomTabNavigator.styles';
//Stack
import HomeStackNavigator from '../HomeStackNavigator/HomeStackNavigator';
import { TabBarAdvancedButton } from 'src/components/molecules/TabBarCustom/TabBarCustom';
import BottomNavBarButton from 'src/components/atoms/BottomNavBarButton/BottomNavBarButton';
//Icons
import Home from 'assets/images/icons/home.svg';
import HomeSelected from 'assets/images/icons/home_selected.svg';
import Call from 'assets/images/icons/call.svg';
import Care from 'assets/images/icons/care.svg';
import CareSelected from 'assets/images/icons/care_selected.svg';
import Library from 'assets/images/icons/health.svg';
import LibrarySelected from 'assets/images/icons/library_selected.svg';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { SymtomsView } from 'src/screens/Symtoms/SymtomsView';
import { isIphoneX } from 'src/utils/devices';
import { GetCareScreen } from 'src/screens/GetCareNow/GetCareScreen';
import DeviceInfo from 'react-native-device-info';
import { ChatKeralty, Keraltyhandles } from '@quillbot/keralty-chat-mobile';
import { userActions } from 'adapter/user/userSlice';
import i18n from 'i18n/i18n';
import IconAlert from 'src/components/molecules/IconAlert/IconAlert';
import { GeneralNotificationsScreen } from 'src/screens/Notifications/GeneralNotificationsScreen/GeneralNotificationsScreen';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
	const { isLoggedIn } = useAppSelector(userSelectors.selectIsLoggedIn);
	const { stateViewChat } = useAppSelector(userSelectors.selecViewChat);
	const { notificationsList } = useAppSelector(userSelectors.selectNotificationsList);
	const [queue, setQueue] = React.useState('support');
	const user = useAppSelector(userSelectors.selectUser);

	const [countNotifications, setCountNotifications] = useState<number>(0);

	const { t } = useTranslation();
	const { styles, colors } = useStyles(componentStyles);

	const { openLink } = useCall();
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);
	const dispatch = useAppDispatch();
	const { navigate }: any = useNavigation();

	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const handlerCall = async () => {
		await openLink({
			number: '8446654827',
			prompt: true,
			skipCanOpen: true,
		});
	};

	const ref = React.useRef<Keraltyhandles>(null);
	const pressOpen = (queue: string) => {
		setQueue(queue);
		ref.current?.openChat(queue);
		dispatch(userActions.setStateVewChat({ queue: '', stateView: false }));
	};

	useEffect(() => {
		if (stateViewChat?.queue) {
			pressOpen(stateViewChat.queue);
		}
	}, [stateViewChat?.stateView]);


	useEffect(() => {
		if (notificationsList?.length) {
			const unviewedNotifications = notificationsList.filter(notification => !notification.viewed);
			//const total = unviewedNotifications?.length >= 10 ? 9 : unviewedNotifications?.length
			const total = unviewedNotifications?.length;
			setCountNotifications(total ?? 0)
		} else {
			setCountNotifications(0)
		}
	}, [notificationsList])

	useEffect(() => {
		if (currentRoute == 'NotificationSettingsScreen') setCountNotifications(0)
	}, [currentRoute])

	return (
		<>
			{isLoggedIn && (


				<ChatKeralty
					ref={ref}
					baseUrl="https://mychatqa.mysanitas.com"
					isPublic={false}
					language={lang}
					//    isActiveBubble
					styleButtonBurger={{ top: Platform.OS === 'ios' ? Dimensions.get('screen').height * 0.83 : Dimensions.get('screen').height * 0.795 }}
					styleBubbleContainer={{ bottom: Platform.OS === 'ios' ? Dimensions.get('screen').height * 0.091 : Dimensions.get('screen').height * 0.11 }}
					queue={queue as any}

					user={{
						isPublic: false,
						authuid: user.authUid,
						currenttimezone: user.state === 'FL' ? 'ET' : 'CT',
						datebirthday: user.birthdate,
						state: user.state,
						sanitasAccountNumber: user.ecwId,
						gender: user.sex,
						mail: user.email,
						token: '',
						userName: user.displayName,
					}}
				/>
			)}
			<BottomTab.Navigator
				tabBar={(props) => (
					<View style={styles.navigatorContainer}>
						<BottomTabBar {...props} />
						{isIphoneX() && (
							<View
								style={[
									styles.xFillLine,
									{
										backgroundColor: '#b4b4b4',
									},
								]}
							/>
						)}
					</View>
				)}
				screenOptions={{
					tabBarShowLabel: false,
					headerShown: false,
					tabBarHideOnKeyboard: true,
					tabBarStyle: {
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						borderTopWidth: 0,
						elevation: 0,
						height: isIphoneX() ? 68 : 34,
						backgroundColor: '#b4b4b4',
					},
				}}
			>
				<BottomTab.Screen
					name="HomeStack"
					component={HomeStackNavigator}
					options={{
						tabBarAccessibilityLabel: t('accessibility.home'),
						tabBarIcon: () => (
							<BottomNavBarButton
								text={t('bottonNavegation.home')}
								isFocus={currentRoute == 'Home'}
								icon={
									currentRoute == 'Home' ? (
										<HomeSelected width={30} />
									) : (
										<Home width={30} />
									)
								}
							/>
						),
					}}
				/>
				<BottomTab.Screen
					name="PhoneStack"
					component={View}
					options={{
						tabBarAccessibilityLabel: t('accessibility.support'),
						tabBarIcon: ({ focused }) => (
							<BottomNavBarButton
								text={t('bottonNavegation.call')}
								isFocus={focused}
								icon={<Call width={20} />}
							/>
						),
					}}
					listeners={{
						tabPress: (e) => {
							e.preventDefault();
							handlerCall();
						},
					}}
				/>
				<BottomTab.Screen
					name="ChatSupport"
					component={View}
					options={{
						tabBarAccessibilityLabel: t('accessibility.btnChat'),
						tabBarButton: (props) => (
							<TabBarAdvancedButton
								bgColor={colors.WHITE}
								children={() => <></>}
								hiddeIconMenu

							/* {...props} */
							/* 				onPress={() =>
								navigate('ChatSanitas', {
									type: 'supportUser',
									prevRoute: currentRoute,
								})
							} */
							/>
						),
					}}
				/>
				<BottomTab.Screen
					name="ChatStack"
					component={GetCareScreen}
					options={{
						tabBarAccessibilityLabel: t('accessibility.btnGetCareNow'),
						tabBarIcon: () => (
							<BottomNavBarButton
								text={t('bottonNavegation.care')}
								isFocus={
									currentRoute == 'GetCareScreen' || currentRoute == 'ChatStack'
								}
								icon={
									currentRoute == 'GetCareScreen' ||
										currentRoute == 'ChatStack' ? (
										<CareSelected />
									) : (
										<Care />
									)
								}
							/>
						),
					}}
				/>
				<BottomTab.Screen
					name="GeneralNotifications"
					component={View}
					listeners={{
						tabPress: (e) => {
							e.preventDefault();
							navigate('GeneralNotificationsScreen')
						},
					}}
					options={{
						tabBarAccessibilityLabel: t('accessibility.noti'),
						tabBarIcon: ({ focused }) => (
							<BottomNavBarButton
								text={t('notifications.title')}
								isFocus={currentRoute == 'NotificationSettingsScreen' || currentRoute == 'GeneralNotificationsScreen' || currentRoute == 'EnrollDevice' || focused}
								children={<IconAlert
									numberNotifications={countNotifications}
									active={currentRoute == 'NotificationSettingsScreen' || currentRoute == 'GeneralNotificationsScreen' || currentRoute == 'EnrollDevice' || focused} />}
							/>
						),
					}}
				/>
			</BottomTab.Navigator>
		</>
	);
};

export default BottomTabNavigator;
