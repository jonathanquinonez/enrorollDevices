
import moment, { Moment } from 'moment';
//#region COMMON TYPES
type ContactMethodsDTO = {
	email: string;
};
type PatientInfoDTO = {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	sex: string;
	state: string;
	cellphone?: string
};
//#endregion COMMON TYPES

//#region LOGIN TYPES
export type LoginCredentialsDTO = {
	email: string;
	pass: string;
}

export type UserInformationEdit = {
	address?: string;
	authUid?: string;
	city?: string;
	employmentStatus?: string;
	etnicity?: string;
	genderIdentity?: string;
	genderIdentityOther?: string;
	homePhone?: string;
	languagePreference?: string;
	languagePreferenceOther?: string;
	maritalStatus?: string;
	mobile?: string;
	race?: string;
	raceOther?: string;
	sex?: string;
	sexualOrientiation?: string;
	sexualOrientiationOther?: string;
	state?: string;
	zipCode?: string;
	genderIdentityLabel?: string;
	sexualOrientiationLabel?: string;
	etnicityLabel?: string;
	raceLabel?: string;
	languagePreferenceLabel?: string;
	employmentStatusLabel?: string;
};


export type DeleteAccountDTO = {
	email: string;
	motive: string;
	state: string;
}

export type LoginResponseDTO = {
	token: string
};

export type LoginSecurityDTO = {
	info: string;
};


export type LoadUserBySessionResponseDTO = {
	externalPartyId: string;
	mrn: string;
	authUid: string;
	role: string;
	idEcw: string;
	defaultFacility?: any;
	id?: any;
	idUser?: any;
	isFBMax?: any;
	sendByEmail?: any;
	ecwIdPending?: any;
	inclusionDate?: any;
	lastActiveInAvaility: number;
	patientInformation: {
		firstName: string;
		lastName: string;
		dateOfBirth: string;
		email: string;
		mobile: string;
		sex: string;
		homePhone: string;
		address1: string;
		address2: string;
		city: string;
		state: string;
		zipCode: string;
		ssn: string;
	},
	responsiblePartyInformation: {
		self: string;
		guarantor: string;
		responsiblePartyFirstName: string;
		responsiblePartyLastName: string;
		relationshipToThePatient: string;
		relationshipToThePatientLabel?: any;
		reasonToHaveAGuarantor: string;
		reasonToHaveAGuarantorLabel?: any;
		guarantorSSN?: any;
		guarantorDateOfBirth: string;
		city: string;
		state: string;
		zipCode: string;
		address: string;
		homePhone: string;
		mobile: string;
		ssn: string;
	},
	primaryInsuranceInformation: {
		insuranceCompany: string;
		companyId: string;
		phone_number: string;
		name_of_insured?: any;
		lastname_of_insured?: any;
		patient_relationship_to_insured: string;
		subscriber_id: string;
		group_id: string;
		holderInsured: object;
	},
	secondaryInsuranceInformation: {
		insuranceCompany?: any;
		companyId: string;
		phone_number: string;
		name_of_insured?: any;
		lastname_of_insured?: any;
		patient_relationship_to_insured: string;
		subscriber_id: string;
		group_id: string;
		holderInsured: object;
	},
	pharmacyInformation: {
		pharmacy: string;
		disclosureToFamily: string;
		familyMembers: []
	},
	hipaaAcknowledgement: {
		signature: string;
	},
	consentToTreatment: {
		signature: string;
	},
	financialPolicy: {
		signature: string;
	},
	healthOptins?: any;
};
//#endregion LOGIN TYPES

//#region REGISTER TYPES
export type RegistrationCheckDTO = {
	patientInformation: PatientInfoDTO;
};

export type ValidateAccountDTO = {
	accountNumber: string;
	dateOfBirth: string;
	isFBMax: boolean;
	id: string;
};

export type ValidateAccountContactMethodsDTO = ValidateAccountDTO & ContactMethodsDTO;

export type MatchAccountInfoDTO = {
	patientInformation: PatientInfoDTO & ContactMethodsDTO;
};
//#endregion REGISTER TYPES

//#UnblockAccount
export interface GetIdBelongState {
	name: string;
	surname: string;
	email: string;
	mobile?: string;
};

export interface GetPreviousProc {
	data: object;
};

export interface SendCodeMsj {
	email: string;
	phoneNumber: string;
	name: string;
	idBelongState?: object;
	isEnglish?: boolean;
	byEmail?: boolean;
};

