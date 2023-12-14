import * as Yup from 'yup';
import { videoCallRegistry } from 'domain/entities/videoCallRegistry';
import { REGEX } from 'src/utils/regex';

/**
 * @interface VideoCallRegistryProps
 * @since 1.0.0
 */
export interface VideoCallRegistryProps {}

export const ValidationRegistry: Yup.SchemaOf<videoCallRegistry> = Yup.object().shape({
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
	birthDate: Yup.date()
		.nullable()
		.transform((curr, orig) => (orig === '' || orig.length < 10 ? null : curr))
		.required('required')
		.max(new Date(), 'invalidBirthdate')
		.typeError('invalidBirthdate'),
	memberId: Yup.string().required('required'),
	state: Yup.string(),
	companyId: Yup.number().required('required'),
	insuranceName: Yup.string().required('required'),
});
