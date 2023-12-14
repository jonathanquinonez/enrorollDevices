import { ReactNode } from "react";

/**
 * @interface CreateAccountPagination
 * @since 1.0.x
 */
export interface CreateAccountPaginationType {
  /**
   * Object data with text.
   * @since  1.0.0
   * @example value=[{title: 'This is a title', body: 'its awesome'}]
   */
  bottomData: DataType[];
  /**
    * Current position.
    * @since  1.0.0
    * @example value={1}
    */
  currentPosition: number;
  /**
    * Show help field.
    * @since  1.0.0
    * @example isInfo={true}
    */
  isInfo: boolean;
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
  /*
  * variable to know the selected instructions.
  * @since 1.0.0
  * @example values={{{ hadSanitas: 0, type: 1 }}}
  */
  values: {
    hadSanitas: number,
    type: number
  };
  positionRef: number
}

export interface DataType {
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