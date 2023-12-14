
import { SimpleModalProps } from 'src/components/atoms/SimpleModal/SimpleModal.types';
import { ReactElement, ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ModalProps
 * @since 1.0.0
 */
export interface ModalProps extends SimpleModalProps {
	/**
	 * Icon to show in the header of the modal
	 * @since 1.0.0
	 * @example icon={<WarningIcon/>}
	 */
	icon?: ReactElement;
	/**
	 * Text to show for the primary button.
	 * @since 1.0.0
	 * @example primaryText="Yes"
	 */
	primaryText?: string;
	/**
	 * Text to show for the secondaryButton.
	 * @since 1.0.0
	 * @example secondaryText="Cancel"
	 */
	secondaryText?: string;
	/**
	 * Method called after pressing the primary button
	 * @since 1.0.0
	 * @example onPrimaryPress={()=>console.log("Primary button pressed")}
	 */
	onPrimaryPress?: () => void;
	/**
	 * MEthod called after pressing the secondary button
	 * @since 1.0.0
	 * @example onSecondaryPress={()=>console.log("Secondary button pressed")}
	 */
	onSecondaryPress?: () => void;
	onCancel?: () => void;
	/**
	 * custom styles for the bottom buttons
	 * @since 1.0.0
	 */
	containerButtonStyle?: StyleProp<ViewStyle>;
	/**
	 * custom styles for the bottom buttons
	 * @since 1.0.0
	 */
	buttonStyle?: StyleProp<ViewStyle>;
	/**
  	* Children component
  	* @since  1.0.0
  	*/
	children?: ReactNode;
	/**
	 * Button style variant, default to contained
	 * @since 2.0.0
	 * @example variant="outlined"
	 */
	 variant?: 'Text' | 'Contained' | 'Outlined' | 'Underline';

	// set error message
	setAlertErrorMessage?: Function
}
