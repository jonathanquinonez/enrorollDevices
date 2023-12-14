import { ReactElement } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface CardEnrollDeviceProps
 * @since 1.0.0
 */
export interface CardEnrollDeviceProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  /**
  * Icon shown inside the text input on the left side.
  * @since 1.0.0
  * @example icon={<EnvelopeIcon />}
  */
  icon?: ReactElement;
  icon2?: ReactElement;
  title: string;
  text: string;
  text2: string;
  time: string;
  onIcon2Press?: (event: GestureResponderEvent) => void;
}
