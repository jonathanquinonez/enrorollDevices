import { View, Text, Platform } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import useStyles from 'hooks/useStyles'
import TimesCircle from 'icons/TimesCircle.svg';
import componentStyles from './TwoFactorHeader.styles'
import BreadCrumb from 'src/components/atoms/BreadCrumb/BreadCrumb'
import Row from 'src/components/atoms/Row/Row'
import Header from 'src/components/molecules/Header/Header';
import Column from 'src/components/atoms/Column/Column';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Icon from 'src/components/atoms/Icon/Icon';

const TwoFactorHeader = ({children}: any) => {

  const navigation = useNavigation();
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();

  return (
    <>
      <Row style={{flex:1, width: '100%'}}>
        <LinearGradient
          colors={[colors.primary, colors.BLUE8AF]}
          locations={[0, 0.9]}
          style={styles.container}
        >
          <Header logoWithoutText iconLeft={<TimesCircle />} onPressLeft={() => {
            navigation.dispatch({
              type: 'RESET',
              payload: {
                  routes: [{ name: 'Login' }],
                  index: 0,
              },
            });
          }} showLine/>
          <Row style={styles.contentBreadCrumb}>
            <BreadCrumb
              styleText={styles.breadCrumbText}
              breadcrumbList={[
                { label: t('createAccount.navigateText.login'), route: 'Login' },
                { label: t('login.twoFactorAuthentication.titleHeader') },
              ]}
            />
          </Row>
        </LinearGradient>
      </Row>
      <Row width={2} style={styles.containerPagination}>
        <Column width={1} style={styles.layout}>
          {Platform.OS === 'ios' ?
            <>
              <IconButton style={styles.iconButton} variant="Float" icon={<Icon name={'arrow-left'} />} onPress={() => navigation.goBack()} />
            </>
            :
            <LinearGradient
              colors={[colors.GRAY_LIGHT_4, 'transparent']}
              locations={[0.5, 0.9]}
              style={styles.shadow}
            >
              <IconButton style={styles.iconButton} variant="Float" icon={<Icon name={'arrow-left'} />} onPress={() => navigation.goBack()} />
            </LinearGradient>
          }
          {children}
        </Column>
      </Row>
    </>
  )
}

export default TwoFactorHeader