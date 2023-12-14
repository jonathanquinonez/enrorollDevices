import { ReactNode } from "react";

/**
 * @interface UnblockAccountPagination
 * @since 1.0.x
 */
export interface UnblockAccountPaginationType {
  /**
   * Object data with text.
   * @since  1.0.0
   * @example value=[{title: 'This is a title', body: 'its awesome'}]
   */
  bottomData: BottomDataType[];
  /**
    * Current position.
    * @since  1.0.0
    * @example value={1}
    */
  currentPosition: number;
  /**
      * handler to move to next position.
      * @since  1.0.0
      * @example value={action()}
      */
  handlerNext: () => void
  /**
    * handler to move to next position.
    * @since  1.0.0
    * @example value={action()}
    */
  handlerBack: () => void
  positionRef: number
}

export interface BottomDataType {
  /**
   * Value to item id.
   * @since  1.0.0
   * @example value=1
   */
  id: number;
  /**
    * Children component
    * @since  1.0.0
    */
  children?: ReactNode;
}