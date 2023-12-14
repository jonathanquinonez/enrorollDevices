import { Moment } from 'moment';
import { Control, FieldError } from 'react-hook-form';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface DatePickerProps
 * @since 1.0.x
 */
export interface DatePickerProps {
  /**
   * Start date, only if range is set to true
   * @since  1.0.0
   * @example startDate={moment()}
   */
  startDate?: Moment;
  /**
   * End date, only if range is set to true
   * @since  1.0.0
   * @example endDate={moment()}
   */
  endDate?: Moment;
  /**
   * Method called after selecting any date
   * @since 1.0.0
   */
  onChange?: (val: ResponseDates) => void;
  /**
   * Method called after pressing on the done button
   * @since 1.0.0
   */
  onDone?: (val: ResponseDates) => void;
  /**
   * Minimum date allowed to select
   * @since 1.0.0
   */
  minDate?: Moment;
  /**
   * Maximum date allowed to select
   * @since 1.0.0
   */
  maxDate?: Moment;
  /**
   * True to select a range of dates
   * @since 1.0.0
   */
  range?: boolean;
  /**
   * Buttons with default options
   * @since 1.0.0
   */
  presetButtons?: boolean;
  /**
   * Value to render in the component
   * @since 1.0.0
   */
  value?: Moment;
  /**
   * Initial value to render in the component
   * @since 1.0.0
   */
  initialValue?: Moment;
  /**
   * Input label
   * @since 1.0.0
   */
  label?: string;
  /**
   * Styles for the button.
   * @since 1.0.0
   * @example style={{borderColor: "#ffdd34"}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Styles for the button.
   * @since 1.0.0
   * @example style={{borderColor: "#ffdd34"}}
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Validation error provided by the Form controller.
   * @since 1.0.0
   * @example error={errors.email}
   */
  error?: FieldError;
  /**
   * True if the component is wrapped in a Form controlled input
   * @since 1.0.0
   */
  isControlled?: boolean;
  mode?: string;
  editable?: boolean;
  initValueMayus?: boolean;
}

export interface ResponseDates {
  /**
   * Selected date
   * @since 1.0.0
   */
  date?: Moment;
  /**
   * Date (month) rendered in the component
   * @since 1.0.0
   */
  displayedDate: Moment;
  /**
   * Selected start date(only of range is set to true)
   * @since 1.0.0
   */
  startDate?: Moment;
  /**
   * Selected end date(only of range is set to true)
   * @since 1.0.0
   */
  endDate?: Moment;
  }

export interface DatePickerControllerProps extends DatePickerProps {
  /**
   * Input control method provided by the react-hook-form library
   * @since 1.0.0
   * @example control={form.control}
   */
  control?: Control<any, any>;
  /**
   * Input name, used to set the form name controller.
   * @since 1.0.0
   * @example name='email'
   */
  name: string;
  valueDate?: Moment;
  initValueMayus?: boolean,
  pikerStyle?: StyleProp<TextStyle>;
}
