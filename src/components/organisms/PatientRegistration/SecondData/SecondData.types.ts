import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
import moment, { Moment } from 'moment';
/** * @interface SecondDataProps * @since 1.0.x */ export interface SecondDataProps {
	handlerNext: () => void;
	setSecondData: React.Dispatch<React.SetStateAction<{}>>;
}
export interface SecondDataList {
	insuranceCompany: string;
	insuranceCompanyTemp: string;
	companyId: number;
	planType: string;
	name_of_insured: string;
	lastname_of_insured: string;
	patient_relationship_to_insured: number;
	subscriber_id: string;
	group_id: string;
	name_of_insuredH: string;
	lastname_of_insuredH: string;
	dateOfBirthH: Moment;
}
export interface SecondDataList2 {
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
	insuranceCompany2: string;
	insuranceCompanyTemp2: string;
	companyId2: number;
	planType2?: string;
	name_of_insured2: string;
	lastname_of_insured2?: string;
	name_of_insuredH2: string;
	lastname_of_insuredH2: string;
	dateOfBirthH2: Moment;
	patient_relationship_to_insured2: number;
	subscriber_id2: string;
	group_id2: string;
}
export const SecondDataInfo: Yup.SchemaOf<SecondDataList> = Yup.object().shape({
	insuranceCompany: Yup.string().required('required'),
	insuranceCompanyTemp: Yup.string().required('required'),
	companyId: Yup.number().required('required'),
	planType: Yup.string(),
	name_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	lastname_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	patient_relationship_to_insured: Yup.number().required('required'),
	subscriber_id: Yup.string().required('required'),
	group_id: Yup.string(),
	name_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	lastname_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	dateOfBirthH: Yup.date().when('patient_relationship_to_insured', {
		is: (value) => value !== 0 && value !== 1,
		then: Yup.date()
			.required('required')
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
		otherwise: Yup.date()
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
	}),
});
export const SecondDataInfo2: Yup.SchemaOf<SecondDataList2> = Yup.object().shape({
	insuranceCompany: Yup.string().required('required'),
	insuranceCompanyTemp: Yup.string().required('required'),
	companyId: Yup.number().required('required'),
	planType: Yup.string(),
	name_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	lastname_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	patient_relationship_to_insured: Yup.number().required('required'),
	name_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	lastname_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	dateOfBirthH: Yup.date().when('patient_relationship_to_insured', {
		is: (value) => value !== 0 && value !== 1,
		then: Yup.date()
			.required('required')
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
		otherwise: Yup.date()
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
	}),
	subscriber_id: Yup.string().required('required'),
	group_id: Yup.string(),
	insuranceCompany2: Yup.string().required('required'),
	insuranceCompanyTemp2: Yup.string().required('required'),
	companyId2: Yup.number().required('required'),
	planType2: Yup.string(),
	name_of_insured2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	lastname_of_insured2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	patient_relationship_to_insured2: Yup.number().required('required'),
	name_of_insuredH2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured2', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	lastname_of_insuredH2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured2', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(50, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	dateOfBirthH2: Yup.date().when('patient_relationship_to_insured2', {
		is: (value) => value !== 0 && value !== 1,
		then: Yup.date()
			.required('required')
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
		otherwise: Yup.date()
			.max(moment(), 'invalidBirthdate')
			.nullable()
			.transform((curr, orig) => (orig === '' ? null : curr)),
	}),
	subscriber_id2: Yup.string().required('required'),
	group_id2: Yup.string(),
});
