import { StyleProp, ViewStyle } from "react-native";

/**
 * @interface ButtonLanguageProps
 * @since 1.0.0
 */
export interface ButtonLanguageProps {
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
    textStyle?: StyleProp<ViewStyle>;
   /**
   * Method called after the checkbox is pressed
   * @since  1.0.x
   * @example onPress={(checked)=>console.log(`checkbox is ${checked?"":"not"} pressed`)}
   */
   onPress?: (checked: boolean) => void;
}