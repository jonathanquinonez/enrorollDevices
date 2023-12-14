import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
//Translate
import { useTranslation } from 'react-i18next';
// Types, Styles
import { ModalUnblockProps as Props } from './ModalUnblock.types';
import componentStyles from './ModalUnblock.styles';
//Images
import IconWarning from 'icons/IconWarning.svg';
//Componets
import Button from 'src/components/atoms/Button/Button';


/**
 * Render a ModalWarning.
 * @since 1.0.0
 */
const ModalUnblock = (props: Props) => {
  const { style, icon, onPress, isIconAlert, 
    textButton, 
    warningText, 
    warningText2, 
    styleBtn, 
    styleTextBtn, 
    variantBtn = 'Contained', 
    primaryText, 
    onPrimaryPress, variant, buttonStyle  } = props;

  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <View style={[styles.container, style]}>
      {isIconAlert && (<View style={styles.head}>
        <IconWarning />
      </View>)}
      {icon && (<View style={styles.head}>
        {icon}
      </View>)}
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>
        {warningText}
      </Text>
      {warningText2 && (<Text style={styles.text2} maxFontSizeMultiplier={1.3}>
        {warningText2}
      </Text>)}
      <Button
            variant={variant}
            style={[styles.button, buttonStyle]}
            title={primaryText ? primaryText : t(`unblockAccount.continue`)}
            onPress={onPrimaryPress}
        />
      <Button
        variant={variantBtn}
        title={textButton ? textButton : t(`unblockAccount.cancel`)}
        style={[styles.button, styleBtn]}
        textStyle={ styleTextBtn ? styleTextBtn : styles.secondaryText }
        onPress={() => { onPress() }}
      />
    </View>
  )
}

export default ModalUnblock