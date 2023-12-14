import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ModalRevalidateDataBAProps
 * @since 1.0.0
 */
export interface ModalRevalidateDataBAProps {
  /**
   * Validates if the process was done by email or mobile
   * @since 1.0.0
   * @example isPassExpired=true
   */
  isMobile: boolean;
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
}
