import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';
import moment from "moment";
/**
 * @interface FormFSHProps
 * @since 1.0.0
 */
export interface FormFSHProps {
	email: string,
	mobile?: string;	
	date: Date,
	time?: Date,
	comments: string,
	inEnglish?: boolean,
	state?: boolean,
	name?: string,
	idEcw?: string
}

/**
 * @interface Object
 * @since 1.0.0
 */
export interface Object { 
	comments: string,
	date: Date,
	email: string,
	idEcw: string,
	inEnglish: true,
	mobile: string,
	name: string,
	state: string
};

export const FormFHSInfo: Yup.SchemaOf<FormFSHProps> = Yup.object().shape({	
	email: Yup.string().required('required').matches(REGEX.email, 'invalidEmail'),
	mobile: Yup.string().matches(REGEX.phone, 'invalidPhone').required('required'),	
	date: Yup.date().required('required'),//moment().format(FORMATS.date),
	time: Yup.date().required('required'),
	comments: Yup.string().required('required'),
	inEnglish: Yup.boolean(),
	state: Yup.boolean(),
	name: Yup.string(),
	idEcw: Yup.string()
});