export interface SendPass {
	pass: string;
	idBelongState?: object;
	code: string;
};

export interface reSendCode {
	email: string;
	phoneNumber: string;
	name: string;
	idBelongState?: object;
	isEnglish?: boolean;
	byEmail?: boolean;
};

export interface SendCode {
	code: string;
	tempSessionId?: string;
	state: string;
};
export interface SendCode {
	code: string;
	tempSessionId?: string;
	state: string;
};

export interface getTimeCodeExpired {
	email: string;
	state: string;
};
//#UnblockAccount

//#region FORGOT TYPES
export type UserIdentifierDTO = {
	name: string;
	surname: string;
	states: string[]
} & ContactMethodsDTO;

export interface PersonalInfFP {
	email: string;
	dateOfBirth: string;
	mobile: string;
}
export interface ValidateRequestFP {
	email: string;
	dateOfBirth: string;
	mobile: string;
	state: string;
}

export type SendRecoverEmailDTO = {
	id?: string;
	email: string;
};

export type ValidateStates = {
	mobile: string;
	email: string;
	dateOfBirth: string;
};

export type ChangePasswordDTO = {
	idBelongState: any;
	code: string;
	pass: string;
};
//#endregion FORGOT TYPES

//Payment
export interface getInfo {
	autorId: string;
	state?: string;
	token: string;
	service: string;
};


//#region REGISTER TYPES
export type InitialSaveDTO = {
	id: string; // No se envia este id 
	user: {
		id: string; // No esta
		isFBMax: boolean;
		sendByEmail: boolean;
		patientInformation: {
			firstName: string;
			lastName: string;
			dateOfBirth: string;
			sex: string;
			email: string;
			mobile?: string;
			homePhone?: string;
			address1: string;
			address2?: string;
			state: string;
			city: string;
			zipCode: string;
			ssn?: string | null;
		} | { mobile: string; } | undefined;
	};
} & LoginCredentialsDTO;

export type ReSendRecoverEmailInitialSave = {
	email: string;
	mobile: string;
	isFBMax: boolean;
	isEnglish?: boolean;
	state: string;
}

export interface IDBelongState {
	FL?: string;
	TN?: string;
}

export interface TriesToBlock {
	email: string;
	byEmail: boolean;
	state: string;
	code: string;
}

export type InitialSaveByAccountNumberDTO = {
	id: string;
	pass?: string;
	email?: string;
	user: {
		id: string;
		idEcw?: string;
		isFBMax: boolean;
		sendByEmail: boolean;
		patientInformation: {
			dateOfBirth: string;
			email: string;
			mobile?: string;
		};
	};
} & LoginCredentialsDTO;

type InsuranceInformationDTO = {
	insuranceCompany?: string;
	companyId?: string;
	phone_number?: string;
	name_of_insured?: string;
	lastname_of_insured?: string;
	patient_relationship_to_insured?: string;
	subscriber_id?: string;
	group_id?: string;
};

export interface FinalSaveDTO {
	id: string;
	isFBMax: boolean;
	externalPartyId: string;
	signature: string;
	isEnglish: boolean;
	patientInformation: PatientInformation2;
	responsiblePartyInformation: ResponsiblePartyInformation;
	primaryInsuranceInformation: AryInsuranceInformation;
	secondaryInsuranceInformation: AryInsuranceInformation;
	pharmacyInformation: PharmacyInformation;
	healthOptins: HealthOptins;
}

export interface HealthOptins {
    email: boolean;
    phone: boolean;
    messagePush: boolean;
}

export interface PatientInformation2 {
	firstName: string;
	lastName: string;
	email: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
	ssn: string;
	contactMethod: string;
	dateOfBirth: Date | string;
	sex: string;
	mobile: string;
	homePhone?: string;
}

export interface PharmacyInformation {
	pharmacy: string;
	zipcode: string,
	noFavoritePharmacy: boolean
}

export interface AryInsuranceInformation {
	insuranceCompany: string;
	companyId: string;
	nameOfInsured: string;
	lastnameOfInsured: string;
	patientRelationshipToInsured: string;
	subscriberId: string;
	groupId: string;
}

export interface ResponsiblePartyInformation {
	homePhone: string;
	email: string;
	gender: string;
	patientRelationshipLabel: string;
	self: boolean;
	guarantor: boolean;
	ssn: string;
	responsiblePartyFirstName: string;
	responsiblePartyLastName: string;
	relationshipToThePatient: string;
	reasonToHaveAGuarantor: string;
	guarantorDateOfBirth: Date | string;
	mobile: string;
	address: string;
	state: string;
	city: string;
	zipCode: string;
	idFile64: string;
	idFileName: string;
}

