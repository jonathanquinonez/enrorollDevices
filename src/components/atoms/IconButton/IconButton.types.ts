import { ReactElement } from 'react';
import { AccessibilityRole, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface IconButtonProps
 * @since 2.0.0
 */
export interface IconButtonProps {
  /**
   * Icon to show
   * @since  1.0.0
   * @example accessibilityLabel='example'
   */
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  /**
   * Icon to show
   * @since  1.0.0
   * @example accessibilityLabel='example'
   */
  accessibilityLabel?: string;
  /**
   * Icon to show
   * @since  1.0.0
   * @example property='<Icon name={'link'}/>'
   */
  icon: ReactElement;
  /**
   *
   * @since  1.0.0
   * @example style={{borderColor:"#ddee44"}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Method called after button press
   * @since 1.0.0
   * @example onPress={()=>console.log("Has pressed me")}
   */
  onPress?: () => void;
  /**
	 * iconButton style variant, default to small
	 * @since 1.0.0
	 * @example variant="Small"
	 */
	variant?: 'Small' | 'Float' | 'Header' | 'RadianceBlue' | 'RadianceGreen';
  /**
	 * Whether the button is disabled
	 * @since 1.0.0
	 * @default false
	 */
	disabled?: boolean;
}
