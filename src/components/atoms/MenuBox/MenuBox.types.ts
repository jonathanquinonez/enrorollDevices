import { ReactElement } from "react";

/**
 * @interface MenuBoxProps
 * @since 1.0.x
 */
export interface MenuBoxProps {
  noBorders?: boolean,

  children: ReactElement | ReactElement[];
  /**
   * Description of the property
   * @since  1.0.x
   * @example property='Some example value'
   */
  // property: string;
}
