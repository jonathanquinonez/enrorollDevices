import * as Yup from 'yup';
import { UserIdentifier } from 'domain/entities/userIdentifier';
import { REGEX } from '../utils/regex';

export type ResetPasswordInfoType = UserIdentifier;
export interface ContactInfoType {
	isPhoneSelected: boolean | undefined;
	isEmailSelected: boolean | undefined;
}

export interface NewPswInfoType {
	password: string;
	confirmPassword: string;
}

export const ResetPasswordInfoSchema: Yup.SchemaOf<ResetPasswordInfoType> = Yup.object().shape({
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
	email: Yup.string()
		.required('required')
		.matches(REGEX.email, 'invalidEmail')
		.min(5, 'min')
		.max(255, 'max'),
	phone: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
});

export const ContactInfoSchema: Yup.SchemaOf<ContactInfoType> = Yup.object().shape({
	isPhoneSelected: Yup.boolean().test('mandatory', 'required', function (val = false, ctx) {
		return true;
	}),
	isEmailSelected: Yup.boolean().test('mandatory', 'required', function (val = false, ctx) {
		if (!ctx.parent.isPhoneSelected) return val;
		else return true;
	}),
});

export const NewPswInfoSchema: Yup.SchemaOf<NewPswInfoType> = Yup.object().shape({
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
		.required('required')
		.oneOf([Yup.ref('password')], 'passwordMatch'),
});

export const DefaultResetPasswordInfo: ResetPasswordInfoType = {
	firstName: '',
	lastName: '',
	email: '',
	phone: '',
};

export const DefaultContactInfo: ContactInfoType = {
	isPhoneSelected: false,
	isEmailSelected: false,
};

export const DefaultNewPswInfo: NewPswInfoType = {
	password: '',
	confirmPassword: '',
};
