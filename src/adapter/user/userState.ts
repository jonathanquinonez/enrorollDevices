import { SerializedError } from '@reduxjs/toolkit';
import { User } from 'domain/entities/user';
import { NotificationsGeneral } from 'src/screens/Notifications/UtilNotifications';

export interface UserState extends User {
	lng?: string;
	patientInformation?: PatientInformation;
	tempSessionId: string;
	stateRegister: string;
	locationSelected?: string;
	currentRoute?: string;
	previousRoute?: string;
	activeCoverage?: boolean;
	serverDate?: string;
	hourDifference?: number;
	isFilter?: boolean;
	isBeWell: boolean;
	token?: string;
	error?: SerializedError;
	paymentResponse?: any;
	isTelevisitNavigate?: boolean;
	isPaymentProcess: number;
	isLoading: boolean;
	dataInformationInsurance?: any;
	dataInfoReferralsDetails?: any;
	editAccountdata?: any;
	reloadUpcomingAppointments?: boolean;
	statusMaintenance?: 'in_maintenance' | 'upcoming_maintenance' | 'no';
	maintenanceData?: MaintenanceData;
	vitalResults?: { date: any; data: string };
	stateViewChat?: { stateView: boolean; queue: string };
	tokenFB?: string;
	tempUserSSO?: string;
	notificationsList?: NotificationsGeneral[];
	tempDeleteNotification?: {
		type: 'delete' | 'remindLater'
		data: NotificationsGeneral,
		status?: boolean
	};
}

type PatientInformation = {
	address1?: string;
	address2?: string;
	city?: string;
	dateOfBirth?: string;
	email?: string;
	emergencyContact?: boolean;
	emergencyContactLastName?: string;
	emergencyContactMobile?: string;
	emergencyContactName?: string;
	emergencyRelationship?: string;
	employerName?: string;
	employmentStatus?: string;
	etnicity?: string;
	firstName?: string;
	genderIdentity?: string;
	genderIdentityOther?: string;
	homePhone?: string;
	languagePreference?: string;
	languagePreferenceOther?: string;
	lastName?: string;
	maritalStatus?: string;
	mobile?: string;
	race?: string;
	raceOther?: string;
	sex?: string;
	sexualOrientiation?: string;
	sexualOrientiationOther?: string;
	ssn?: string;
	state?: string;
	workPhone?: string;
	zipCode?: string;
}

interface MaintenanceData {
	payload: {
		date_init: string;
		date_end: string;
	};
	action: string;
	message: {
		body_en: string;
		title_en: string;
		body_es: string;
		title_es: string;
	};
	platform: 'app';
	status: boolean;
}
