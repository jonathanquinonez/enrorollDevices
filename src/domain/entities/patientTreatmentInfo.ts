export interface PatientTreatmentInfo {
	isSanitasPatient: boolean | undefined;
	isServiceSelected: boolean | undefined;
	isResultsSelected: boolean | undefined;
	isAcknowledgeSelected: boolean | undefined;
	isConsentSelected: boolean | undefined;
	signature: string;
	date: Date | string;
}
