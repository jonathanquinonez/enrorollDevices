import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import { UserState } from './userState';
import AsyncStorage from '@react-native-async-storage/async-storage';

// DOMAIN
import { authApi } from 'adapter/api/authService';
import { generalApi } from 'adapter/api/generalService';
import { registerApi } from 'adapter/api/registerService';
import { getCurrentValidatedTime, getHourDifference } from 'src/utils/devices';
import { usersApi } from 'adapter/api/usersService';

export const persistConfig = {
	key: 'user',
	whitelist: ['locationSelected'],
};

const initialState: UserState = {
	lng: 'en',
	patientInformation: undefined,
	locationSelected: '',
	currentRoute: '',
	previousRoute: '',
	paymentResponse: undefined,
	isLoading: false,
	isTelevisitNavigate: false,
	isFilter: false,
	isBeWell: false,
	isPaymentProcess: 0,
	dataInformationInsurance: {},
	dataInfoReferralsDetails: {},
	editAccountdata: {},
	tempSessionId: '',
	stateRegister: '',
	reloadUpcomingAppointments: false,
	serverDate: undefined,
	hourDifference: undefined,
	statusMaintenance: 'no',
	maintenanceData: {
		payload: {
			date_init: '',
			date_end: '',
		},
		action: '',
		message: {
			body_en: '',
			title_en: '',
			body_es: '',
			title_es: '',
		},
		platform: 'app',
		status: false,
	},
	vitalResults: { date: '', data: '' },
	tokenFB: undefined,
	tempUserSSO: undefined,
	stateViewChat: { queue: '', stateView: false },
	notificationsList: [],
	tempDeleteNotification: undefined,
};

export const UserSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setProp: (state, action: PayloadAction<{ key: keyof UserState; value: unknown }>) => {
			const {
				payload: { key, value },
			} = action;
			return { ...state, [key]: value };
		},
		setStateRegister: (state, { payload }) => ({ ...state, stateRegister: payload }),
		setStateVewChat: (
			state,
			{ payload }: PayloadAction<{ queue: string; stateView: boolean }>,
		) => ({
			...state,
			stateViewChat: { ...payload },
		}),
		setTempsessionId: (state, { payload }) => ({ ...state, tempSessionId: payload }),
		setPatientInformation: (state, { payload }) => ({ ...state, patientInformation: payload }),
		setCoverage: (state, { payload }) => ({ ...state, activeCoverage: payload }),
		setServerDate: (state, { payload }) => ({ ...state, serverDate: payload }),
		setHourDifference: (state, { payload }) => ({ ...state, hourDifference: payload }),
		setLanguage: (state, { payload }) => ({ ...state, lng: payload }),
		setLocation: (state, { payload }) => ({ ...state, locationSelected: payload }),
		setIsFilter: (state, { payload }) => ({ ...state, isFilter: payload }),
		setIsBeWell: (state, { payload }) => ({ ...state, isBeWell: payload }),
		setTempDeleteNotification: (state, { payload }) => ({ ...state, tempDeleteNotification: payload }),
		setCurrentRoute: (state, { payload }) => ({ ...state, currentRoute: payload }),
		setStatusMaintenance: (state, { payload }) => ({ ...state, statusMaintenance: payload }),
		setMaintenanceData: (state, { payload }) => ({ ...state, maintenanceData: payload }),
		setEditAccountdata: (state, { payload }) => ({ ...state, editAccountdata: payload }),
		setDataInformationInsurance: (state, { payload }) => ({
			...state,
			dataInformationInsurance: payload,
		}),
		setDataInfoReferralsDetails: (state, { payload }) => ({
			...state,
			dataInfoReferralsDetails: payload,
		}),
		setPreviousRoute: (state, { payload }) => ({ ...state, previousRoute: payload }),
		setPaymentResponse: (state, { payload }) => ({ ...state, paymentResponse: payload }),
		setIsPaymentProcess: (state, { payload }) => ({ ...state, isPaymentProcess: payload }),
		setIsTelevisitNavigate: (state, { payload }) => ({
			...state,
			isTelevisitNavigate: payload,
		}),
		setReloadUpcomingAppointments: (state, { payload }) => ({
			...state,
			reloadUpcomingAppointments: payload,
		}),
		setVitalResult: (state, { payload }) => ({ ...state, vitalResults: payload }),
		cleanError: (state) => ({ ...state, error: undefined }),
		tryLogout: (state) => ({ ...initialState, locationSelected: state.locationSelected }),
		setSSOToken: (state, { payload }) => ({ ...state, token: payload }),
		setTokenFB: (state, { payload }) => ({ ...state, tokenFB: payload }),
		setTempUserSSO: (state, { payload }) => ({ ...state, tempUserSSO: payload }),
	},
	extraReducers: (builder) => {
		builder
			//				authApi/executeMutation/fulfilled
			//      								v
			.addMatcher(
				authApi.endpoints.loginSecurity.matchFulfilled,
				(state, { payload: { token } }) => {
					token == '-1'
						? (state.token = token)
						: ((state.activeCoverage =
							(jwtDecode(token) as any)?.activeCoverage || false),
							(state.token = token));
				},
			)
			.addMatcher(registerApi.endpoints.finalSave.matchFulfilled, (state, { payload }) => {
				state.activeCoverage = (jwtDecode(payload) as any)?.activeCoverage || false;
				state.token = payload;
			})
			.addMatcher(generalApi.endpoints.serverDate.matchFulfilled, (state, { payload }) => {
				const hourDifference = getHourDifference();
				const currentValidatedTime = payload.date
					? getCurrentValidatedTime(payload)
					: undefined;
				state.serverDate = currentValidatedTime
					? currentValidatedTime.toISOString()
					: undefined;
				state.hourDifference = hourDifference ?? undefined;
			})
			//				authApi/executeMutation/fulfilled
			//      								v
			.addMatcher(
				authApi.endpoints.loadUserBySession.matchFulfilled,
				(state, { payload }) => ({
					...state,
					...payload,
				}),
			)
			.addMatcher(
				usersApi.endpoints.notificationApp.matchFulfilled,
				(state, { payload }) => {
					state.notificationsList = payload ?? []
				})
			.addMatcher(authApi.endpoints.loadUserBySession.matchRejected, (state) => ({
				...initialState,
				locationSelected: state.locationSelected,
			}));
	},
});

export const userActions = {
	...UserSlice.actions,
};

export default UserSlice.reducer;
