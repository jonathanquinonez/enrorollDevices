import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ModalCodeSentFPProps
 * @since 1.0.0
 */
export interface ModalCodeSentFPProps {
  /**
   * Validates if the process was done by email or mobile
   * @since 1.0.0
   * @example isPassExpired=true
   */
  isMobile: boolean | undefined;
  /**
   * Validates if the process was done by email or mobile
   * @since 1.0.0
   * @example isPassExpired=true
   */
  onPress: () => void;
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
}