/*  */
export type Tempnofbuserviacode = {
	code: string;
	state: string;
	email: string;
}
/*  */

/*  */
export type Gettempusernofb = {
	id: string;
	state: string;
	email: string;
}
/*  */

/*  */
export type Validateviacode = {
	id: string;
	email: string;
}
/*  */

//#endregion

//#region RESEND EMAIL
export type ResendEmailDto = {
	email: string;
	isFBMax: boolean;
	mobile: string;
}

//#endregion RESEND EMAIL

//region GetTempusernofb

export type GetTempusernofbDTO = {
	externalPartyId: string | null;
	mrn: string | null;
	authUid: string;
	role: string | null;
	idEcw: string | null;
	defaultFacility: null;
	id: string;
	idUser: null;
	responsiblePartyInformation: null;
	primaryInsuranceInformation: null;
	secondaryInsuranceInformation: null;
	pharmacyInformation: null;
	healthOptins: null;
	isFBMax: boolean;
	sendByEmail: boolean;
	ecwIdPending: null;
	inclusionDate: number;
	lastActiveInAvaility: null;
	signature: null;
	registrationDate: null;
	otherFolder: boolean;
	isEnglish: null;
} & PatientInformation;

type PatientInformation = {
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	email: string;
	mobile: string;
	sex: string;
	homePhone: string;
	address1: string;
	address2: string;
	city: string;
	state: string;
	zipCode: string;
	ssn: string;
}
//# end region GetTempusernofb


//#region TELEVISITA
export type AvailityCoverage = {
	authUid: string;
	birthDate: string;
	firstName: string;
	isActive: boolean;
	lastName: string;
	memberId: string;
}
//#endregion TELEVISITA

//#region MYINSURANCEAVILITY
export type AvailityCoverageInsurance = {
	authUid: string;
	birthDate: string;
	firstName: string;
	lastName: string;
	memberId: string;
	groupId: string | undefined;
	state: string,
	companyId?: string,
	planType?: string,
	patientId?: string,
	isPrimary?: boolean,
	relationshipId?: number,
	insuranceName?: string,
	insuredLastName?: string,
	insuredFirstName?: string,
	name_of_insuredH: string;
	lastname_of_insuredH: string;
	holderInsured: object;
	dateOfBirthH: Moment | string;
}
//#endregion MYINSURANCEAVILITY

//#region MYINSURANCE
export type UpdateMyInsurace = {
	patientId: number | string,
	relationshipId: number,
	companyId: number,
	insuranceName: string,
	planType: string,
	memberId: string,
	insuredLastName: string,
	insuredFirstName: string,
	subscriberRelationship: string,
	groupId?: string,
	isPrimary: boolean,
	state: string,
	name: string;
	lastName: string;
	dateOfBirth: Moment | string;
	holderInsured: object;
}
//#endregion MYINSURANCE

//#region login process doLoginAllStates
export type DoLoginAllStates = {
	email: string,
	password: string
}
//#endregion login process doLoginAllStates

//#region login process loadUserBySession
export type LoadUserBySession = {
	token: string,
	state: string
}
//#endregion login process loadUserBySession
//#region login process checkAnnualVisitCode
export type CodeState = {
	code: string,
	state: string
}
//#endregion login process checkAnnualVisitCode
//#region login process CheckTermsAndPrivacyVersion
export type CheckTermsAndPrivacyVersion = {
	email: string,
	state: string
}
//#endregion login process CheckTermsAndPrivacyVersion
//#region login process UpdateTermsAndPrivacyVersion
export type UpdateTermsAndPrivacyVersion = {
	versionTerms: boolean,
	versionPrivacy: boolean,
	authId: string
	state: string
}
//#endregion login process UpdateTermsAndPrivacyVersion


//#validate hint params
export type ParametersHint = {
	patientId: string,
	state: string
}
export type ParametersPartialRecord = {
	tempSessionId: string,
	state: string
}

//data to validate if time has expired in the consents section
export type ParamsConsents = {
	state: string | undefined,
	id?: string | undefined,
	isFBMax?: boolean | undefined
}

//Information my insurance
export type InsuranceDto = {
	authUid: string,
	state: string
}

