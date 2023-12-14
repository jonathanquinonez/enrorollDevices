import { Moment } from 'moment';

/**
 * @interface YearPickerProps
 * @since 1.0.x
 */
export interface YearPickerProps {
  /**
   * Current date
   * @since  1.0.0
   * @example currentDate={moment()}
   */
  currentDate: Moment;
  /**
   * Select between Months o years list
   * @since 1.0.0
   * @example type="Months"
   */
  type: 'Years' | 'Months';
  /**
   * Method called after selecting a year or a month from the list
   * @since 1.0.0
   */
  onChange: (date: Moment) => void;
  /**
   * Method called after pressing on the year or month in the header
   * @since 1.0.0
   */
  onChangeType: (type: 'Years' | 'Months') => void;
}
