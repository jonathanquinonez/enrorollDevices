import appConfig from 'config/index';
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './httpClient';
import forgotMapper from './mappers/forgotMapper';
// INFRASTRUCTURE
import { authEndpoint } from 'infrastructure/keraltyApi/repositories/authConfig';
// DOMAIN
import { CancelUpAppoimentDto } from 'infrastructure/keraltyApi/models/appoiment';
import AppoimentConfig from 'infrastructure/keraltyApi/repositories/appoimentConfig';
//

export const appoimentApi = createApi({
    
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token ? token : appConfig.PUBLIC_API_TOKEN}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: (build) => ({
		fetchCancelAppoiment: build.mutation<any, CancelUpAppoimentDto>({
			query: (data) => AppoimentConfig.cancelUpAppoiment(data)
		}),
	})
});
 
const AppoimentService = appoimentApi;
export default AppoimentService;
