import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';
import authMapper from './mappers/authMapper';
// INFRASTRUCTURE
import AuthConfig, { authEndpoint } from 'infrastructure/keraltyApi/repositories/authConfig';
import { LoadUserBySessionResponseDTO, LoginResponseDTO, DeleteAccountDTO, UpdateMyInsurace, LoadUserBySession, CodeState, CheckTermsAndPrivacyVersion, UpdateTermsAndPrivacyVersion } from 'infrastructure/keraltyApi/models/auth';
// DOMAIN
import { LoginCredentials } from 'domain/entities/loginCredentials';
import { deleteAccount } from 'domain/entities/deleteAccount';
import VitalSignConfig from 'infrastructure/keraltyApi/repositories/vitalsignConfig';
//


export const vitalsignApi = createApi({
	baseQuery: axiosBaseQuery({
		baseUrl: `https://nuralogix-el75bmyfia-uc.a.run.app/api`,
		prepareHeaders: (headers: any, { getState }) => {
			headers.set('Content-Type', 'application/json');
			return headers;
		}
	}),
	reducerPath: 'vitalsignApi',
	endpoints: (build) => ({
		generateURL: build.mutation<any, any>({
			query: (data) => VitalSignConfig.generateUrl(data)
		}),
	})
});

const VitalSeignService = vitalsignApi;
export default VitalSeignService;
