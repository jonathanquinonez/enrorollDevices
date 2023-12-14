import { ContactSecurityCredentials } from 'domain/entities/ContactSecurityCredentials';
import { ValidateAccountDTO } from 'infrastructure/keraltyApi/models/auth';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';
/**
 * @interface ContactAndSecurityProps
 * @since 1.0.0
 */
export interface ContactAndSecurityProps {
    /**
   	* Method to clean the form passing the time to update and clean the data
   	* @example resetForm={new Date()}
   	* @since  1.0.0
   	*/
	resetForm: Date;
    handleNext: (value: any, num: number) => void;
    accountInfo: ValidateAccountDTO
}


export const ContactSecurityInfo: Yup.SchemaOf<ContactSecurityCredentials> = Yup.object().shape({
    email: Yup.string()
    .required('required')
    .min(5, 'min')
    .max(255, 'max')
    .matches(REGEX.email, 'invalidEmail'),
    mobile: Yup.string()
        .required('required')
        .matches(REGEX.phone, 'invalidPhone'),
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
    terms: Yup.boolean()
        .oneOf([true], 'required')
        .required(),
    policy: Yup.boolean()
        .oneOf([true], 'required')
        .required(),
});
