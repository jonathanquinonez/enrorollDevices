import { ReactElement } from 'react';
import { FieldError, Control } from 'react-hook-form';
import { KeyboardTypeOptions, StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface InputProps
 * @since 2.0.0
 */
export interface InputProps extends TextInputProps {
  /**
   * Placeholder text for the input
   * @since  1.0.0
   * @example accesibilityHint='Go back'
   */
  accesibilityHint?: string;
  /**
   * Placeholder text for the input
   * @since  1.0.0
   * @example accesibilityLabel='Go back'
   */
  accesibilityLabel?: string;
  /**
   * Placeholder text for the input
   * @since  1.0.0
   * @example placeholder='Insert your email'
   */
  placeholder: string;
  /**
   * Label text shown above the input
   * @since 1.0.0
   * @example label='Email'
   */
  label?: string;
  /**
   * Icon shown inside the text input on the left side.
   * @since 1.0.0
   * @example icon={<EnvelopeIcon />}
   */
  icon?: ReactElement;
  /**
   * Input name, used to set the form name controller.
   * @since 1.0.0
   * @example name='email'
   */
  name: string;
  /**
    * Color checkbox
    * @since 1.0.0
    * @example colorText={'#ddff00'}
    */
  colorCheckbox?: string;
  /**
   * Validation error provided by the Form controller.
   * @since 1.0.0
   * @example error={errors.email}
   */
  error?: FieldError;
  /**
   * True if the input is shown as password input
   * @since 1.0.0
   * @example passwordInput={true}
   */
  passwordInput?: boolean;
  /**
   * True if the input should show a strength indicator
   * Only works if passwordInput is set to true
   * @since 1.0.0
   */
  showStrength?: boolean;
  /**
   * Verdadero si la entrada debe mostrar el checkbox
   * Solo funciona si isCheckbox se establece en verdadero
   * @since 1.0.0
   */
  isCheckbox?: boolean;
  /**
   * value to define the state of the checkbox
   * @since 1.0.0
   */
  valueCheckbox?: boolean;
  /**
   * Type of keyboard to show for the text input
   * @since 1.0.0
   * @example keyboardType='numeric'
   */
  setDisabled?: boolean;
  noShowError?: boolean;
  /**
   * Type of keyboard to show for the text input
   * @since 1.0.0
   * @example keyboardType='numeric'
   */
  keyboardType?: KeyboardTypeOptions;
  /**
   * Input control method provided by the react-hook-form library
   * @since 1.0.0
   * @example control={form.control}
   */
  control?: Control<any, any>;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example inputStyle={{borderColor: "#ff4455"}}
   */
  inputStyle?: StyleProp<TextStyle>;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example style2={{borderColor: "#ff4455"}}
   */
  style2?: StyleProp<ViewStyle>;
  styleIcon?: StyleProp<ViewStyle>;
  /**
   * Custom styles for the Text Input
   * @since 1.0.0
   * @example inputStyle={{borderColor: "#ff4455"}}
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * value to define show passwordStrength
   * @since 1.0.0
   */
  showPasswordStrength?: boolean;
  filterBySearch?: boolean;
  isActiveSearch?: boolean;
  mask?: string;
  onPressCheckbox?: () => void;
  clearSearch?: () => void;
  /**
   *
   * @since  1.0.0
   * @example style={{borderColor:"#ddee44"}}
   */
   styleError?: StyleProp<ViewStyle>;
}
