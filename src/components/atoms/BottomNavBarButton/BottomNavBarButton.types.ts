import { ReactElement } from 'react';

/**
 * @interface BottomNavBarButtonProps
 * @since 1.0.x
 */
export interface BottomNavBarButtonProps {
  /**
   * Description of the property
   * @since  1.0.x
   * @example property='Some example value'
   */
  text?: string | null;
  icon?: ReactElement;
  isFocus?: boolean;
}
