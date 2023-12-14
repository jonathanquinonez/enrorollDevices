import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalDisclaimerProps as Props } from './ModalDisclaimer.types';
import componentStyles from './ModalDisclaimer.styles';
import Button from 'src/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';

/**
 * Render a ModalDisclaimer.
 * @since 1.0.0
 */
const ModalDisclaimer = (props: Props) => {
  const { onPress, isLibrary } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation()


  return (
    <View style={styles.container}>
      <Text accessibilityRole='header' style={styles.title}>{t('onboardingMH.disclaimerTitle')}</Text>
      <Text style={styles.body}>{isLibrary ? t('onboardingMH.disLib') : t('onboardingMH.disclaimerSub')}</Text>
      <Button style={{marginBottom: 15}} accesibilityLabel={t('accessibility.btnCloseGeneral')} title={t('common.close')} onPress={onPress} />
    </View>
  )
}

export default ModalDisclaimer