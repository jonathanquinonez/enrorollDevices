import { GestureResponderEvent } from 'react-native';

/**
 * @interface FaceIdProps
 * @since 1.0.0
 */
export interface FaceIdProps {
    /**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	 onPress?: (event: GestureResponderEvent) => void;
	 
}
