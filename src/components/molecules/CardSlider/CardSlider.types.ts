/**
 * @interface CardSlider
 * @since 1.0.x
 */
export interface CardSliderType {
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
  bottomData: any[];
  /**
    * Current position.
    * @since  1.0.0
    * @example value={1}
    */
  currentPosition: number;
   /**
    * onFinish handler.
    * @since  1.0.0
    * @example value={action()}
    */
  onFinish: () => void

  hiddenIndicator?: boolean;

  textButtonFinish?: string;

  textButtonbackFinish?: string;

  title?: string;
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