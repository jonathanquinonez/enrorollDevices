import * as Yup from 'yup';
import { UserBasicInfo } from 'domain/entities/userBasicInfo';
import { UserComplementaryInfo } from 'domain/entities/userComplementaryInfo';
import { REGEX } from '../utils/regex';

export const BasicPersonalInfoSchema: Yup.SchemaOf<UserBasicInfo> = Yup.object().shape({
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
	birthdate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
	gender: Yup.string().required('required'),
	state: Yup.string()
		.required('required')
		.max(2, 'max')
		.matches(REGEX.lettersNumberSpace, 'invalidName'),
	email: Yup.string()
		.required('required')
		.min(5, 'min')
		.max(255, 'max')
		.matches(REGEX.email, 'invalidEmail'),
	cellphone: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
});

export const ComplementaryPersonalInfoSchema: Yup.SchemaOf<UserComplementaryInfo> =
	Yup.object().shape({
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
		homePhone: Yup.string()
			.notRequired()
			.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
		address1: Yup.string()
			.required('required')
			.max(120, 'max')
			.matches(REGEX.woSpecialCaracters, 'invalidName'),
		address2: Yup.string()
			.notRequired()
			.max(120, 'max')
			.matches(REGEX.woSpecialCaracters, 'invalidName'),
		city: Yup.string()
			.required('required')
			.min(2, 'min')
			.max(50, 'max')
			.matches(REGEX.lettersNumberSpace, 'invalidName'),
		zipCode: Yup.string()
			.required('required')
			.max(12, 'max')
			.min(5, 'min')
			.matches(REGEX.zipcode, 'invalidFormatGeneric'),
		ssn: Yup.string()
			.nullable()
			.notRequired()
			.test('length', 'min', (x = '') => x === null || x === '' || x.length === 11)
			.max(11, 'max'),
		password: Yup.string()
			.required('required')
			.min(8, 'min')
			.max(50, 'max')
			.matches(REGEX.mediumPassword, 'invalidPassword')
			.test('match', 'invalidPassword', function (pass = '', ctx) {
				const v = pass.toLowerCase();
				const fn = ctx.parent?.firstName?.toLowerCase();
				const ln = ctx.parent?.lastName?.toLowerCase();

				return (
					(!fn || v.indexOf(fn) < 0) &&
					(!ln || v.indexOf(ln) < 0) &&
					!REGEX.repeatedNumbers.test(v) &&
					!REGEX.consecutiveNumbers.test(v)
				);
			}),
		confirmPassword: Yup.string()
			.required('passwordMatch')
			.oneOf([Yup.ref('password')], 'passwordMatch'),
		terms: Yup.boolean().oneOf([true], 'required').required(),
	});
