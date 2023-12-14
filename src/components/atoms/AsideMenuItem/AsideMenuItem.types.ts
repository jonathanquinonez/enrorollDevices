import { ReactElement } from 'react';
import { AccessibilityRole, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface AsideMenuItemProps
 * @since 1.0.x
 */
export interface AsideMenuItemProps {
  /**
   * Text to show in the items
   * @since  1.0.0
   * @example text='Get Care'
   */
  text: string;
  /**
   * Icon shown on the left side of the text
   * @since 1.0.0
   */
  icon?: ReactElement;
  /**
   * Wether if the button has a dropdown option
   * @since 1.0.0
   */
  isDropdown?: boolean;
  /**
   * Render a left arrow icon on the Right
   * @since 1.0.0
   */
  showRightArrowIcon?: boolean;
  /**
   * Method called with the index parameter after pressing on the item,
   * if no index is provided the default value is -1
   * @since 1.0.0
   */
  onPress?: (index: number) => void;
  /**
   * Unique key index to identify between multiple dropdown items
   * @since 1.0.0
   */
  index?: number;
  /**
   * Index used to compare with the index parameter, if they are the same the dropdown is open
   * @since 1.0.0
   */
  currentIndex?: number;
  /**
   * Styles
   * @since 1.0.0
   */
  style?: StyleProp<ViewStyle>;

  children?: ReactElement | ReactElement[] | any;

  styleText ?: StyleProp<ViewStyle>;
  accessibilityRole?: AccessibilityRole
  accessibilityHint?: string
  accessibilityLabel?: string
}
