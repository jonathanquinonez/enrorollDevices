import { PatientInsuranceInfo } from "../entities/patientInsuranceInfo";

export const DefaultPatientInsuranceInfo: PatientInsuranceInfo = {
	company: '',
	companyId: '',
	phone: '',
	insuredName: '',
	insuredLastName: '',
	patientToInsured: '',
	subscriberId: '',
	groupId: '',
	// ---- secondary
	is2ndInsurance: false,
	company2nd: '',
	companyId2nd: '',
	phone2nd: '',
	insuredName2nd: '',
	insuredLastName2nd: '',
	patientToInsured2nd: '',
	subscriberId2nd: '',
	groupId2nd: ''
};
