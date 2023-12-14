import { NavigatorScreenParams } from '@react-navigation/native';
import { BottomTabParamList } from '../BottomTabNavigator/BottomTabNavigator.types';

export type DrawerParamList = {
	Drawer: NavigatorScreenParams<DrawerStackParamsList> | undefined;
};

export type DrawerRigthParamList = {
	HomeDrawer: NavigatorScreenParams<DrawerParamList> | undefined;
	ChatWithDoctor?: undefined;
	VideoCallDoctor?: undefined;
	ClinicalCallCenter?: undefined;
};

export type DrawerStackParamsList = {
	Tabs: NavigatorScreenParams<BottomTabParamList> | undefined;
	ChatWithDoctor?: undefined;
	VideoCallDoctor?: undefined;
	ClinicalCallCenter?: undefined;
	CarePrograms?: undefined;
	Registry?: undefined;
	Referrals?: undefined;
	LabResults?: undefined;
	Immunizations?: undefined;
	Book?: undefined;
	Previous?: undefined;
	Upcoming?: undefined;
	SymtomsView?: undefined;
	HealthLibrary?: undefined;
	UpdateMyInsurance?: undefined;
	ReferralsDetailsScreen?: any;
	NotificationSettingsScreen?: any;
	GeneralNotificationsScreen?: any;
	VitalSignScanner?: undefined;
	EnrollDevice?: undefined;
};
