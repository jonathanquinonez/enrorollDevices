import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ModalBlockAccountProps
 * @since 1.0.0
 */
export interface ModalBlockAccountProps {
  /**
   * validation to know what type of message to display
   * @since 1.0.0
   * @example isPassExpired=true
   */
  isPassExpired: boolean;
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
}
