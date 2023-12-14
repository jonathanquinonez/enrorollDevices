export interface PatientPharmacyInfo {
	pharmacyName: string;
	isAuthSelected: boolean | undefined;
	isDisclosureSelected: boolean | undefined;
	isEmailIncluded: number | null;
	isPhoneNumberIncluded: number;
	users: {
		name: string;
		rel: string;
		phone: string;
	}[] | undefined;
};
