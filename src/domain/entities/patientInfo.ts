import { PatientResponsibleInfo } from './patientResponsibleInfo';
import { PatientTreatmentInfo } from './patientTreatmentInfo';
import { PatientPharmacyInfo } from './patientPharmacyInfo';
import { PatientHipaaInfo } from './patientHipaaInfo';
import { PatientFinancialInfo } from './patientFinancialInfo';
import { PatientInsuranceInfo } from './patientInsuranceInfo';

export interface PatientInfo {
	responsibleParty: PatientResponsibleInfo;
	insurance: PatientInsuranceInfo;
	treatmentConsent: PatientTreatmentInfo;
	pharmacy: PatientPharmacyInfo;
	hipaa: PatientHipaaInfo;
	financial: PatientFinancialInfo;
}
