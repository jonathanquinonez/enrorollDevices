/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Method } from 'axios';
import { LoadUserBySession } from '../models/auth';

type Endpoint = { url: string; method: Method; body?: any };

export const usersEndpoint = 'users';

const UsersConfig = {
	getPersonalInfo: (data: { authUid: string, state: string }): Endpoint => ({
		method: 'get',
		url: `patient-info/${data.authUid}/${data.state}`,
	}),
	onboardingValueByEmail: (data: { email: string, state: string }): Endpoint => ({
		method: 'get',
		url: `onboardingValueByEmail/${data.email}/${data.state}`,
	}),
	updateOnboardingByEmail: (data: { email: string, state: string }): Endpoint => ({
		method: 'get',
		url: `updateOnboardingByEmail/${data.email}/${data.state}/true`,
	}),
	userData: (data: LoadUserBySession): Endpoint =>
		({ method: 'get', url: `${data.token}/${data.state}` }),
	getEmergencyContactData: (data: { id: string, state: string }): Endpoint => ({
		method: 'get',
		url: `patient/emergency-contacts/${data.id}/${data.state}`,
	}),

	/* Notifications */
	notificationApp: (): Endpoint => ({
		method: 'get',
		url: `notification-app`,
	}),
	notificationViewAll: (): Endpoint =>
		({ method: 'post', url: `notification-app/view-all` }),
	remindLater: (id: string): Endpoint =>
		({ method: 'post', url: `notification-app/remind-later/${id}` }),
	deleteNotification: (id: string): Endpoint =>
		({ method: 'post', url: `notification-app/delete/${id}` }),
	notificationsSetting: (data: { state: string }): Endpoint => ({
		method: 'get',
		url: `notifications-setting/${data.state}`,
	}),
	createNotificationApp: (body: any): Endpoint =>
		({ method: 'post', url: `notification-app`, body }),
	createNotifications: (body: any): Endpoint =>
		({ method: 'post', url: `notifications-setting`, body }),
	updateNotifications: (body: any): Endpoint =>
		({ method: 'post', url: `notifications-setting/update`, body }),
	/* ------------ */
};

export default UsersConfig;
