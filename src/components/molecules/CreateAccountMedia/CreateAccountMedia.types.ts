import { ImageSourcePropType } from "react-native";

/**
 * @interface CreateAccountMedia
 * @since 1.0.x
 */
 export interface CreateAccountMediaType {
    /**
     * Object data with text.
     * @since  1.0.0
     * @example value=['This is a title', 'this is another title']
     */
     titles: string[];
    /**
     * Number of position
     * @since  1.0.0
     * @example value=1
     */
    currentPosition: number;
    /**
     * handler to move to next position.
     * @since  1.0.0
     * @example value={action()}
     */
     handlerExit: () => void
}