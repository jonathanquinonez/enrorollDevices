import * as Yup from 'yup';
import { REGEX } from '../utils/regex';
import { PatientHipaaInfo } from 'domain/entities/patientHipaaInfo';


export const HipaaInfoSchema: Yup.SchemaOf<PatientHipaaInfo> = Yup.object().shape({
	name: Yup.string()
		.required('required')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	birthdate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
	isNoticeSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isReleaseSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isMedStudentSelected: Yup.boolean()
		.oneOf([true], 'required'),
	signature: Yup.string()
		.required('invalidName')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	date: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.max(new Date(), 'invalidBirthdate')
		.required('required')
		.typeError('invalidBirthdate'),
});
