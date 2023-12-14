import { ReactElement } from 'react';
import { AccessibilityRole, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface HeaderProps
 * @since 1.0.0
 */
export interface HeaderProps {
	/**
	 * Property that receives the dimensions of the row.
	 * @since 1.0.0
	 * @example width={2}
	 */
	width?: number;
	/**
	 * back button.
	 * @since 1.0.0
	 * @example btnGoBack={true}
	 */
	btnGoBack?: boolean;
	/**
	 * property to display the logo with the keralty text or without it.
	 * @since 1.0.0
	 * @example logoWithoutText={true}
	 */
	logoWithoutText?: boolean;
	/**
	 * property to show or hide the division line of the header.
	 * @since 1.0.0
	 * @example showLine={true}
	 */
	showLine?: boolean;
	/**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPressLeft={() => handlePress()}
	 */
	onPressLeft?: () => void;
	/**
	 * Icon to show
	 * @since  1.0.0
	 * @example icon={<Icon/>}
	 */
	iconLeft?: ReactElement;
	/**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPressLeft={() => handlePress()}
	 */
	onPressRight?: () => void;
	/**
	 * Icon to show
	 * @since  1.0.0
	 * @example icon={<Icon/>}
	 */
	iconRight?: ReactElement;
	/**
	* Styles for the button.
	* @since 1.0.0
	* @example style={{borderColor: "#ffdd34"}}
	*/
	style?: StyleProp<ViewStyle>;
	/**
	 * iconButton style variant, default to small
	 * @since 1.0.0
	 * @example iconVariant="Small"
	 */
	iconVariant?: 'Small' | 'Float' | 'Header' | 'RadianceBlue' | 'RadianceGreen';
	accessibilityHint2?: string;
	accessibilityLabel2?: string;
	accessibilityRole?: AccessibilityRole;
	accesibilityHint?: string;
	accessibilityRole2?: AccessibilityRole;
	accesibilityLabel?: string;
}
