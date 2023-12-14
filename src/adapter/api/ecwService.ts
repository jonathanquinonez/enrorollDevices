import { createApi } from '@reduxjs/toolkit/query/react';
import appConfig from 'config/index';
import { axiosBaseQuery } from './httpClient';
// INFRASTRUCTURE
import EcwConfig, { ecwEndpoint } from 'infrastructure/keraltyApi/repositories/ecwConfig';
import { CancelUpAppoimentDto, DocumentLabDownloadDTO, DocumentVisitSummaryDownloadDTO, InsuranceDto, PersonalDataDTO, RegistriesCredentialsDTO } from 'infrastructure/keraltyApi/models/ecw';
import ecwMapper from './mappers/ecwMapper';
import { PastAppointments } from 'domain/entities/pastAppointments';
import { AppointmentsInfo } from 'domain/entities/appointmentsInfo';
import { DocumentLabDownload } from 'domain/entities/documentLab';
// DOMAIN
export const ecwApi = createApi({
	reducerPath: 'ecwApi',
	baseQuery: axiosBaseQuery({
		baseUrl: `${appConfig.API_URL}/${ecwEndpoint}`,
		prepareHeaders: (headers: any, { getState }) => {
			const { token } = (getState() as any).user;
			headers.set('Authorization', `Bearer ${token}`);
			headers.set('Content-Type', 'application/json');
			return headers;
		},
	}),
	endpoints: (builder) => ({

		fetchInsurances: builder.query<any, void>({
			query: () => EcwConfig.loadInsurances(),
		}),
		fetchLabDis: builder.mutation<any, string>({
			query: (patientEcwId) => EcwConfig.getLabDisData(patientEcwId),
			transformResponse: (response) => {
				return ecwMapper.mapFromLabDis(response);
			},
		}),
		fetchMedication: builder.query<any, string>({
			query: (patientEcwId) => EcwConfig.getMedicationData(patientEcwId),
		}),
		maritalStatus: builder.mutation<any, string>({
			query: (language) => EcwConfig.maritalStatus(language),
		}),
		pharmaciesByZipCode: builder.mutation<any, string>({
			query: (zipCode) => EcwConfig.pharmaciesByZipCode(zipCode),
		}),
		getReferral_pdf: builder.mutation<any, {referralId: number, patientId: number, language: string}>({
			query: (referralId) => EcwConfig.getReferral_pdf(referralId),
		}),
		fetchReferral: builder.mutation<any, string>({
			query: (patientEcwId) => EcwConfig.getReferralData(patientEcwId),
			transformResponse: (response) => {
				return ecwMapper.mapFromReferrals(response);
			},
		}),
		fetchInmunization: builder.mutation<any, string>({
			query: (patientEcwId) => EcwConfig.getInmunizationData(patientEcwId),
			transformResponse: (response) => {
				return ecwMapper.mapFromImmunization(response);
			},
		}),
		fetchMedicaton: builder.mutation<any, string>({
			query: (patientEcwId) => EcwConfig.currentMedications(patientEcwId),
			transformResponse: (response) => {
				return ecwMapper.mapFromMedicaton(response);
			},
		}),
		fetchPersonalInfo: builder.query<any, PersonalDataDTO>({
			query: (patientData) => EcwConfig.getPersonalInfo(patientData),
		}),
		fetchInsurance: builder.query<any, string>({
			query: (patientEcwId) => EcwConfig.getInsuranceProvider(patientEcwId),
		}),
		fetchRegistries: builder.mutation<any, RegistriesCredentialsDTO>({
			query: (patientEcwId) => EcwConfig.getRegistrieSummary(patientEcwId),
		}),
		fetchPrevApptms: builder.mutation<any, { ecw: string, isBeWell: boolean, state: string }>({
			query: (data) => EcwConfig.getPreviousAppointments(data),
			transformResponse: (response) =>{
			return ecwMapper.mapFromPreviusApointments(response)
			}
		}),
		fetchUpApptms: builder.mutation<any, {ecw: string, isBeWell: boolean, state: string}>({
			query: (data) => EcwConfig.getUpcomingAppointments(data),
			transformResponse: (response) => {
				return ecwMapper.mapFromUpcomingApointments(response);
			},
		}),
		fetchEmergencyContact: builder.query<any, string>({
			query: (patientEcwId) => EcwConfig.getEmergencyContactData(patientEcwId),
		}),
		fetchDocumentLab: builder.mutation<any, DocumentLabDownloadDTO>({
			query: (data) => EcwConfig.getDocumentLab(data)
		}),
		fetchCancelAppoiment: builder.mutation<any, CancelUpAppoimentDto>({
			query: (data) => EcwConfig.cancelUpAppoiment(data)
		}),
		fetchInformationInsurance : builder.mutation<any, InsuranceDto>({
			query: (data) => EcwConfig.getInsuranceProviderInformation(data.patientId , data.state),
			
		}),
		fetchInsurancesState: builder.query<any, string>({
			query: (state) => EcwConfig.loadInsurancesState(state),
		}),
		fetchDocumentLabVisitSummary: builder.mutation<any, DocumentVisitSummaryDownloadDTO>({//VisitSummary
			query: (data) => EcwConfig.getDocumentLabVisitSummary(data)
		}),
	}),
});
 
const EcwService = ecwApi;
export default EcwService;
