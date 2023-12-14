import { CreateUser } from 'domain/entities/createUser';
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';
import { useTranslation } from 'react-i18next';
/**
 * @interface EditAccountProps
 * @since 1.0.0
 */
export interface EditAccountProps {
	genderIdentityOther?: string;
	maritalStatus?: string | undefined;
	homePhone?: string | undefined;
	mobile?: string;
	address?: string;
	zipCode?: string;
	city?: string;
	genderIdentity?: string;
	sex?: string;
	sexualOrientiation?: string;
	sexualOrientiationOther?: string;
	etnicity?: string;
	race?: string;
	raceOther?: string;
	languagePreference?: string;
	languagePreferenceOther?: string;
	employmentStatus?: string;
	genderIdentityLabel?: string;
	sexualOrientiationLabel?: string;
	etnicityLabel?: string;
	raceLabel?: string;
	languagePreferenceLabel?: string;
	employmentStatusLabel?: string;
	state: string;
}

export const listGender = () => {
	const { t } = useTranslation();

	return [
		{ key: 1, label: t('sex.F'), value: 'F' },
		{ key: 2, label: t('sex.M'), value: 'M' },
		{ key: 3, label: t('sex.D'), value: 'U' },
	]
}

export const EditAccountInf: Yup.SchemaOf<EditAccountProps> = Yup.object().shape({
	genderIdentityLabel: Yup.string(),
	sexualOrientiationLabel: Yup.string(),
	etnicityLabel: Yup.string(),
	raceLabel: Yup.string(),
	languagePreferenceLabel: Yup.string(),
	employmentStatusLabel: Yup.string(),
	employmentStatus: Yup.string().required('required'),
	languagePreference: Yup.string().required('required'),
	languagePreferenceOther: Yup.string().when('languagePreference', {
		is: (languagePreference: string) => languagePreference && languagePreference.trim() === 'O',
		then: Yup.string().required('required'),
	}),
	race: Yup.string().required('required'),
	raceOther: Yup.string().when('race', {
		is: (race: string) => race && race.trim() == 'O',
		then: Yup.string().required('required').min(5, 'min').max(50, 'max'),
	}),
	maritalStatus: Yup.string().notRequired(),
	etnicity: Yup.string().required('required'),
	sex: Yup.string().required('required'),
	homePhone: Yup.string().notRequired().matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
	mobile: Yup.string().matches(REGEX.phone, 'invalidPhone').required('required'),
	address: Yup.string().min(3, 'min').max(120, 'max').required('required'),
	zipCode: Yup.string()
		.max(12, 'max')
		.min(5, 'min')
		.matches(REGEX.zipcode, 'invalidFormatGeneric').required('required'),
	city: Yup.string().max(50, 'max').required('required'),
	state: Yup.string().required('required'),
	genderIdentity: Yup.string().required('required'),
	genderIdentityOther: Yup.string().when('genderIdentity', {
		is: (genderIdentity: string) => genderIdentity && genderIdentity.trim() === 'O',
		then: Yup.string().required('required'),
	}),
	sexualOrientiation: Yup.string().required('required'),
	sexualOrientiationOther: Yup.string().when('sexualOrientiation', {
		is: (sexualOrientiation: string) => sexualOrientiation && sexualOrientiation.trim() === 'O',
		then: Yup.string().required('required').min(5, 'min').max(50, 'max'),
	}),
});

type GenderMapping = {
	[key: string]: string;
};

export const mapsListGender = (value: string): string => {
	const mapeo: GenderMapping = {
		'male': 'M',
		'M': 'M',
		'female': 'F',
		'F': 'F',
		'unknown': 'U',
		'U': 'U',
	};

	return mapeo[value] || '';
};
