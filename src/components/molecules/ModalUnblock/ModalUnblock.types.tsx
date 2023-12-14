import { ReactElement } from 'react';
import { ButtonProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

/**
 * @interface ModalUnblockProps
 * @since 1.0.0
 */
export interface ModalUnblockProps {
    /**
     * @since  1.0.0
     * @example style={{margin: 5}}
     */
    style?: StyleProp<ViewStyle>;
    /**
     * @since  1.0.0
     * @example style={{margin: 5}}
     */
    styleBtn?: StyleProp<ViewStyle>;
    /**
     * Receive the icon that will be found at the top
     * @since  1.0.0
     * @example icon={IconSvg}
     */
    icon?: ReactElement;
    /**
     * method to display the icon by default
     * @since  1.0.0
     * @example isIconAlert={true}
     */
    isIconAlert?: boolean;
    /**
     * method onPress button
     * @since  1.0.0
     * @example closeModal={closeModal}
     */
    onPress: () => void;
    /**
     * Text to display in the modal alert
     * @since  1.0.0
     * @example warningText={'This is a demo text'}
     */
    warningText: string;
    /**
     * method onPress button
     * @since  1.0.0
     * @example textButton={t('common.accept')}
     */
    textButton?: string;
    /**
     * Text to display in the modal alert
     * @since  1.0.0
     * @example warningText={'This is a demo text'}
     */
    warningText2?: string;
    /**
     * Text to display in the modal alert
     * @since  1.0.0
     * @example textButton={'This is a demo text'}
     */
    variantBtn?: "Contained" | "Text" | "Outlined" | "Underline" | undefined;

    styleTextBtn: StyleProp<TextStyle>;

    /**
     * Text to show for the primary button.
     * @since 1.0.0
     * @example primaryText="Yes"
     */
    primaryText?: string;

    /**
     * Method called after pressing the primary button
     * @since 1.0.0
     * @example onPrimaryPress={()=>console.log("Primary button pressed")}
     */
    onPrimaryPress?: () => void;

    /**
     * Button style variant, default to contained
     * @since 2.0.0
     * @example variant="outlined"
     */
    variant?: 'Text' | 'Contained' | 'Outlined' | 'Underline';

    /**
	 * custom styles for the bottom buttons
	 * @since 1.0.0
	 */
	buttonStyle?: StyleProp<ViewStyle>;

}
