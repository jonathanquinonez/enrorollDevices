import { ReactElement } from "react";

/**
 * @interface RotateSpringAnimationProps
 * @since 1.0.0
 */
export interface RotateSpringAnimationProps {
  /**
   * Flag to start the animation, True to start the animation, false to return to previous state.
   * @since  1.0.0
   * @example animate={true}
   */
  animate: boolean;
  /**
   * Degrees to rotate the component
   * @since 1.0.0
   * @example degrees={180}
   */
  degrees: number;
  /**
   * Tension to apply for the sprint animation (default: 200)
   * @since 1.0.0
   */
  tension?: number;

  children: ReactElement | ReactElement[];
}
