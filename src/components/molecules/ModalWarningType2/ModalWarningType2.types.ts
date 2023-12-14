import { ReactElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

/**
 * @interface ModalWarningType2Props
 * @since 1.0.0
 */
export interface ModalWarningType2Props {
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
  styleBtnA?: StyleProp<ViewStyle>;
  /**
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  styleSubtitle?: StyleProp<TextStyle>;
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
  * method onPress button
  * @since  1.0.0
  * @example closeModal={closeModal}
  */
  onPressCancel?: () => void;
  /**
  * method onPress button
  * @since  1.0.0
  * @example textButton={t('common.accept')}
  */
  textButtonCancel?: string;
  textButton?: string;
  /**
  * @since  1.0.0
  * @example termsAndPrivacy={{
    "terms": true,
    "policy": false
  }}
  */
  termsAndPrivacy?: TermsAndPolicy;
  /**
  * method onPress button
  * @since  1.0.0
  * @example title={'Hello'}
  */
  title?: string;
  /**
  * Text to display in the modal alert
  * @since  1.0.0
  * @example warningText={'This is a demo text'}
  */
  warningText?: any;
  styleTextBtn?: any;
  /**
  * Text to display in the modal alert
  * @since  1.0.0
  * @example textButton={'This is a demo text'}
  */
  variantBtn?: "Contained" | "Text" | "Outlined" | "Underline" | undefined;
}

interface TermsAndPolicy {
  "terms": boolean,
  "policy": boolean
}