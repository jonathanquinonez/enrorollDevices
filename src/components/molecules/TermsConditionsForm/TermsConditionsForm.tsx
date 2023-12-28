import { View, Text, Linking, Alert } from 'react-native'
import { ScrollTo, Target, ScrollView } from '@nandorojo/anchor'
import React, { useCallback, useState } from 'react'
import useStyles from 'hooks/useStyles';
import componentStyles from '../TermsConditionsForm/TermsConditionsForm.styles';
import { useTranslation } from 'react-i18next';

const supportedURL = "https://www.mysanitas.com/en/legal/privacy-policy";

const TermsConditionsForm = () => {
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();
  const [isEn, setIsEn] = useState(t('general.locale') == 'en' ? true : false)

  const handlePressMail = (async () => {
    await Linking.openURL('mailto:supportservices@mySanitas.com')
  })

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
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ marginTop: 20, right: 50 }}>
          {/* <ScrollTo target="botton-content-English"> */}
          <Text onPress={() => setIsEn(true)} style={styles.titlestylecontent} maxFontSizeMultiplier={1.3}>{t('termsEnglish.buttonEnglish')}</Text>
          {/* </ScrollTo> */}
          {/* <ScrollTo target="botton-content-Español"> */}
          <Text onPress={() => setIsEn(false)} style={styles.titlestylecontent} maxFontSizeMultiplier={1.3}>{t('termsEspañol.buttonEspañol')}</Text>
          {/* </ScrollTo> */}
        </View>
        {isEn ? <>
          {/* <Target name="botton-content-English"> */}
          <Text style={styles.titlestyle} maxFontSizeMultiplier={1.3}>{t('termsEnglish.titleEnglish')}</Text>
          <Text style={[styles.titlestyle, { fontSize: 14, marginTop: 5, marginBottom: -10 }]} maxFontSizeMultiplier={1.3}>{t('termsEnglish.termsVersion')}</Text>
          {/* </Target> */}

          <Text style={styles.textLine}>
            {t('termsEnglish.textEnglish1')}
            <Text style={styles.link} onPress={handlePress} maxFontSizeMultiplier={1.3}>{` ${t('termsEnglish.linkPP')} `}</Text>
            {t('termsEnglish.textEnglish2')}
            <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEnglish.emailS')} `}</Text>
            {t('termsEnglish.textEnglish3')}
            <Text style={styles.link} onPress={handlePress} maxFontSizeMultiplier={1.3}>{` ${t('termsEnglish.linkPP')} `}</Text>
            {t('termsEnglish.textEnglish4')}
            <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEnglish.emailS')} `}</Text>
            {t('termsEnglish.textEnglish5')}
            <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEnglish.emailS')} `}</Text>
            {t('termsEnglish.textEnglish6')}
          </Text>
        </> :
          <>
            <Target name="botton-content-Español">
              <Text style={styles.titlestyle} maxFontSizeMultiplier={1.3}>{t('termsEspañol.titleEspañol')}</Text>
              <Text style={[styles.titlestyle, { fontSize: 14, marginTop: 5, marginBottom: -10 }]} maxFontSizeMultiplier={1.3}>{t('termsEspañol.termsVersion')}</Text>
            </Target>
            <Text style={styles.textLine}>
              {t('termsEspañol.textEspañol1')}
              <Text style={styles.link} onPress={handlePress} maxFontSizeMultiplier={1.3}>{` ${t('termsEspañol.linkPP')} `}</Text>
              {t('termsEspañol.textEspañol2')}
              <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEspañol.emailS')} `}</Text>
              {t('termsEspañol.textEspañol3')}
              <Text style={styles.link} onPress={handlePress} maxFontSizeMultiplier={1.3}>{` ${t('termsEspañol.linkPP')} `}</Text>
              {t('termsEspañol.textEspañol4')}
              <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEspañol.emailS')} `}</Text>
              {t('termsEspañol.textEspañol5')}
              <Text style={styles.link} onPress={handlePressMail} maxFontSizeMultiplier={1.3}>{` ${t('termsEspañol.emailS')} `}</Text>
              {t('termsEspañol.textEspañol6')}
            </Text>
          </>
        }
      </ScrollView>
    </View>
  )
}
export default TermsConditionsForm;