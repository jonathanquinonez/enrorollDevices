import * as Yup from 'yup';
import { REGEX } from '../utils/regex';
import { PatientFinancialInfo } from 'domain/entities/patientFinancialInfo';


export const FinancialInfoSchema: Yup.SchemaOf<PatientFinancialInfo> = Yup.object().shape({
	isFeeSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isCopaySelected: Yup.boolean()
		.oneOf([true], 'required'),
	isIncorrectDataSelected: Yup.boolean()
		.oneOf([true], 'required'),
	isMedicareSelected: Yup.boolean()
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
		.typeError('invalidDate'),
});
