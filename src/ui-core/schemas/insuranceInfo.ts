import * as Yup from 'yup';
import { REGEX } from '../utils/regex';
import { PatientInsuranceInfo } from 'domain/entities/patientInsuranceInfo';
import moment, { Moment } from 'moment';
/** * @interface SecondDataProps * @since 1.0.x */
export interface SecondDataProps {
	handlerNext: () => void;
	setSecondData: React.Dispatch<React.SetStateAction<{}>>;
}

export const InsuranceInfoSchema: Yup.SchemaOf<PatientInsuranceInfo> = Yup.object().shape({
	insuranceCompany: Yup.string().required('required'),
	insuranceCompanyTemp: Yup.string().required('required'),
	companyId: Yup.number().required('required'),
	planType: Yup.string(),
	name_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.matches(REGEX.spaces, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(60, 'max'),
	lastname_of_insured: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.matches(REGEX.spaces, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(60, 'max'),
	patient_relationship_to_insured: Yup.number().required('required'),
	name_of_insuredH: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.when('patient_relationship_to_insured', {
			is: (value) => value !== 0 && value !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(60, 'max'),
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
				.max(60, 'max'),
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
	subscriber_id: Yup.string().required('required')
		.matches(REGEX.spaces, 'invalidFormat'),
	group_id: Yup.string(),
	is2ndInsurance: Yup.boolean(),
	insuranceCompany2: Yup.string()
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.string().required('required'),
		}),
	insuranceCompanyTemp2: Yup.string()
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.string().required('required'),
		}),
	companyId2: Yup.number()
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.number().required('required'),
		}),
	planType2: Yup.string().notRequired(),
	name_of_insured2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(60, 'max'),
		}),
	lastname_of_insured2: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(60, 'max'),
		}),
	patient_relationship_to_insured2: Yup.number()
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.number().required('required'),
		}),
	name_of_insuredH2: Yup.string()
		.notRequired()
		.matches(REGEX.lettersChars, 'invalidName')
		.when(['patient_relationship_to_insured2', 'is2ndInsurance'], {
			is: (patient_relationship_to_insured2: number, is2ndInsurance: boolean) =>
				is2ndInsurance === true &&
				patient_relationship_to_insured2 !== 0 &&
				patient_relationship_to_insured2 !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(60, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	lastname_of_insuredH2: Yup.string()
		.notRequired()
		.matches(REGEX.lettersChars, 'invalidName')
		.when(['patient_relationship_to_insured2', 'is2ndInsurance'], {
			is: (patient_relationship_to_insured2: number, is2ndInsurance: boolean) =>
				is2ndInsurance === true &&
				patient_relationship_to_insured2 !== 0 &&
				patient_relationship_to_insured2 !== 1,
			then: Yup.string()
				.matches(REGEX.lettersChars, 'invalidName')
				.required('required')
				.min(2, 'min')
				.max(60, 'max'),
			otherwise: Yup.string().matches(REGEX.lettersChars, 'invalidName'),
		}),
	dateOfBirthH2: Yup.date()
		.notRequired()
		.when(['patient_relationship_to_insured2', 'is2ndInsurance'], {
			is: (patient_relationship_to_insured2: number, is2ndInsurance: boolean) =>
				is2ndInsurance === true &&
				patient_relationship_to_insured2 !== 0 &&
				patient_relationship_to_insured2 !== 1,
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
	subscriber_id2: Yup.string()
		.notRequired()
		.when('is2ndInsurance', {
			is: true,
			then: Yup.string().required('required'),
		}),
	group_id2: Yup.string(),
});
