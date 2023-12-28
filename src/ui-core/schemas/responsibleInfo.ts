import * as Yup from 'yup';
import { PatientResponsibleInfo } from 'domain/entities/patientResponsibleInfo';
import { REGEX } from '../utils/regex';

type SchemaType = Omit<PatientResponsibleInfo, 'patientRelationshipLabel' | 'guarantorReasonLabel'>;

export const ResponsibleInfoSchema: Yup.SchemaOf<SchemaType> = Yup.object().shape({
	selfGuarantor: Yup.number().required('required').oneOf([1, 2], 'required'),
	guarantorReason: Yup.mixed().test('mandatory', 'required', function (val, ctx) {
		if (ctx.parent.selfGuarantor === 2 && !val) return false;
		else return true;
	}),
	ssn: Yup.string()
		.nullable()
		.notRequired()
		.test('length', 'min', (x = '') => x === null || x === '' || x.length === 11)
		.max(11, 'max'),
	patientRelationship: Yup.mixed().test('mandatory', 'required', function (val, ctx) {
		if (ctx.parent.selfGuarantor === 2 && !val) return false;
		else return true;
	}),
	firstName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	lastName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('required')
		.min(2, 'min')
		.max(50, 'max'),
	guarantorSsn: Yup.string().nullable().notRequired().max(11, 'max'),
	guarantorBirthdate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
	city: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersNumberSpace, 'invalidName'),
	state: Yup.string()
		.required('required')
		.max(2, 'max')
		.matches(REGEX.lettersNumberSpace, 'invalidName'),
	zipCode: Yup.string()
		.required('required')
		.max(12, 'max')
		.min(5, 'min')
		.matches(REGEX.zipcode, 'invalidFormatGeneric'),
	address: Yup.string()
		.required('required')
		.max(120, 'max')
		.matches(REGEX.woSpecialCaracters, 'invalidName'),
	homePhone: Yup.string()
		.notRequired()
		.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
	cellphone: Yup.string()
		.required('required')
		.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
	IDFile: Yup.mixed()
		.test('format', 'invalidFormat', function (val) {
			if (
				!val ||
				(val &&
					(val.type.indexOf('jpg') >= 0 ||
						val.type.indexOf('jpeg') >= 0 ||
						val.type.indexOf('png') >= 0 ||
						val.type.indexOf('heic') >= 0 ||
						val.type.indexOf('pdf') >= 0 ||
						val.type.indexOf('word') >= 0))
			)
				return true;
			else return false;
		})
		.test('size', 'maxMB3', function (val) {
			//B to MB
			if (val && (val.size || 1) / 1048576 > 3) return false;
			else return true;
		}),
});
