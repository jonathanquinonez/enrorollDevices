import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
//Translate
import { useTranslation } from 'react-i18next';
// Types, Styles
import { ModalWarningProps as Props } from './ModalWarning.types';
import componentStyles from './ModalWarning.styles';
//Images
import IconWarning from 'icons/IconWarning.svg';
//Componets
import Button from 'src/components/atoms/Button/Button';


/**
 * Render a ModalWarning.
 * @since 1.0.0
 */
const ModalWarning = (props: Props) => {
  const { styles, colors } = useStyles(componentStyles);

  const { style, icon, onPress, isIconAlert, textButton, onPressCancel, textButtonCancel, styleTitle, styleTitle2,
    warningText, styleBtn, styleBtnCancel, styleSubtitle, styleTextBtn, variantBtn = 'Contained',
    title, variantBtnCancel = 'Outlined', colorTextBtnCancel = colors.primary, colorTextBtn = 'white', title2,
    accesibilityLabel1, accesibilityLabel2, accessibilityRole1 = 'button', accessibilityRole2 = 'button' } = props;
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]}>
      {isIconAlert && (<View style={styles.head}>
        <IconWarning />
      </View>)}
      {icon && (<View style={styles.head}>
        {icon}
      </View>)}
      {title && (<Text accessibilityRole='header' style={[styles.title, styleTitle]} maxFontSizeMultiplier={1.3}>
        {title}
      </Text>)}
      {title2 && (<Text accessibilityRole='header' style={[styles.title, styleTitle2]} maxFontSizeMultiplier={1.3}>
        {title2}
      </Text>)}
      <Text style={[styles.text, styleSubtitle]} maxFontSizeMultiplier={1.3}>
        {warningText}
      </Text>
      <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', width: '100%' }}>
        {onPressCancel && (<Button
          accesibilityLabel={accesibilityLabel1}
          accessibilityRole={accessibilityRole1}
          variant={variantBtnCancel}
          title={(textButton || textButtonCancel) ? textButtonCancel ?? textButton ?? t('common.cancel') : t('common.cancel')}
          style={[{ width: 130 }, styleBtnCancel]}
          textStyle={[styleTextBtn ? styleTextBtn : styles.secondaryText, { color: colorTextBtnCancel }]}
          onPress={() => { onPressCancel() }}
        />)}
        <Button
          accesibilityLabel={accesibilityLabel2}
          accessibilityRole={accessibilityRole2}
          variant={variantBtn}
          title={textButton ? textButton : t('common.accept')}
          style={[styles.button, styleBtn]}
          textStyle={[styleTextBtn ? styleTextBtn : styles.secondaryText, { color: colorTextBtn }]}
          onPress={() => { onPress() }}
        />
      </View>
    </View>
  )
}

export default ModalWarning