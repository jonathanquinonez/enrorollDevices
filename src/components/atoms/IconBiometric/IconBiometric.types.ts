import { GestureResponderEvent } from 'react-native';

/**
 * @interface IconBiometric
 * @since 1.0.0
 */
export interface IconBiometricProps {
    /**
	 * Method called after pressing the button.
	 * @since 1.0.0
	 * @example onPress={() => handlePress()}
	 */
	 onPress?: (event: GestureResponderEvent) => void;
	 
}
