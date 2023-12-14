import { CreateUser } from 'domain/entities/createUser';
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';

/**
 * @interface AccountInformationProps
 * @since 1.0.x
 */
export interface AccountInformationProps {
	/**
	 * bottom object.
	 * @since  1.0.0
	 * @example value={1}
	 */
	optionNumber: number;
	/**
	 * Method called after pressing continue button.
	 * @since 1.0.0
	 * @example value={() => {}}
	 */
	handleNext: (values: any, num: number) => void;
	setElegibilityData: (data: any) => void;
	/**
	 * Method to clean the form passing the time to update and clean the data
	 * @example resetForm={new Date()}
	 * @since  1.0.0
	 */
	resetForm: Date;
	setAccountInfo: React.Dispatch<
		React.SetStateAction<{
			accountNumber: string;
			dateOfBirth: string;
			isFBMax: boolean;
			id: string;
		}>
	>;
	receiveService: number;
	actionResetForm: () => Promise<void>;
	openwarning: () => void;
	statusMaintenance?: string;
	elegibilityData?: any | undefined;
}

export const UserInf: Yup.SchemaOf<CreateUser> = Yup.object().shape({
	genderIdentityLabel: Yup.string(),
	sexualOrientiationLabel: Yup.string(),
	etnicityLabel: Yup.string(),
	raceLabel: Yup.string(),
	languagePreferenceLabel: Yup.string(),

	firstName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	lastName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	email: Yup.string().lowercase().required('required').matches(REGEX.email, 'invalidEmail'),
	mobile: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
	dateOfBirth: Yup.date().required('required').max(new Date(), 'invalidBirthdate'),
	sex: Yup.string().required('required'),
	state: Yup.string().required('required'),

	genderIdentity: Yup.string().required('required'),
	genderIdentityOther: Yup.string().when('genderIdentity', {
		is: (genderIdentity: string) => genderIdentity && genderIdentity.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min')
		.max(50, 'max'),
	}),
	sexualOrientiation: Yup.string().required('required'),
	sexualOrientiationOther: Yup.string().when('sexualOrientiation', {
		is: (sexualOrientiation: string) => sexualOrientiation && sexualOrientiation.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min')
		.max(50, 'max'),
	}),
	etnicity: Yup.string().required('required'),
	race: Yup.string().required('required'),
	raceOther: Yup.string().when('race', {
		is: (race: string) => race && race.trim() == 'O',
		then: Yup.string().required('required').min(5, 'min')
		.max(50, 'max'),
	}),
	languagePreference: Yup.string().required('required'),
	languagePreferenceOther: Yup.string().when('languagePreference', {
		is: (languagePreference: string) => languagePreference && languagePreference.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min')
		.max(50, 'max'),
	}),
	maritalStatus: Yup.string().required('required'),
	maritalStatusOther: Yup.string().when('maritalStatus', {
		is: (maritalStatus: string) => maritalStatus && maritalStatus.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min')
		.max(50, 'max'),
	}),
	employmentStatus: Yup.string().required('required'),
	employerName: Yup.string().matches(REGEX.lettersChars, 'invalidName').max(60, 'max'),
	workPhone: Yup.string().when([], {
		is: (workPhone: string) => workPhone && workPhone.trim() !== '',
		then: Yup.string().matches(REGEX.phone, 'invalidPhone'),
	}),
});
