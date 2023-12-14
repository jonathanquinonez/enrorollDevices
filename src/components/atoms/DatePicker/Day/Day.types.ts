import { StyleProp, TextStyle } from 'react-native';

/**
 * @interface DayProps
 * @since 1.0.0
 */
export interface DayProps {
  /**
   * Number of the day to display
   * @since  1.0.0
   * @example index={31}
   */
  index?: number;
  /**
   * True if the date is selected
   * @since 1.0.0
   */
  selected?: boolean;
  /**
   * True if the date is disabled
   * @since 1.0.0
   */
  disabled?: boolean;
  /**
   * Method called after pressing on the day
   * @since 1.0.0
   */
  select?: (index: number) => void;
  /**
   * Indicated an empty space in the date picker
   * @since 1.0.0
   */
  empty?: boolean;
  /**
   * Day Text style
   * @since 1.0.0
   */
  textStyle?: StyleProp<TextStyle>;
}
