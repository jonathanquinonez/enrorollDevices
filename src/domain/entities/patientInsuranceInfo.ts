import moment, { Moment } from 'moment';
export interface PatientInsuranceInfo {
	insuranceCompany: string;
	insuranceCompanyTemp: string;
	companyId: number;
	planType?: string;
	name_of_insured: string;
	lastname_of_insured: string;
	name_of_insuredH: string;
	lastname_of_insuredH: string;
	dateOfBirthH: Moment;
	patient_relationship_to_insured: number;
	subscriber_id: string;
	group_id: string;
	is2ndInsurance: boolean | undefined;
	insuranceCompany2: string | undefined;
	insuranceCompanyTemp2: string | undefined;
	companyId2: number | undefined;
	planType2?: string | undefined;
	name_of_insured2: string | undefined;
	lastname_of_insured2?: string | undefined;
	name_of_insuredH2: string | undefined;
	lastname_of_insuredH2: string | undefined;
	dateOfBirthH2: Moment | undefined;
	patient_relationship_to_insured2: number | undefined;
	subscriber_id2: string | undefined;
	group_id2: string | undefined;
}
