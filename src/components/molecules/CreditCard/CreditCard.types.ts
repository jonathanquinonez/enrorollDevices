import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface CreditCardProps
 * @since 1.0.0
 */
export interface CreditCardProps {
  /**
   * @since 1.0.0
   * @example expiryMonth='02/50'
   */
  expiryMonth?: number;
  /**
   * @since 1.0.0
   * @example expiryYear='02/50'
   */
  expiryYear?: number;
  /**
   * @since 1.0.0
   * @example numCard='2424'
   */
  numCard?: string;
  /**
   * @since 1.0.0
   * @example isValid={true}
   */
  isValid?: boolean;
  /**
   * @since 1.0.0
   * @example cardType='cvv'
   */
  cardType?: string;
  /**
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
}
