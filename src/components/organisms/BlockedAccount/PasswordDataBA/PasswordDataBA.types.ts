import { StyleProp, ViewStyle } from 'react-native';
import { REGEX } from 'src/utils/regex';
import * as Yup from 'yup';

/**
 * @interface PasswordDataBAProps
 * @since 1.0.0
 */
export interface PasswordDataBAProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  /**
  * This button is executed when a page change is made
  * @since  1.0.0
  * @example handlerNext={handlerNext}
  */
  handlerNext: (v: any) => any;
  navigateSupportChat: any;
  formValues: any;
  valueCode: (v: any) => any
}

export interface PasswordData {
  pass: string;
  confirmPassword: string;
}


export const PasswordInfo: Yup.SchemaOf<PasswordData> = Yup.object().shape({
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
