import React from 'react'

import Menu1Icon from 'icons/menu1.svg';
import Menu2Icon from 'icons/menu2.svg';
import Menu3Icon from 'icons/menu3.svg';
import Menu4Icon from 'icons/menu4.svg';
import Menu5Icon from 'icons/menuMedication.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View } from 'react-native'
import Card from 'src/components/molecules/Card/Card'
import Row from 'src/components/atoms/Row/Row';
import useStyles from 'hooks/useStyles';
import componentStyles from './MyHealth.styles';

export const MyHealthOptions = () => {

    const { t } = useTranslation()
    const navigation = useNavigation();
    const { styles, colors } = useStyles(componentStyles);

    return (

        <ScrollView>
            <View style={{ width: '100%', padding: 10, paddingTop: 40 }}>
                <Row style={{ flexDirection: 'row' }}>
                    <Card
                        style={styles.containerCards}
                        icon={<Menu3Icon />}
                        title={t('myHealth.myLabs')}
                        subtitle={t('myHealth.textLabD1')}
                        onPress={() => { navigation.navigate('LabScreen') }} />
                    <Card
                        style={styles.containerCards}
                        icon={<Menu1Icon />}
                        title={t('myHealth.ref')}
                        subtitle={t('myHealth.textRefeD1')}
                        onPress={() => { navigation.navigate('ReferalsScreen') }} />

                </Row>
                <Row style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <Card
                        style={styles.containerCards}
                        icon={<Menu5Icon />}
                        title={t('myHealth.medi')}
                        subtitle={t('myHealth.textMediD1')}
                        onPress={() => { navigation.navigate('MedicationScreen') }} />
                    <Card
                        style={styles.containerCards}
                        icon={<Menu2Icon />}
                        title={t('myHealth.regis')}
                        subtitle={t('myHealth.textRegD1')}
                        onPress={() => { navigation.navigate('RegistryScreen') }} />

                </Row>
                <Row style={{ width: '50%', alignSelf: 'center', marginBottom: 40 }}>
                    <Card
                        style={styles.containerCards}
                        icon={<Menu4Icon />}
                        title={t('myHealth.myInm')}
                        subtitle={t('myHealth.textInmmD1')}
                        onPress={() => { navigation.navigate('InmmunizationScreen') }} />
                    <View style={{ marginVertical: 5, marginBottom: 40 }} />
                </Row>
            </View>
        </ScrollView>
    )
}
