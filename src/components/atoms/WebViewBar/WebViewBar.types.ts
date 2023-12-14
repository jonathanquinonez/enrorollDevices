import { GestureResponderEvent } from 'react-native';

/**
 * @interface WebViewBar
 * @since 1.0.0
 */
export interface WebViewBar {

	/**
	 * Method called after pressing close.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	onPress?: (event: GestureResponderEvent) => void;
	
}
