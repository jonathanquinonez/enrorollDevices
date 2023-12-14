import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface IconProps
 * @since 1.0.0
 */
export interface IconProps {
  /**
   * Icon name (FontAwesome name)
   * @since 1.0.0
   * @example name='link'
   */
  name: React.ComponentProps<typeof FontAwesome>['name'] | string;
  /**
   * Icon color
   * @since 1.0.0
   * @example color='#ddff00'
   */
  color?: string;
  /**
   * Icon color
   * @since 1.0.0
   * @example size=20
   */
   size?: number;
   /**
   *
   * @since  1.0.0
   * @example style={{margin: 5}}
   */
  style?: StyleProp<ViewStyle>;
}
