/**
 * @interface SlideIndicator
 * @since 1.0.0
 */

export interface SlideIndicatorInterface {
    /**
   * Length data of slide
   * @since  1.0.0
   * @example length={8}
   */
    length: number;
     /**
   * Current position of object
   * @since  1.0.0
   * @example currentPosition={2}
   */
    currentPosition: number;

    variant?: VariantsIndicator;

}

export interface DotInterface {
    /**
   * Validate this dot is active
   * @since  1.0.0
   * @example length={8}
   */
  isActive: boolean;

  variant?: VariantsIndicator;
}

export enum VariantsIndicator {
  Green = 'green',
  Blue = 'blue'
}