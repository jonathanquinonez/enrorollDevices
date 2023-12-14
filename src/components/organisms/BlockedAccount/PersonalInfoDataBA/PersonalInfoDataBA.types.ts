import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';
import * as Yup from 'yup';
import { REGEX } from 'src/utils/regex';

/**
 * @interface PersonalInfoDataBAProps
 * @since 1.0.0
 */
export interface PersonalInfoDataBAProps {
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
	handlerNext: any;
	navigateSupportChat: any;
	emailValid?: boolean;
}

export interface PersonalInfoData {
	firstName: string;
	lastName: string;
	mobile: string;
	email: string;
}

export const PersonalInfo: Yup.SchemaOf<PersonalInfoData> = Yup.object().shape({
	firstName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	lastName: Yup.string()
		.required('required')
		.min(2, 'min')
		.max(50, 'max')
		.matches(REGEX.lettersChars, 'invalidName'),
	email: Yup.string().required('required').matches(REGEX.email, 'invalidEmail'),
	mobile: Yup.string().required('required').matches(REGEX.phone, 'invalidPhone'),
});
