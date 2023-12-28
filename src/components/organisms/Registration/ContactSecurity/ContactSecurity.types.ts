import { UserComplementaryInfo } from 'domain/entities/userComplementaryInfo';
import { UserConfirmCredentials } from 'domain/entities/userConfirmCredentials';
import { ValidateAccountDTO } from 'infrastructure/keraltyApi/models/auth';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface ContactSecurityProps
 * @since 1.0.x
 */
export interface ContactSecurityProps {
	/**
	 * variable to know the selected instructions.
	 * @since 1.0.0
	 * @example values={{{ hadSanitas: 0, type: 1 }}}
	 */
	values: {
		hadSanitas: number;
		type: number;
	};
	/**
	 * Method called after pressing continue button.
	 * @since 1.0.0
	 * @example value={() => {}}
	 */
	handleNext: (value: any, num: number) => void;
	/**
	 * Method to clean the form passing the time to update and clean the data
	 * @example resetForm={new Date()}
	 * @since  1.0.0
	 */
	resetForm: Date;
	accountInfo: ValidateAccountDTO;
	elegibilityData: any | undefined;
	openwarning: () => void;
	statusMaintenance?: string;
}

export const ContactSecurityInfo: Yup.SchemaOf<UserComplementaryInfo> = Yup.object().shape({
	address1: Yup.string().required('required').min(2, 'min').max(60, 'max'),
	//.max(11, 'max'),
	address2: Yup.string().min(2, 'min').max(60, 'max').notRequired(),
	//.max(11, 'max'),
	city: Yup.string().min(2, 'min').max(50, 'max').required('required'),
	homePhone: Yup.string()
		.notRequired()
		.matches(REGEX.phone, { message: 'invalidPhone', excludeEmptyString: true }),
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
	terms: Yup.boolean().oneOf([true], 'required').required(),
	policy: Yup.boolean().oneOf([true], 'required').required(),
	pass: Yup.string()
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
		.oneOf([Yup.ref('pass')], 'passwordMatch'),

	emergencyContactName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	emergencyContactLastName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	emergencyContactMobile: Yup.string()
		.required('required')
		.matches(REGEX.phone, 'invalidPhone')
		.min(10, 'invalidPhone')
		.max(5100, 'invalidPhone'),
	emergencyRelationship: Yup.string().required('required'),
	emergencyRelationshipOther: Yup.string().when('emergencyRelationship', {
		is: (emergencyRelationship: number) =>
			emergencyRelationship && emergencyRelationship == 'O',
		then: Yup.string().required('required').min(5, 'min').max(50, 'max'),
	}),
	emergencyContact: Yup.boolean().required(),
});

export const ContactPasswordInfo: Yup.SchemaOf<UserConfirmCredentials> = Yup.object().shape({
	terms: Yup.boolean().oneOf([true], 'required').required(),
	policy: Yup.boolean().oneOf([true], 'required').required(),
	pass: Yup.string()
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
		.oneOf([Yup.ref('pass')], 'passwordMatch'),
});
