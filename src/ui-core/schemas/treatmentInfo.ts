import * as Yup from 'yup';
import { PatientTreatmentInfo } from 'domain/entities/patientTreatmentInfo';
import { REGEX } from '../utils/regex';


export const TreatmentInfoSchema: Yup.SchemaOf<PatientTreatmentInfo> = Yup.object().shape({
	isSanitasPatient: Yup.boolean()
		.oneOf([true], 'required'),
	isServiceSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isResultsSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isAcknowledgeSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isConsentSelected: Yup.boolean()
		.oneOf([true], 'required'),
	signature: Yup.string()
		.required('invalidName')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	date: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
});
