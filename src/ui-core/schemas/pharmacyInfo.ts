import * as Yup from 'yup';
import { PatientPharmacyInfo } from 'domain/entities/patientPharmacyInfo';
import { REGEX } from '../utils/regex';


export const PharmacyInfoSchema: Yup.SchemaOf<PatientPharmacyInfo & { omitHealthcare?: boolean }> = Yup.object().shape({
	pharmacyName: Yup.string()
		.required('required')
		.max(120, 'max')
		.matches(REGEX.lettersNumberSpace, 'invalidName'),
	isAuthSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isDisclosureSelected: Yup.boolean()
		.oneOf([true, false]),
	omitHealthcare: Yup.boolean(),
	isEmailIncluded: Yup.number()
		.nullable()
		.oneOf([1, 2], 'required')
		// .default('true')
		.required('required')
		.when('omitHealthcare', (omitHealthcare, schema) => {
			if (!omitHealthcare)
				return schema.required('required').oneOf([1, 2], 'required')
		}),
	isPhoneNumberIncluded: Yup.number()
		// .default('true')
		.nullable()
		.oneOf([1, 2], 'required')
		.required('required')
		.when('omitHealthcare', (omitHealthcare, schema) => {
			if (!omitHealthcare)
				return schema.required('required').oneOf([1, 2], 'required')
		}),
	users: Yup.array().of(
		Yup.object().shape({
			name: Yup.string()
				.required('required')
				.max(50, 'max')
				.matches(REGEX.lettersChars, 'invalidName'),
			rel: Yup.string()
				.required('required')
				.max(50, 'max')
				.matches(REGEX.lettersChars, 'invalidFormat'),
			phone: Yup.string()
				.required('required')
				.matches(REGEX.phone, 'invalidPhone')
		})
	).notRequired()
});
