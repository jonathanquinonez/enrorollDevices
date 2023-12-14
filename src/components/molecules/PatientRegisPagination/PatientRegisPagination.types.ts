import { TempFormUser } from "domain/entities/tempFormUser";
import { ReactNode } from "react";

/**
 * @interface PatientRegisPagination
 * @since 1.0.x
 */
export interface PatientRegisPaginationType {
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
  handlerNext: () => void;
  /**
    * handler to move to next position.
    * @since  1.0.0
    * @example value={action()}
    */
  handlerBack: () => void;
}

export interface BottomDataType {
  /**
   * Value to item id.
   * @since  1.0.0
   * @example value=1
   */
  id: number;
  /**
   * Value to body title.
   * @since  1.0.0
   * @example value='This is a Title'
   */
  title: string;
  /**
    * Children component
    * @since  1.0.0
    */
  children?: ReactNode;
}