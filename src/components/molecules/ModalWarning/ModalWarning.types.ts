import { ReactElement } from 'react';
import { AccessibilityRole, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

/**
 * @interface ModalWarningProps
 * @since 1.0.0
 */
export interface ModalWarningProps {
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
  * @since  1.0.0
  * @example style={{margin: 5}}
  */
  styleBtnCancel?: StyleProp<ViewStyle>;
  /**
  * @since  1.0.0
  * @example style={{color: 5}}
  */
  styleSubtitle?: StyleProp<TextStyle>;
  /**
  * @since  1.0.0
  * @example style={{color: 5}}
  */
  styleTitle?: StyleProp<TextStyle>;
  /**
  * @since  1.0.0
  * @example style={{color: 5}}
  */
  styleTitle2?: StyleProp<TextStyle>;
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
  delateBtn?: boolean;
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
  textButtonCancel?: string;
  /**
  * method onPress button
  * @since  1.0.0
  * @example textButton={t('common.accept')}
  */
  textButton?: string;
  /**
  * method onPress button
  * @since  1.0.0
  * @example textButtonCancel={t('common.cancel')}
  */
  textButtonCancel?: string;
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
  * method onPress button
  * @since  1.0.0
  * @example title={'Hello'}
  */
  title2?: string;
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
  variantBtnCancel?: "Contained" | "Text" | "Outlined" | "Underline" | undefined;
  variantBtn?: "Contained" | "Text" | "Outlined" | "Underline" | undefined;
  colorTextBtnCancel?: string;
  colorTextBtn?: string;
  accesibilityLabel1?: string;
  accesibilityLabel2?: string;
  accessibilityRole1?: AccessibilityRole;
  accessibilityRole2?: AccessibilityRole;
}

interface TermsAndPolicy {
  "terms": boolean,
  "policy": boolean
}