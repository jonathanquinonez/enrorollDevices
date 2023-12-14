import { RootState } from '../types';
import { baseSelectors } from '../base/baseSelectors';
import { createSelector } from '@reduxjs/toolkit';
import { UserState } from './userState';

const selectSelf = (state: RootState): UserState => state.user;

const selectors = baseSelectors(selectSelf);

const selectActiveCoverage = createSelector(selectSelf, ({ activeCoverage }) => activeCoverage);
const selectPatientInformation = createSelector(selectSelf, ({ patientInformation }) => patientInformation);
const selectServerDate = createSelector(
	selectSelf,
	({ serverDate, hourDifference, maintenanceData, statusMaintenance }) => ({
		serverDate,
		hourDifference,
		maintenanceData,
		statusMaintenance,
	}),
);
const selectTempSessionId = createSelector(selectSelf, ({ tempSessionId }) => tempSessionId);
const selectState = createSelector(selectSelf, ({ stateRegister }) => stateRegister);
const selectUserInfo = createSelector(selectSelf, ({ info }) => ({
	...(info || {}),
	...(info?.firstName ? { displayName: `${info.firstName} ${info.lastName}` } : {}),
}));

const selectUser = createSelector(selectSelf, ({ info, ecwId, authUid }) => ({
	...(info || {}),
	displayName: info ? `${info.firstName} ${info.lastName}` : '',
	ecwId,
	authUid,
}));

const selectIsLoggedIn = createSelector(
	selectSelf,
	({
		token,
		locationSelected,
		isPaymentProcess,
		dataInformationInsurance,
		dataInfoReferralsDetails,
	}) => ({
		isLoggedIn: Boolean(token),
		token,
		locationSelected,
		isPaymentProcess,
		dataInformationInsurance,
		dataInfoReferralsDetails,
	}),
);

const selectEditAccountdata = createSelector(selectSelf, ({ editAccountdata }) => ({
	editAccountdata,
}));

const selectIsFilter = createSelector(selectSelf, ({ isFilter }) => ({
	isFilter,
}));
const selectIsBeWell = createSelector(selectSelf, ({ isBeWell }) => ({
	isBeWell,
}));

const selectRoute = createSelector(
	selectSelf,
	({ currentRoute, previousRoute, isTelevisitNavigate, reloadUpcomingAppointments }) => ({
		currentRoute,
		previousRoute,
		isTelevisitNavigate,
		reloadUpcomingAppointments,
	}),
);

const selectPaymentResponse = createSelector(selectSelf, ({ paymentResponse }) => ({
	paymentResponse,
}));

const selectNotificationsList = createSelector(selectSelf, ({ notificationsList, tempDeleteNotification }) => ({
	notificationsList,
	tempDeleteNotification
}));

const selectVitalResult = createSelector(selectSelf, ({ vitalResults }) => ({
	vitalResults,
}));

const selectSSO = createSelector(selectSelf, ({ tokenFB, tempUserSSO }) => ({
	tokenFB,
	tempUserSSO,
}));
const selecViewChat = createSelector(selectSelf, ({ stateViewChat }) => ({
	stateViewChat,
}));

export const userSelectors = {
	...selectors,
	selectTempSessionId,
	selectNotificationsList,
	selectEditAccountdata,
	selectState,
	selectActiveCoverage,
	selectPatientInformation,
	selectServerDate,
	selectPaymentResponse,
	selectUserInfo,
	selectUser,
	selectIsLoggedIn,
	selectIsFilter,
	selectIsBeWell,
	selectRoute,
	selectVitalResult,
	selectSSO,
	selecViewChat,
};
