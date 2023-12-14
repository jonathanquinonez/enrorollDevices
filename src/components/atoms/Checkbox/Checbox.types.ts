import { ReactNode } from "react";
import { Control, FieldError } from "react-hook-form";
import { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from "react-native";

/**
 * @interface CheckBoxProps
 * @since 1.0.0
 */
export interface CheckBoxProps {
   /**
    * Description function buttoncheck
    * @since 1.0.0
    * @example text='Select check'
    */
   text?: string;
   /**
    * Color checkbox
    * @since 1.0.0
    * @example colorText={'#ddff00'}
    */
   colorCheckbox?: string;
   /**
   * Checkbox value
   * @since 1.0.0
   */
   value?: boolean;
   /**
    *
    * @since  1.0.0
    * @example style={{margin: 5}}
    */
   style?: StyleProp<ViewStyle>;
   /**
    *
    * @since  1.0.0
    * @example style={{margin: 5}}
    */
   textStyle?: StyleProp<TextStyle>;
   /**
   * Method called after the checkbox is pressed
   * @since  1.0.x
   * @example onPress={(checked)=>console.log(`checkbox is ${checked?"":"not"} pressed`)}
   */
   onPress?: (checked: boolean) => void;
   /**
   * Validation error provided by the Form controller.
   * @since 1.0.0
   * @example error={errors.email}
   */
   error?: FieldError;
   /**
    * Children component
    * @since  1.0.0
    */
   children?: ReactNode;
   /**
    * Children component
    * @since  1.0.0
    */
   children2?: ReactNode;
   accesibilityLabel?: string;
   accesibilityHint?: string;
   accessibilityRole?: AccessibilityRole;
}

export interface CheckBoxControllerProps extends CheckBoxProps {
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
   accesibilityLabel?:string;
   accesibilityHint?: string;
}