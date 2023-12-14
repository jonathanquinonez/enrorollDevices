import { Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import Row from 'src/components/atoms/Row/Row';
import Header from '../Header/Header';
import componentStyles from './HeaderLogin.styles';
import useStyles from 'hooks/useStyles';
import DeviceInfo from 'react-native-device-info';
import Config from "react-native-config";

const HeaderLogin = () => {
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();
  const appVersion = DeviceInfo.getVersion();


  return (
    <LinearGradient
      colors={['#0069A7', '#034268']}
      style={styles.linearGradient}
      locations={[0, 0.9]}
    >
      <Header />
      <Row style={{ alignContent: 'flex-start', alignItems: 'center' }} >
        <Text accessibilityRole='header' style={styles.textTitle} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('login.welcome')}</Text>
        {Config?.APP_ENV == 'prd' ?
          <Text style={styles.textSub} numberOfLines={1} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('login.version')} {appVersion}</Text>
          : <Text style={styles.textSub} numberOfLines={1} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('login.version')} {appVersion} - {Config.APP_ENV}</Text>}
      </Row>
    </LinearGradient>
  )
}

export default HeaderLogin