import React from 'react'
import { View, Platform, TouchableOpacity } from "react-native";
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { FaceIdProps as Props } from './FaceId.types';
import componentStyles from './FaceId.styles';
// Images
import UseTouchId from 'icons/usetouchid.svg';
import UseTouchIdEs from 'icons/usetouchidEs.svg';
import UseFaceId from 'icons/usefaceid.svg';
import UseFaceIdEs from 'icons/UseFaceIdEs.svg';
import i18n from 'i18n/i18n';
import { useTranslation } from 'react-i18next';


/**
 * Render a FaceId.
 * @since 1.0.0
 */
const FaceId = (props: Props) => {
  const { onPress } = props;
  const { styles } = useStyles(componentStyles);
  const lang = i18n.language.includes('es') ? 'es' : 'en';
	const { t } = useTranslation();

  const iconFaceOs = () =>{
    return( lang === 'es' ? <UseFaceIdEs/> : <UseFaceId/> )
  }
  const iconFaceAn = () =>{
    return( lang === 'es' ? <UseTouchIdEs/> : <UseTouchId/> )
}
  return (
    <TouchableOpacity 
      accessibilityLabel={Platform.OS === "ios" ? t('accessibility.faceId') : t('accessibility.fingerprint')} 
      accessibilityHint={Platform.OS === "ios" ? "Face id" : "fingerprint"} 
      onPress={onPress}>
      <View style={styles.container}>{
        Platform.OS === "ios" ?
        iconFaceOs() 
          :
        iconFaceAn()
      }
      </View>
    </TouchableOpacity>
  )
}

export default FaceId