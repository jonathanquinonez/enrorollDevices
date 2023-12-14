import { ReactElement } from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface CardNotificationGeneralsProps
 * @since 1.0.0
 */
export interface CardNotificationGeneralsProps {
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
  title: string | null;
  text: string | null;
  time: string;
  isNew: boolean;
  isAnnualV: boolean;
  /**
   * Method called after pressing the button.
   * @since 1.0.0
   * @example onPressOptions={() => handlePress()}
   */
  onPressOptions?: () => void;
  /**
   * Method called after pressing the button.
   * @since 1.0.0
   * @example onPress={() => handlePress()}
   */
  onPressStartNow?: (event: GestureResponderEvent) => void;
  onPressIAlready?: (event: GestureResponderEvent) => void;
}
