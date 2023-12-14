import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface iconAlertProps
 * @since 1.0.0
 */
export interface IconAlertProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  active?: boolean;
  numberNotifications: number;
}
