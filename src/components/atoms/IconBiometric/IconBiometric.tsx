import React from 'react'
import { View, Platform, Text } from "react-native";
// Hooks
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
// Types, Styles
import { IconBiometricProps as Props } from './IconBiometric.types';
import componentStyles from './IconBiometric.styles';
// Images
import UseFaceId from 'icons/ic_faceid.svg';
import UseTouchId from 'icons/ic_fingerprint.svg';

import Row from 'src/components/atoms/Row/Row';
import Button from '../Button/Button';



/**
 * Render a FaceId.
 * @since 1.0.0
 */
const IconBiometric = (props: Props) => {

  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();


  return (
    <View>{
      Platform.OS === "ios" ?
        <View style={styles.containerForm}>
          <UseFaceId />
          <Text style={styles.textTitle} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('buttonShettAutBiometric.titleFaceId')}</Text>
          <Text style={styles.textDescription} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('buttonShettAutBiometric.description')} </Text>
        </View>
        :
        <View style={styles.containerForm}>
          <UseTouchId />
          <Text style={styles.textTitle} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('buttonShettAutBiometric.titleFinger')}</Text>
          <Text style={styles.textDescription} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('buttonShettAutBiometric.description')}</Text>
        </View>
    }
    </View>
  )
}

export default IconBiometric