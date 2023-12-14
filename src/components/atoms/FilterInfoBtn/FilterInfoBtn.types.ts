import { FontAwesome } from '@expo/vector-icons';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

/**
 * @interface FilterInfoBtnProps
 * @since 1.0.0
 */
export interface FilterInfoBtnProps {
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
  /**
   * Method called after pressing the button.
   * @since 1.0.0
   * @example onPress={() => handlePress()}
   */
  onPress?: (event: GestureResponderEvent) => void;
  /**
   * Property that receives an object with the range of dates to display
   * @since 1.0.0
   * @example {from: new Date(), to: new Date()}
   */
  tempData: TempData | undefined;
  children: JSX.Element|JSX.Element[]
}

interface TempData {
  from: string | Date | undefined,
  to: string | Date | undefined
}
