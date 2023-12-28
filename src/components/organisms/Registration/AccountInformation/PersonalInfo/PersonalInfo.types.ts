import { CreateUser } from 'domain/entities/createUser';
import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/**
 * @interface PersonalInfoProps
 * @since 1.0.0
 */
export interface PersonalInfoProps {
	control: Control<CreateUser, any>;
	getValues: any;
	clearTemp: boolean;
	setValue: UseFormSetValue<CreateUser>;
	errors: FieldErrorsImpl<{
		firstName: string;
		lastName: string;
		mobile: string;
		email: string;
		dateOfBirth: Date;
		sex: string;
		state: string;

		genderIdentity: string;
		genderIdentityOther: string;
		sexualOrientiation: string;
		sexualOrientiationOther: string;
		etnicity: string;
		race: string;
		raceOther: string;
		languagePreference: string;
		languagePreferenceOther: string;
		maritalStatus: string;
		maritalStatusOther: string;
		employmentStatus: string;
		employerName: string,
    workPhone: string,
	}>;
	elegibilityData?: any | undefined;
	}

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

export const listGender = () => {
	const { t } = useTranslation();

	return [
		{ key: 1, label: t('sex.F'), value: 'F' },
		{ key: 2, label: t('sex.M'), value: 'M' },
		{ key: 3, label: t('sex.D'), value: 'U' },
	]
}