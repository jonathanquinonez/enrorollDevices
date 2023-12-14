import React, { useState } from 'react';
import { FlatList, View, Text, Linking, PlatformColor, Platform, Image } from 'react-native';
import useStyles from 'hooks/useStyles';

//Components

//Types


//Styles
import componentStyles from './RootBody.styles';
import Row from 'src/components/atoms/Row/Row';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../Card/Card';

//Icons
import MyHealth from 'assets/images/icons/my_health.svg';
import Appointments from 'assets/images/icons/appointments.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
//images
import Menu1Icon from 'assets/icons/GetCare.svg';
import { userActions } from 'adapter/user/userSlice';

const RootBody = () => {

    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const { navigate }: any = useNavigation();
    const { ecwId } = useAppSelector(userSelectors.selectUser);
    const dispatch = useAppDispatch();
    const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

    return (
        <View style={styles.layout}>
            {Platform.OS === 'ios' ?
                <>
                    <LinearGradient style={styles.block_position} colors={['#00B4E3', '#61B73A']} start={[0, 1]} end={[1, 0]}>
                        <View style={styles.block_number}>
                            <Text style={styles.block_text} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} allowFontScaling={false}>{t('home.accountNumber')}{ecwId}</Text>
                        </View>
                    </LinearGradient>
                </>
                :
                <>
                    <LinearGradient style={styles.block_position} colors={['#00B4E3', '#61B73A']} start={[0, 1]} end={[1, 0]}>
                        <View style={styles.block_number}>
                            <Text style={styles.block_text} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} allowFontScaling={false}>{t('home.accountNumber')}{ecwId}</Text>
                        </View>
                    </LinearGradient>
                    <LinearGradient
                        colors={[colors.GRAY_LIGHT_4, 'transparent']}
                        locations={[0.3, 0.9]}
                        style={styles.shadow}
                    />
                </>
            }

            <ScrollView >
                <View style={{ flex: 1, marginVertical: 25, paddingBottom: 30, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                    <Row style={{ flexDirection: 'row', paddingBottom: 5 }}>
                        <Card icon={<Menu1Icon height={60} style={{ marginBottom: 2 }} />} title={t('home.get')} subtitle={t('home.start')} onPress={() => { navigate('GetCareScreen') }} />
                        <Card icon={<Appointments height={70} />} title={t('home.apoint')} subtitle={t('home.book')} onPress={() => { dispatch(userActions.setIsBeWell(false)); navigate('BookingScreen') }} />
                    </Row>
                    <Row style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Card icon={<MyHealth height={60} />} title={t('home.My')} subtitle={t('home.access')} onPress={() => { navigate('MyHealthScreen') }} />
                        {locationSelected == 'FL' ?
                            <Card
                                icon={<Image style={{ width: 56, height: 49, marginBottom: 10 }} source={require('assets/icons/MentalHealthIcons/Mental.png')} />}
                                title={t('home.titleCard')}
                                subtitle={t('home.mentalHealthSub')}
                                onPress={() => navigate('MentalHealthScreen')} /> :
                            <></>}
                        {locationSelected == 'TN' ?
                            <Card
                                icon={<Image style={{ width: 60, height: 60, marginBottom: 10 }} resizeMode='contain' source={require('assets/icons/MentalHealthIcons/iconWellnessMenu.png')} />}
                                title={t('wellness.cardTitle')}
                                subtitle={t('wellness.cardSubTitle')}
                                onPress={() => navigate('WellnessScreen')} /> : <></>}
                    </Row>
                    <Row style={{ flexDirection: 'row', marginVertical: 15, paddingHorizontal: 5 }}>
                        {locationSelected == 'FL' ?
                            <Card
                                isHorizontal
                                styleIcon={{ marginRight: 20 }}
                                icon={<Image style={{ width: 54, height: 35, marginLeft: 5 }} source={require('assets/icons/MentalHealthIcons/iconWellnessMenu.png')} />}
                                title={t('wellness.cardTitle')}
                                subtitle={t('wellness.cardSubTitle')}
                                onPress={() => navigate('WellnessScreen')} /> : <></>}
                    </Row>
                </View>
            </ScrollView>
        </View>
    )
}


export default RootBody;