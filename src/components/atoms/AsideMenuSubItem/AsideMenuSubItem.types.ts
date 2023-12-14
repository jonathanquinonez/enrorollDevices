import { AccessibilityRole } from "react-native";

/**
 * @interface AsideMenuSubItemProps
 * @since 1.0.0
 */
export interface AsideMenuSubItemProps {
  /**
   * Text to show in the subitem
   * @since  1.0.0
   * @example text='Get care now'
   */
  text: string;
  /**
   * If true, shows a divider on the bottom of the text
   * @default true
   * @since 1.0.0
   */
  divider?: boolean;
  /**
   * Method called after pressing on the item
   * @since 1.0.0
   */
  onPress?: () => void;
  btnDisabled?: boolean;
  accessibilityRole?: AccessibilityRole
  accessibilityHint?: string
  accessibilityLabel?: string
}
