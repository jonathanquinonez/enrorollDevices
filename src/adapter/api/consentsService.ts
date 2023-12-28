import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';

import ConsentsConfig, { ConsentsEndPoint } from '../../infrastructure/keraltyApi/repositories/consentsConfig';


export const consentsApi: any = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${ConsentsEndPoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}), 
	reducerPath: 'consentsApi',
	endpoints: (build) => ({
		fetchGenders: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getGenders(language),
		}),
		fetchSexualOrientation: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getSexualOrientation(language),
		}),
		fetchEthnicity: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getEthnicity(language),
		}),
		fetchRace: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getRace(language),
		}),
		fetchPreferedLanguage: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getPreferedLanguage(language),
		}),
		fetchGuarantorEmployment: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getGuarantorEmployment(language),
		}),
		fetchDoYouHave: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getDoYouHave(language),
		}),
		emergencyContact: build.mutation<string, any>({
			query: (language: string) => ConsentsConfig.getEmergencyContact(language),
		}),
	})
});
const consentsService = consentsApi;
export default consentsService;