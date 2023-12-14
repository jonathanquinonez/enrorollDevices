import { FontAwesome } from '@expo/vector-icons';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ProcessCounterProps
 * @since 1.0.0
 */
export interface ProcessCounterProps {
  /**
   * Method called after button press
   * @since 1.0.0
   * @example onPress={(num)=>console.log(num)}
   */
   onPress: (num: number) => void;
  /**
   * title, is used to display the title of each progress button.
   * @since 1.0.0
   * @example titles={['Personal information', 'Contact information']}
   */
  titles: string[];
  /**
   * Represents the position you are currently in in the progress state
   * @since 1.0.0
   * @example currentPosition={0}
   */
   currentPosition: number;
  /**
  *
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  style?: StyleProp<ViewStyle>;
};

export interface ProcessButtonProps {
  /**
   * Method called after button press
   * @since 1.0.0
   * @example onPress={(num)=>console.log(num)}
   */
   onPress: (num: number) => void;
  /**
   * Represents the position you are currently in in the progress state
   * @since 1.0.0
   * @example currentPosition={0}
   */
   currentPosition: number;
  /**
   * title, is used to display the title of each progress button.
   * @since 1.0.0
   * @example title='Contact information'
   */
  title: string;
  /**
   * The progressNumber represents the number of the progress button.
   * @since 1.0.0
   * @example progressNumber=1
   */
  progressNumber: number;
  /**
   * Contiene el total de items a mostrar.
   * @since 1.0.0
   * @example totalItems=4
   */
   totalItems: number;
}
