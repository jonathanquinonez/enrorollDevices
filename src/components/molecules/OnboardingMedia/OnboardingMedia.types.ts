import { ImageSourcePropType } from "react-native";

/**
 * @interface OnboardingMedia
 * @since 1.0.x
 */
 export interface OnboardingMediaType {
    /**
     * Object data with text.
     * @since  1.0.0
     * @example value=[{title: 'This is a title', body: 'its awesome'}]
     */
    mediaData: MediaDataType[];
    /**
     * Number of position
     * @since  1.0.0
     * @example value=1
     */
    currentPosition: number;
}

export interface MediaDataType {
     /**
   * Value to item id.
   * @since  1.0.0
   * @example value=1
   */
  id: number;
    /**
   * Value to image souorces.
   * @since  1.0.0
   * @example value='/assets/test.png'
   */
    imageSource: ImageSourcePropType;

    width: number;

}