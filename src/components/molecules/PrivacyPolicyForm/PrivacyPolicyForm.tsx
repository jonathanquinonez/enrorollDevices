import React, { useCallback } from 'react'
import { View, Text, Linking, Alert } from 'react-native'
import useStyles from 'hooks/useStyles';
import Button from 'src/components/atoms/Button/Button';
import componentStyles from '../PrivacyPolicyForm/PrivaciyPolicy.styles';
import { useTranslation } from 'react-i18next';
const supportedURL = "https://www.mysanitas.com/en/legal/privacy-policy";
const supportedURLEs = "https://www.mysanitas.com/es/legal/pol%C3%ADtica-de-privacidad";

const PrivacyPolicyFrom = () => {

  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(supportedURL);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(supportedURL);
    } else {
      Alert.alert(`Don't know how to open this URL: ${supportedURL}`);
    }
  }, [supportedURL]);

  const handlePressEs = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(supportedURLEs);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(supportedURLEs);
    } else {
      Alert.alert(`Don't know how to open this URL: ${supportedURLEs}`);
    }
  }, [supportedURLEs]);
  return (
    <>
      <View style={styles.container}>
        <View style={{
          marginTop: 100, marginLeft: 30,
          marginRight: 30
        }}>
          <Text style={styles.textstyle} maxFontSizeMultiplier={1.3}>{t('privacyPolicy.textPrivacy')}</Text>
          <View style={styles.justifyText}>
            <Button
              accessibilityRole='button'
              accesibilityHint={t('accessibility.privacyTextEn')}
              title={'Privacy Policy'}
              variant='Underline'
              textStyle={{ color: '#055293', fontSize: 16, paddingVertical: 8, paddingHorizontal: 5, fontFamily: 'proxima-bold'}}
              onPress={handlePress}
            />
          </View>
          <Text style={styles.textstyle} maxFontSizeMultiplier={1.3}>{t('privacyPolicyEs.textPrivacy')}</Text>
          <View style={styles.justifyText}>
            <Button
              accessibilityRole='button'
              accesibilityHint={t('accessibility.privacyTextEs')}
              title={'Política de Privacidad'}
              variant='Underline'
              textStyle={{ color: '#055293', fontSize: 16, paddingVertical: 8, paddingHorizontal: 5, fontFamily: 'proxima-bold'}}
              onPress={handlePressEs}
            />
          </View>
        </View>
      </View>
    </>
  )
}
export default PrivacyPolicyFrom

