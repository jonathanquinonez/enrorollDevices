/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Method } from 'axios';
import { LoadUserBySession } from '../models/auth';
import { store } from 'adapter/store';
import { userSelectors } from 'adapter/user/userSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Endpoint = { url: string; method: Method; body?: any };

export const usersEndpoint = 'users';

const UsersConfig = {
	getPersonalInfo: (data: { authUid: string; state: string }): Endpoint => ({
		method: 'get',
		url: `patient-info/${data.authUid}/${data.state}`,
	}),
	onboardingValueByEmail: (data: { email: string; state: string }): Endpoint => ({
		method: 'get',
		url: `onboardingValueByEmail/${data.email}/${data.state}`,
	}),
	updateOnboardingByEmail: (data: { email: string; state: string }): Endpoint => ({
		method: 'get',
		url: `updateOnboardingByEmail/${data.email}/${data.state}/true`,
	}),
	userData: (data: LoadUserBySession): Endpoint => ({
		method: 'get',
		url: `${data.token}/${data.state}`,
	}),
	getEmergencyContactData: (data: { id: string; state: string }): Endpoint => ({
		method: 'get',
		url: `patient/emergency-contacts/${data.id}/${data.state}`,
	}),

	/* Notifications */

	//Este llamado hay que hacerlo despues de Anual Check Visit
	notificationApp: (data: { state: string }): Endpoint => ({
		method: 'get',
		url: `notification-app/${data.state}`,
	}),
	notificationViewAll: (data: { state: string }): Endpoint => ({
		method: 'post',
		url: `notification-app/view-all/${data.state}`,
	}),
	remindLater: (id: string, state: string): Endpoint => ({
		method: 'post',
		url: `notification-app/remind-later/${id}/${state}`,
	}),
	remindLaterUndo: (id: string, state: string): Endpoint => ({
		method: 'post',
		url: `notification-app/remind-later/undo/${id}/${state}`,
	}),
	deleteNotification: (id: string, state: string): Endpoint => ({
		method: 'post',
		url: `notification-app/delete/${id}/${state}`,
	}),
	notificationsSetting: (data: { state: string }): Endpoint => ({
		method: 'get',
		url: `notifications-setting/${data.state}`,
	}),

	//En este el state debe ir en el body
	createNotificationApp: (body: any): Endpoint => ({
		method: 'post',
		url: `notification-app`,
		body,
	}),
	createNotifications: (body: any): Endpoint => ({
		method: 'post',
		url: `notifications-setting/${body.state}`,
		body,
	}),
	updateNotifications: (body: any): Endpoint => ({
		method: 'post',
		url: `notifications-setting/update/${body.state}`,
		body,
	}),
	/* ------------ */
};

export default UsersConfig;
