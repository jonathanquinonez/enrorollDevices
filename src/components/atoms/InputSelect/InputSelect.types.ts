import { ReactElement } from 'react';
import { Control, FieldError } from 'react-hook-form';
import { StyleProp, TextStyle } from 'react-native';
import { Item } from 'react-native-picker-select';

/**
 * @interface InputSelectProps
 * @since 1.0.0
 */
export interface InputSelectProps {
  /**
   * Icon shown inside the text input on the left side.
   * @since 1.0.0
   * @example icon={<EnvelopeIcon />}
   */
  icon?: ReactElement;
  /**
   * InputSelect options to render
   * @since 1.0.0
   * @example items={[{key:1,label:'Option 1', value:'option_1'}]}
   */
  items: Item[];
  /**
   * Method called when selecting a option from the inputSelect
   * @since 1.0.0
   */
  onChange?: (value: any, index: number) => void;
  /**
   * Placeholder text
   * @since 1.0.0
   * @example placeholder="Select an option"
   */
  placeholder: string;
  /**
   * Value of the inputSelect
   * @since 1.0.0
   */
  value?: any;
  /**
   * Text to show as a label
   * @since 1.0.0
   */
  label?: string;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example labelStyle={{borderColor: "#ff4455"}}
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example inputStyle={{borderColor: "#ff4455"}}
   */
   inputStyle?: StyleProp<TextStyle>;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example inputStyle={{borderColor: "#ff4455"}}
   */
  style?: StyleProp<TextStyle>;
  /**
   * Validation error provided by the Form controller.
   * @since 1.0.0
   * @example error={errors.email}
   */
  error?: FieldError;
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
  /**
   * disabled select.
   * @since 1.0.0
   * @example disabled='true'
   */
  disabled?: boolean;
}