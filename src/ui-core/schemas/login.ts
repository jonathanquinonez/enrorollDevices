import { LoginCredentials } from 'domain/entities/loginCredentials';
import * as Yup from 'yup';
import { REGEX } from '../utils/regex';


export const LoginSchema: Yup.SchemaOf<LoginCredentials> = Yup.object().shape({
	email: Yup.string()
		.required('required')
		.min(5, 'min')
		.max(255, 'max')
		.matches(REGEX.email, 'invalidEmail'),
	password: Yup.string()
		.required('required')
		.min(8, 'min')
		.max(50, 'max')
});

export const DefaultLogin: LoginCredentials = {
	email: '',
	password: ''
};
