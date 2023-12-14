/* eslint-disable arrow-body-style */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Method } from 'axios';
import {
	RegistriesCredentialsDTO,
	PersonalDataDTO,
	DocumentLabDownloadDTO,
	CancelUpAppoimentDto,
	DocumentVisitSummaryDownloadDTO
} from '../models/ecw';

type Endpoint = { url: string; method: Method; body?: any };

export const ecwEndpoint = 'ecw';

const EcwConfig = {
	loadInsurances: (): Endpoint => ({ method: 'get', url: `general/insurances` }),
	getLabDisData: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/lab-dis?patientId=${patientId}`,
	}),
	getMedicationData: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/medications?patientId=${patientId}`,
	}),
	maritalStatus: (language: string): Endpoint => ({
		method: 'get',
		url: `general/marital-status/${language}`,
	}),
	pharmaciesByZipCode: (zipCode: string): Endpoint => ({
		method: 'get',
		url: `general/pharmacies-by-zip-code?zipCode=${zipCode}`,
	}),
	getReferralData: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/referrals?patientId=${patientId}`,
	}),
	getReferral_pdf: (data: { referralId: number, patientId: number, language: string }): Endpoint => ({
		method: 'get',
		url: `patient/referrals-pdf?language=${data.language}&patientId=${data.patientId}&referralsId=${data.referralId}`,
	}),
	getInmunizationData: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/immunizations?patientId=${patientId}`,
	}),
	currentMedications: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/currentMedications?patientId=${patientId}`,
	}),
	getPersonalInfo: (data: PersonalDataDTO): Endpoint => {
		const { birthdate: dob, firstName, lastName, sex, state, email, phone } = data;
		const params = new URLSearchParams({
			dob,
			firstName,
			lastName,
			sex,
			state,
			email,
			phone,
		}).toString();
		return { method: 'get', url: `search/personal-info?${params}` };
	},
	getInsuranceProvider: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/insurance-providers?patientId=${patientId}`,
	}),
	getRegistrieSummary: (data: RegistriesCredentialsDTO): Endpoint => {
		const { ecwId: patientId, beginDate, endDate } = data;
		const params = new URLSearchParams({ patientId, beginDate, endDate }).toString();
		return { method: 'get', url: `patient/visit-summaries?${params}` };
	},
	getPreviousAppointments: (data: { ecw: string, isBeWell: boolean, state: string }): Endpoint => ({
		method: 'get',
		url: `patient/previous-appointments${data.isBeWell ? '/' + data.state : ''}?patientId=${data.ecw}`,
	}),
	getUpcomingAppointments: (data: { ecw: string, isBeWell: boolean, state: string }): Endpoint => ({
		method: 'get',
		url: `patient/upcoming-appointments-vim${data.isBeWell ? '/' + data.state : ''}?patientId=${data.ecw}`,
	}),
	getEmergencyContactData: (patientId: string): Endpoint => ({
		method: 'get',
		url: `patient/emergency-contacts?patientId=${patientId}`,
	}),
	getDocumentLab: (body: DocumentLabDownloadDTO): Endpoint => ({
		method: 'post',
		url: 'patient/lab-di-details',
		body,
	}),

	cancelUpAppoiment: (body: CancelUpAppoimentDto): Endpoint => ({
		method: 'post',
		url: `appointment/CancelAppointment`,
		body,
	}),
	getInsuranceProviderInformation: (patientId: string, state: string): Endpoint => ({
		method: 'get',
		url: `patient/insurance-information?patientId=${patientId}&state=${state}`,
	}),
	loadInsurancesState: (state: string): Endpoint => ({
		method: 'get',
		url: `general/insurances`,
	}),
	getDocumentLabVisitSummary: (body: DocumentVisitSummaryDownloadDTO): Endpoint => ({//VisitSummary
		method: 'post',
		url: 'patient/visit-summaries/pdf',
		body,
	}),
};

export default EcwConfig;
