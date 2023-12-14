export interface PatientResponsibleInfo {
	selfGuarantor: number;
	guarantorReason: string;
	guarantorReasonLabel?: string;
	ssn: string | undefined | null;
	patientRelationship: string;
	patientRelationshipLabel?: string;
	firstName: string;
	lastName: string;
	guarantorSsn: string | undefined | null;
	guarantorBirthdate: Date | string;
	city: string;
	state: string;
	zipCode: string;
	address: string;
	homePhone: string | undefined | null;
	cellphone: string | undefined | null;
	IDFile: any | undefined;
};
