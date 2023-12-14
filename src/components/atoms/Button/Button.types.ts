import { ReactElement } from 'react';
import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle, AccessibilityRole } from 'react-native';

/**
 * @interface ButtonProps
 * @since 1.0.0
 */
export interface ButtonProps {
	/**
	 * Text to show in the button.
	 * @since  1.0.0
	 * @example text='Continue'
	 */
	title: string;
	/**
	 * Text to show in the button.
	 * @since  1.0.0
	 * @example text='header'
	 */
	accesibilityLabel?: string;
	numberOfLines?: number;
	accessibilityRole?: AccessibilityRole;
	/**
	 * Text to show in the button.
	 * @since  1.0.0
	 * @example text='header'
	 */
	accesibilityHint?: string;
	/**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	onPress?: (event: GestureResponderEvent) => void;
	/**
	 * Styles for the button.
	 * @since 1.0.0
	 * @example style={{borderColor: "#ffdd34"}}
	 */
	style?: StyleProp<ViewStyle>;
	/**
	 * Styles for the button text.
	 * @since 1.0.0
	 * @example textStyle={{color:"#ffdd34"}}
	 */
	textStyle?: StyleProp<TextStyle>;
	/**
	 * Button style variant, default to contained
	 * @since 2.0.0
	 * @example variant="outlined"
	 */
	variant?: 'Text' | 'Contained' | 'Outlined' | 'Underline' | 'OutlinedFocus';
	/**
	 * Icon to show
	 * @since  1.0.0
	 * @example icon={<Icon/>}
	 */
	icon?: ReactElement;
	/**
	 * Icon to show
	 * @since  1.0.0
	 * @example rightIcon={<Icon/>}
	 */
	rightIcon?: ReactElement;
	/**
	 * Whether the button is disabled
	 * @since 1.0.0
	 * @default false
	 */
	disabled?: boolean;
	allowFontScaling?: boolean;
}
