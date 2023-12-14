import { configureStore, combineReducers, MiddlewareArray } from '@reduxjs/toolkit';
import { CombinedState } from 'redux';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { PersistPartial } from 'redux-persist/lib/persistReducer';

import { fshApi } from './api/fshService';
import { anxietyApi } from './api/anxietyService';
import { ecwApi } from './api/ecwService';
import { forgotApi } from './api/forgotService';
import { unblockApi } from './api/unblockService';
import UserReducer, { persistConfig as userPersistConfig } from './user/userSlice';
import LoaderReducer from './loader/loaderSlice';
import CaptchaReducer from './captcha/captchaSlice';
import { authApi } from './api/authService';
import { usersApi } from './api/usersService';
import { generalApi } from './api/generalService';
import { generalAuthApi } from './api/generalServiceAuth';
import { registerApi } from './api/registerService';
import { appoimentApi } from './api/appoimentService';
import { paymentApi } from './api/paymentService';
import { mentalHealthApi } from './api/mentalHealthService';
import { stinkingApi } from './api/StinkingthinkingService';
import { SSOApi } from './api/ssoService';
import TwoFactorReducer from './user/twoFactor/twoFactorSlice';
import { vitalsignApi } from './api/vitalsignService';
import { consentsApi } from './api/consentsService';
import enrollDeviceService from './api/enrollDeviceService';

const persistConfig = { 
	key: 'root',
	version: 1,
	storage: AsyncStorage,
	// Add your key here to persists the entire slice
	// If you need just a few values within the slice, use nested config instead
	whitelist: [],
	blacklist: ['user'],
	//Manual Persist can be used to start the persistence on user logged in
	// manualPersist: true
};

const rootReducer: CombinedState<any> = combineReducers({
	user: persistReducer<any, any>({ ...userPersistConfig, storage: AsyncStorage }, UserReducer),
	loader: LoaderReducer, 
	twoFactorLogin: TwoFactorReducer,
	captcha: CaptchaReducer,
	[paymentApi.reducerPath]: paymentApi.reducer,
	[forgotApi.reducerPath]: forgotApi.reducer,
	[unblockApi.reducerPath]: unblockApi.reducer,
	[ecwApi.reducerPath]: ecwApi.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[usersApi.reducerPath]: usersApi.reducer,
	[mentalHealthApi.reducerPath]: mentalHealthApi.reducer,
	[generalApi.reducerPath]: generalApi.reducer,
	[generalAuthApi.reducerPath]: generalAuthApi.reducer,
	[registerApi.reducerPath]: registerApi.reducer,
	[appoimentApi.reducerPath] : appoimentApi.reducer,
	[anxietyApi.reducerPath] : anxietyApi.reducer,
	[stinkingApi.reducerPath] : stinkingApi.reducer,
	[fshApi.reducerPath] : fshApi.reducer,
	[SSOApi.reducerPath] : SSOApi.reducer,
	[vitalsignApi.reducerPath]: vitalsignApi.reducer,
	[consentsApi.reducerPath]: consentsApi.reducer,
	[enrollDeviceService.reducerPath]: enrollDeviceService.reducer
});

const persistedReducer = persistReducer<ReturnType<typeof store.getState>, typeof store.dispatch>(
	persistConfig,
	rootReducer,
);

export const store: ReturnType<typeof configureStore> = configureStore({
	devTools: __DEV__,
	reducer: persistedReducer,
	middleware: (
		getDefaultMiddleware: CurriedGetDefaultMiddleware<PersistPartial>,
	): MiddlewareArray<any> =>
		getDefaultMiddleware({
			// serializableCheck: false
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
			},
		})
		.concat(unblockApi.middleware)
		.concat(forgotApi.middleware)
		.concat(paymentApi.middleware)
		.concat(authApi.middleware)
		.concat(usersApi.middleware)
		.concat(generalApi.middleware)
		.concat(generalAuthApi.middleware)
		.concat(mentalHealthApi.middleware)
		.concat(ecwApi.middleware)
		.concat(registerApi.middleware)
		.concat(appoimentApi.middleware)
		.concat(anxietyApi.middleware)
		.concat(SSOApi.middleware)
		.concat(fshApi.middleware)
		.concat(stinkingApi.middleware)
		.concat(vitalsignApi.middleware)
		.concat(consentsApi.middleware)
		.concat(enrollDeviceService.middleware)
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);