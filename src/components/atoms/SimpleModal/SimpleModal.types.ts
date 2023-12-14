import { ReactNode } from "react";

/**
 * @interface SimpleModalProps
 * @since 1.0.x
 */
export interface SimpleModalProps {
  /**
   * True to render the modal on top of the screen
   * @since 1.0.0
   * @example open={true}
   */
  open?: boolean;
  /**
   * Method called after the modal is closed
   * @since 1.0.0
   * @example dismiss={(state)=>console.log(state)}
   * value of the state is false when dismissing
   */
  dismiss?: (state: boolean) => void;
  /**
   * Whether to close the modal when pressing in the backdrop
   * @since 1.0.0
   * @example backDropDismiss={true}
   */
  backDropDismiss?: boolean;
  /**
   * Children component
   * @since  1.0.0
   */
  children?: ReactNode;
}
