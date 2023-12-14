import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
//Translate
import { useTranslation } from 'react-i18next';
// Types, Styles
import { ModalWarningType2Props as Props } from './ModalWarningType2.types';
import componentStyles from './ModalWarningType2.styles';
//Images
import IconWarning from 'icons/IconWarning.svg';
//Componets
import Button from 'src/components/atoms/Button/Button';


/**
 * Render a ModalWarning.
 * @since 1.0.0
 */
const ModalWarningType2 = (props: Props) => {
  const { style, icon, onPress, isIconAlert, textButtonCancel, textButton, onPressCancel,
    warningText, styleBtn, styleBtnA, styleSubtitle, styleTextBtn, variantBtn = 'Contained', title } = props;
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]}>
      {isIconAlert && (<View style={styles.head}>
        <IconWarning />
      </View>)}
      {icon && (<View style={styles.head}>
        {icon}
      </View>)}
      {title && (<Text style={styles.title} maxFontSizeMultiplier={1.3}>
        {title}
      </Text>)}
      <Text style={[styles.text, styleSubtitle]} maxFontSizeMultiplier={1.3}>
        {warningText}
      </Text>
      <View style={{ marginTop: '4%', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        {onPressCancel && (<Button
          variant={'Outlined'}
          title={textButton ? textButton : t('common.accept')}
          style={[{ width: 130, backgroundColor: "#0069A7" }, styleBtnA]}
          textStyle={[styleTextBtn ? styleTextBtn : styles.secondaryText, { color: colors.WHITE }]}
          onPress={() => { onPress() }}
        />)}

        <Button
          variant={variantBtn}
          title={textButtonCancel ? textButtonCancel : t('common.cancel')}
          style={[styles.button, styleBtn]}
          textStyle={styleTextBtn ? styleTextBtn : styles.secondaryText}
          onPress={onPressCancel}
        />
      </View>
    </View>
  )
}

export default ModalWarningType2