import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';

import EnrollDeviceConfig, { EnrollDeviceEndPoint } from 'infrastructure/keraltyApi/repositories/enrollDeviceConfig';


export const enrollDeviceService: any = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${EnrollDeviceEndPoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	reducerPath: 'enrollDeviceService',
	endpoints: (build) => ({
		createEnrollDevice: build.mutation<any, { authUid: String, state: String, tokenFCM: String, deviceName: String, deviceSOVersion: String }>({
			query: ({ authUid, state, tokenFCM, deviceName, deviceSOVersion }) => EnrollDeviceConfig.createEnrollDevice(authUid, state, tokenFCM, deviceName, deviceSOVersion)
		}),
		getEnrollDeviceByToken: build.mutation<any, { state: String, token: String }>({
			query: ({ state, token }) => EnrollDeviceConfig.getEnrollDeviceByToken(state, token)
		}),
		getByEnrollDevices: build.mutation<any, { state: String }>({
			query: ({ state }) => EnrollDeviceConfig.getByEnrollDevices(state)
		}),
		deleteEnrollDevice: build.mutation<any, { state: String, authUid: String }>({
			query: ({ state, authUid }) => EnrollDeviceConfig.deleteEnrollDevice(state, authUid)
		}),

	})
});
const consentsService = enrollDeviceService;
export default consentsService;