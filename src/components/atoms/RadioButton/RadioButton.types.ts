import { ReactNode } from 'react';
import { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface RadioButtonProps
 * @since 1.0.0
 */
export interface RadioButtonProps {
  /**
   * Text to show on the left side of the radio button
   * @since  1.0.0
   * @example title='Option A'
   */
  title?: string;
  /**
   * Si activas esta opción, el fondo del check se pone azúl y se resaltan los textos
   * @since  1.0.0
   * @example btnType2={true}
   */
  btnType2?: boolean;
  /**
   * Text to show on the left side of the radio button
   * @since  1.0.0
   * @example title='Option A'
   */
  accessibilityRole?: AccessibilityRole;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  /**
   * Radio Button styles
   * @since 1.0.0
   * @example style={{padding: 16}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Radio Button text styles
   * @since 1.0.0
   * @example textStyle={{color: 'red'}}
   */
  textStyle?: StyleProp<TextStyle>;
  /**
   * Label text styles
   * @since 1.0.0
   * @example labelStyle={{color: 'red'}}
   */
  labelStyle?: StyleProp<TextStyle>;
  /**
   * Method called after pressing the radio button
   * @since 1.0.0
   * @example onPress={(selected)=>console.log(selected)}
   */
  onPress?: (selected: boolean, value: any) => void;

  /**
   * Radio button value
   * @since 1.0.0
   * @example value={{id: 1, name:"Option 1"}}
   */
  value?: any;
  /**
   * initial state of the radio button
   * @since 1.0.0
   */
  isSelected?: boolean;
  /**
   * Text to show as a label
   * @since 1.0.0
   */
  label?: string;
  /**
   * Children component
   * @since  1.0.0
   */
   children?: ReactNode;
}
