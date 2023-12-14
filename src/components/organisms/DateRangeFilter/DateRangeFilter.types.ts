import { Moment } from 'moment';
import { Control } from 'react-hook-form';
import { DatePickerProps } from 'src/components/atoms/DatePicker/DatePicker.types';

/**
 * @interface RegistryDateRangeFilterProps
 * @since 1.0.x
 */
export interface RegistryDateRangeFilterProps {
	/**
	 * Method called after pressing the cancel button
	 * @since  1.0.0
	 */
	onCancel?: () => void;
	/**
	 * Method called after pressing the onSubmit button
	 * @since 1.0.0
	 */
	onSubmit?: (from: Moment, to: Moment) => void;
	/**
	 * Title
	 * @since 1.0.0
	 */
	title: string;
	/**
	 * Default date to render
	 * @since 1.0.0
	 */
	from?: Moment;
	/**
	 * Default date to render
	 * @since 1.0.0
	 */
	to?: Moment;
}

export interface RegistryFilterProps {
	/**
	 * Form from date
	 * @since 1.0.0
	 */
	from: Moment;
	/**
	 * From to date
	 * @since 1.0.0
	 */
	to: Moment;
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
  }
