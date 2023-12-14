import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ToggleProps
 * @since 1.0.0
 */
export interface ToggleProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  initialValue: boolean;
  onChange: (value: boolean) => void;
  text: string;
}
