import { ColorSchemeName } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerParamList } from './DrawerNavigator/DrawerNavigator.types';
import { BottomTabParamList } from './BottomTabNavigator/BottomTabNavigator.types';

export interface NavigationProps {
	colorScheme: ColorSchemeName;
	showOnboarding: any;
	setShowOnboardingScreen: any;
}

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export type RootStackParamList = {
	Onboarding?: undefined;
	CreateAccount?: {
		sso?: {
			accountNumber?: string;
			tempUser?: string;
			dateOfBirth?: Date;
			state?: string;
		};
	};
	CreateAccountSSO?: {
		sso?: {
			accountNumber?: string;
			tempUser?: string;
			dateOfBirth?: Date;
			state?: string;
		};
	};
	Root: NavigatorScreenParams<DrawerParamList> | undefined;
	Login?: {
		redirectTo?: string;
		tokenFB?: string;
	};
	ForgotPassword?: undefined;
	PrivacyPolicy?: undefined;
	TermsConditions?: undefined;
	BlockedAccountScreen?: undefined;
	PatientRegistration?: undefined;
	Consents?: undefined;
	MyHealthScreen?: undefined;
	ReferalsScreen?: undefined;
	RegistryScreen?: undefined;
	LabScreen?: undefined;
	InmmunizationScreen?: undefined;
	MedicationScreen?: undefined;
	LanguageScreen?: undefined;
	SymtomsView?: undefined;
	VimView?: undefined;
	MyInsurance?: undefined;
	VideoCallScreen?: undefined;
	GetCareScreen?: undefined;
	PersonalInformation?: undefined;
	DeleteAccount?: undefined;
	HealthLibrary?: undefined;
	ChatSanitas?: undefined;
	UpcomingBookingScreen?: undefined;
	PreviusBookingScreen?: undefined;
	CareProgramScreen?: undefined;
	ReferralsDetailsScreen?: undefined;
	NotificationSettingsScreen?: undefined;
	GeneralNotificationsScreen?: undefined;
	UpdateMyInsurance?: undefined;
	ChatSupport: undefined;
	TwoFactorSelectScreen?: undefined;
	TwoFactorVerifyScreen?: undefined;
	Smartwatch?: undefined;
	VitalSignScanner?: {
		url?: string;
	};
	VitalSignResults?: {
		results?: string;
	};
	EnrollDevice?: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
	RootStackParamList,
	Screen
>;

export type RootTabScreenProps<Screen extends keyof BottomTabParamList> = CompositeScreenProps<
	BottomTabScreenProps<BottomTabParamList, Screen>,
	NativeStackScreenProps<RootStackParamList>
>;
