import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface RadioGroupProps
 * @since 1.0.x
 */
export interface RadioGroupProps {
  /**
   * Description of the property
   * @since  1.0.x
   * @example onChange={(value)=>console.log(value)}
   */
  onChange?: (value?: any) => void;
  /**
   * Current value
   * @since 1.0.0
   * @example value={{id:1}}
   */
  value?: any;
  /**
   * Initial value
   * @since 1.0.0
   * @example initialValue={{id:1}}
   */
  initialValue?: any;
  /**
   * Radio Button styles
   * @since 1.0.0
   * @example style={{padding: 16}}
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Children component
   * @since  1.0.0
   */
   children?: ReactNode;
}
