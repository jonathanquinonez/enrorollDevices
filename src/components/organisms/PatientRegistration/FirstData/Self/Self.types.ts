import { TempFormUser } from 'domain/entities/tempFormUser';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface SelfProps
 * @since 1.0.x
 */
export interface SelfProps {
	handlerNext: () => void;
	setFirstData: (values: any) => void;
	getListOfPharmacies: (values: string) => void;
	listOfPharmacies: any[];
	selfValue: boolean;
}

export interface SelfList {
	firstName: string;
	lastName: string;
	email: string;
	mobile: string;
	sex: string;
	address: string;
	address2?: string;
	city: string;
	state: string;
	zipCode: string;
	ssn?: string | null;
	dateOfBirth: Date | string;
	pharmacy: string;
	auth: boolean;
	idFile64?: string;
	idFileName?: string;
	IDFile?: string;
	pharmaCondition?: boolean;
	pharmacyZip?: string;

	genderIdentity?: string;
	genderIdentityLabel?: string;
	genderIdentityOther?: string;
	sexualOrientiation?: string;
	sexualOrientiationLabel?: string;
	sexualOrientiationOther?: string;
	etnicity?: string;
	etnicityLabel?: string;
	race?: string;
	raceLabel?: string;
	raceOther: string;
	languagePreference?: string;
	languagePreferenceLabel?: string;
	languagePreferenceOther: string;
	maritalStatus?: string;
	employmentStatus?: string;
	employmentStatusLabel?: string;
	employmentStatusOther?: string;
	employerName?: string;
	workPhone?: string;
	emergencyContactName?: string;
	emergencyContactLastName?: string;
	emergencyContactMobile?: string;
	emergencyRelationship?: string;
	emergencyContact?: boolean;
	emergencyRelationshipOther?: string;
	acceptedFriend?: boolean;
	nameFriendOne?: string;
	relationShipFriendOne?: string;
	numberFriendOne?: string;
	nameFriendTwo?: string;
	relationShipFriendTwo?: string;
	numberFriendTwo?: string;
	doYouHave?: string;
	legalGuardianName?: string;
	legalGuardianContacPhone?: string;
}

