import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface VerificationDataBAProps
 * @since 1.0.0
 */
export interface VerificationDataBAProps {
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
  handlerNext?: () => Promise<void>;
  navigateSupportChat: any;
  onPress: any;  onPressClose: any; formValues: any
}
