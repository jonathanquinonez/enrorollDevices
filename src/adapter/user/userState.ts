import { SerializedError } from '@reduxjs/toolkit';
import { PatientInformation } from 'domain/entities/tempFormUser';
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
	stateViewChat?: { stateView: boolean; queue: string };
	tokenFB?: string;
	tempUserSSO?: string;
	vitalResults?: string;
	tempEmailSSOEdited: boolean;
	notificationsList?: NotificationsGeneral[];
	tempDeleteNotification?: {
		type: 'delete' | 'remindLater';
		data: NotificationsGeneral;
		status?: boolean;
	};
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
