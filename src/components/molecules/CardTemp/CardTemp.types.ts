import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface CardTempProps
 * @since 1.0.0
 */
export interface CardTempProps {
  /**
   * @since 1.0.0
   * @example Title='hello'
   */
  title: string;
  /**
   * @since 1.0.0
   * @example textFloat='Hello'
   */
  textFloat: string;
  /**
   * @since 1.0.0
   * @example subTitleA='Hello:'
   */
  subTitleA: string;
  /**
   * @since 1.0.0
   * @example subTitleB='Hello word'
   */
  subTitleB: string;
}
