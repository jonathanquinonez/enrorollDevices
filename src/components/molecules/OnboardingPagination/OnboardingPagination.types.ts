/**
 * @interface OnboardingPagination
 * @since 1.0.x
 */
export interface OnboardingPaginationType {
  /**
   * @since  1.0.0
   * @example isMentalHealth=false
   */
  isMentalHealth?: boolean;
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
   /**
    * handler to move to end list.
    * @since  1.0.0
    * @example value={action()}
    */
  handlerSkip: () => void
   /**
    * onFinish handler.
    * @since  1.0.0
    * @example value={action()}
    */
  onFinish: () => void
  onbType2?: boolean;
  backButtonText?: string;
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
 * Value to body.
 * @since  1.0.0
 * @example value='This is a body text'
 */
  body: string | React.JSX.Element;
  /**
 * Value to body.
 * @since  1.0.0
 * @example icon=<Icon/>
 */
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>
   /**
 * Value to font size.
 * @since  1.0.0
 * @example value={12}
 */
  fontSize?: number;

}