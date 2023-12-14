import * as Yup from 'yup';
import { UserConfirmCredentials } from 'domain/entities/userConfirmCredentials';
import { REGEX } from '../utils/regex';


export const LoginInfoSchema: Yup.SchemaOf<UserConfirmCredentials> = Yup.object().shape({
	shouldOmitEmail: Yup.boolean()
		.optional(),
	shouldOmitPhone: Yup.boolean()
		.optional(),
	email: Yup.string()
		.default('')
		.when('shouldOmitEmail', {
			is: false,
			then: Yup.string()
				.matches(REGEX.email, 'invalidEmail')
				.required('required')
				.min(5, 'min')
				.max(255, 'max'),
			otherwise: Yup.string().notRequired()
		}),
	phone: Yup.string()
		.default('')
		.when('shouldOmitPhone', {
			is: false,
			then: Yup.string()
				.required('required')
				.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
			otherwise: Yup.string().notRequired()
		}),
	password: Yup.string()
		.required('required')
		.min(8, 'min')
		.max(50, 'max')
		.matches(REGEX.mediumPassword, 'invalidPassword')
		// Using a different schema for now, because we don't have firstName and lastName
		.test('match', 'invalidPassword', function (pass = '', ctx) {
			const v = pass.toLowerCase();

			return !REGEX.repeatedNumbers.test(v) && !REGEX.consecutiveNumbers.test(v);
		}),
	confirmPassword: Yup.string()
		.required('required')
		.oneOf([Yup.ref('password')], 'passwordMatch'),
	terms: Yup.boolean()
		.oneOf([true], 'required')
		.required('required')
});
