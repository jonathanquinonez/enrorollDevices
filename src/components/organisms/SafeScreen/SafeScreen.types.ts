import { StyleProp, ViewStyle } from 'react-native';
import { ReactElement } from 'react';

/**
 * @interface SafeScreenProps
 * @since 1.0.0
 */
export interface SafeScreenProps {
   /**
   *
   * @since  1.0.0
   * @example style={{margin: 5}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   *
   * @since  1.0.0
   * @example statuscolor={'#fff'}
   */
  statuscolor?: string;

  children?: ReactElement | ReactElement[];
}
