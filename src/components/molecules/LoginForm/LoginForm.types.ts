import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
/**
 * @interface LoginFormProps
 * @since 1.0.0
 */
export interface LoginFormProps {
	 onSubmit: (values: SubmitCredentials) => void;
	 boobleState: (state: boolean) => void
	 autoFocus: boolean
}

export interface LoginCredentials {
	email: string;
	password: string;
};

export interface SubmitCredentials{
	credentials: LoginCredentials | undefined,
	type: string
}


//Form Schema

export const LoginSchema: Yup.SchemaOf<LoginCredentials> = Yup.object().shape({
	email: Yup.string()
		//.required('required')
		//.min(5, 'min')
		.max(255, 'max'),
		//.matches(REGEX.email, 'invalidEmail'),
	password: Yup.string()
		//.required('required')
	//	.min(8, 'min')
		.max(50, 'max')
});


export const DefaultLogin: LoginCredentials = {
	email: '',
	password: ''
};