export const SelfYup: Yup.SchemaOf<SelfList> = Yup.object().shape({
	firstName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(60, 'max'),
	lastName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required()
		.min(2, 'min')
		.max(60, 'max'),
	dateOfBirth: Yup.string().required('required'),
	email: Yup.string().required('required').matches(REGEX.email, 'invalidEmail'),
	mobile: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
	sex: Yup.string().required('required'),
	auth: Yup.boolean().required('required'),
	address: Yup.string().required('required').max(60, 'max'),
	pharmaCondition: Yup.boolean(),
	pharmacy: Yup.string().when('auth', {
		is: true,
		then: Yup.string().required('required'),
		otherwise: Yup.string(),
	}),
	pharmacyZip: Yup.string().when('auth', {
		is: true,
		then: Yup.string().required('required'),
		otherwise: Yup.string(),
	}),
	address2: Yup.string().notRequired().max(50, 'max'),
	city: Yup.string().min(1, 'min').max(40, 'max').required('required'),
	state: Yup.string().required('required'),
	zipCode: Yup.string()
		.required('required')
		.max(12, 'max')
		.min(5, 'min')
		.matches(REGEX.zipcode, 'invalidFormatGeneric'),
	ssn: Yup.string()
		.nullable()
		.notRequired()
		.test('length', 'min', (x = '') => x === null || x === '' || x.length === 11)
		.max(11, 'max'),
	idFile64: Yup.string().notRequired(),
	idFileName: Yup.string().notRequired(),
	IDFile: Yup.string().notRequired(),

	genderIdentity: Yup.string().required('required'),
	genderIdentityLabel: Yup.string(),
	genderIdentityOther: Yup.string().when('genderIdentity', {
		is: (genderIdentity: string) => genderIdentity && genderIdentity.trim() === 'O',
		then: Yup.string().required('required'),
	}),
	sexualOrientiation: Yup.string().required('required'),
	sexualOrientiationLabel: Yup.string(),
	sexualOrientiationOther: Yup.string().when('sexualOrientiation', {
		is: (sexualOrientiation: string) => sexualOrientiation && sexualOrientiation.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min').max(50, 'max'),
	}),
	etnicity: Yup.string().required('required'),
	etnicityLabel: Yup.string(),
	race: Yup.string().required('required'),
	raceLabel: Yup.string(),
	raceOther: Yup.string().when('race', {
		is: (race: string) => race && race.trim() == 'O',
		then: Yup.string().required('required').min(5, 'min').max(50, 'max'),
	}),
	languagePreference: Yup.string().required('required'),
	languagePreferenceLabel: Yup.string(),
	languagePreferenceOther: Yup.string().when('languagePreference', {
		is: (languagePreference: string) => languagePreference && languagePreference.trim() === 'O',
		then: Yup.string().required('required'),
	}),
	maritalStatus: Yup.string().required('required'),
	employmentStatus: Yup.string().required('required'),
	employmentStatusLabel: Yup.string(),
	employmentStatusOther: Yup.string().when('employmentStatus', {
		is: (employmentStatus: string) => employmentStatus && employmentStatus.trim() === 'O',
		then: Yup.string().required('required'),
	}),
	employerName: Yup.string().notRequired().max(60, 'max'),
	workPhone: Yup.string()
    .notRequired()
    .nullable()
    .test('is-valid-phone', 'invalidPhone', function(value) {
		// Esta función se ejecuta solo si workPhone tiene algún valor
		if (value && value.trim().length > 0) {
		  return REGEX.phone.test(value);
		}
		return true; // Si workPhone está vacío, se considera válido
	  }),
	emergencyContactName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(60, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	emergencyContactLastName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(60, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	emergencyContactMobile: Yup.string().when('emergencyContactLastName', {
			is: (emergencyContactLastName: string) =>
				emergencyContactLastName && emergencyContactLastName.trim() !== '',
			then: Yup.string()
			.required('required')
			.matches(REGEX.phone, 'invalidPhone'),
	  }),
	emergencyRelationshipOther: Yup.string().when('emergencyRelationship', {
		is: (emergencyRelationship: string) =>
			emergencyRelationship === 'O' || emergencyRelationship === 'NaN',
		then: Yup.string()
			.required('required')
			.matches(REGEX.lettersChars, 'invalidName')
			.min(5, 'min')
			.max(50, 'max'),
	}),
	emergencyRelationship: Yup.string().required('required'),
	emergencyContact: Yup.boolean().required(),
	acceptedFriend: Yup.boolean(),
	nameFriendOne: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.min(2, 'min')
		.max(60, 'max'),
	relationShipFriendOne: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.min(2, 'min')
		.max(60, 'max'),
	numberFriendOne: Yup.string().when([], {
		is: (numberFriendOne: string) => numberFriendOne && numberFriendOne.trim() !== '',
		then: Yup.string()
			.matches(REGEX.phone, 'invalidPhone')
			.min(10, 'invalidPhone')
			.max(10, 'invalidPhone'),
	}),
	nameFriendTwo: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.min(2, 'min')
		.max(60, 'max'),
	relationShipFriendTwo: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.min(2, 'min')
		.max(60, 'max'),
	numberFriendTwo: Yup.string().when([], {
		is: (numberFriendTwo: string) => numberFriendTwo && numberFriendTwo.trim() !== '',
		then: Yup.string()
			.matches(REGEX.phone, 'invalidPhone')
			.min(10, 'invalidPhone')
			.max(10, 'invalidPhone'),
	}),
	doYouHave: Yup.string(),
	legalGuardianName: Yup.string().matches(REGEX.lettersChars, 'invalidName').max(60, 'max'),
	legalGuardianContacPhone: Yup.string().when([], {
		is: (legalGuardianContacPhone: string) =>
			legalGuardianContacPhone && legalGuardianContacPhone.trim() !== '',
		then: Yup.string()
			.matches(REGEX.phone, 'invalidPhone')
			.min(10, 'invalidPhone')
			.max(10, 'invalidPhone'),
	}),
});
