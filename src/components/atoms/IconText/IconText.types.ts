import { ReactElement } from 'react';
import { StyleProp, TextStyle } from 'react-native';

/**
 * @interface IconTextProps
 * @since 1.0.x
 */
export interface IconTextProps {
	/**
	 * Title
	 * @since  1.0.0
	 * @example property='Personal information'
	 */
	sectionTitle: string;
	/**
	 * Icon, SVG or Image
	 * @since  1.0.0
	 */
	sectionIcon: ReactElement;
	/**
	 * Custom text styles
	 * @since 1.0.0
	 * @example textStyle={{fontFamily: "bold"}}
	 */
	textStyle?: StyleProp<TextStyle>;
}