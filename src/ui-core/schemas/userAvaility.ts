import * as Yup from 'yup';
import { REGEX } from '../utils/regex';
import { UserAvailityForm } from 'domain/entities/userAvaility';

export const UserAvailitySchema: Yup.SchemaOf<UserAvailityForm> = Yup.object().shape({
	firstName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('min')
		.min(2, 'min')
		.max(50, 'max'),
	lastName: Yup.string()
		.matches(REGEX.lettersChars, 'invalidName')
		.required('min')
		.min(2, 'min')
		.max(50, 'max'),
	memberId: Yup.string().required('min').max(50, 'max'),
	birthDate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
});
