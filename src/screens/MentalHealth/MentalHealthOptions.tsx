import React, { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Image, Text, Dimensions } from 'react-native';
import Card from 'src/components/molecules/Card/Card';
import Row from 'src/components/atoms/Row/Row';
import useStyles from 'hooks/useStyles';
import componentStyles from './MentalHealth';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalList from 'src/components/molecules/ModalList/ModalList';
import { ModalListOptions } from 'src/components/molecules/ModalList/ModalList.types';

export const MentalHealthOptions = () => {
    const { t } = useTranslation();
    const navigation: any = useNavigation();
    const { styles, colors } = useStyles(componentStyles);
    const { closeModal, setModal } = useBottomSheet();

    const needHelpOptions: ModalListOptions[] = [
        {
            name: 'needhelpMH.modalOption0',
            handlerAction: () => {
                closeModal();
                navigation.navigate('NeedHelpScreen', {
                    payload: {
                        phone: '1-800-799-SAFE',
                        phoneText: 'needhelpMH.modalOption0phone',
                        website: 'www.thehotline.org',
                        optionTitle: 'needhelpMH.modalOption0',
                    },
                });
            },
        },
        {
            name: 'needhelpMH.modalOption1',
            handlerAction: () => {
                closeModal();
                navigation.navigate('NeedHelpScreen', {
                    payload: {
                        phone: '988',
                        phoneText: 'needhelpMH.modalOption1phone',
                        website: 'www.988lifeline.org',
                        optionTitle: 'needhelpMH.modalOption1',
                    },
                });
            },
        },
        {
            name: 'needhelpMH.modalOption2',
            handlerAction: () => {
                closeModal();
                navigation.navigate('NeedHelpScreen', {
                    payload: {
                        phone: '1-800-962-2873',
                        phoneText: 'needhelpMH.modalOption2phone',
                        website: 'www.myflfamilies.com',
                        optionTitle: 'needhelpMH.modalOption2',
                    },
                });
            },
        },
        {
            name: 'needhelpMH.modalOption3',
            handlerAction: () => {
                closeModal();
                navigation.navigate('NeedHelpScreen', {
                    payload: {
                        phone: '1-800-985-5990',
                        phoneText: 'needhelpMH.modalOption3phone',
                        website: 'www.cdc.gov',
                        optionTitle: 'needhelpMH.modalOption3',
                    },
                });
            },
        },
        {
            name: 'needhelpMH.modalOption4',
            handlerAction: () => {
                closeModal();
                navigation.navigate('NeedHelpScreen', {
                    payload: {
                        phone: '911',
                        phoneText: 'needhelpMH.modalOption4phone',
                        website: 'www.911.gov',
                        optionTitle: 'needhelpMH.modalOption4',
                    },
                });
            },
        },
    ];

    const handlerNeedHelp = () => {
        setModal({
            render: () => <ModalList onPress={() => closeModal()} options={needHelpOptions} />,
            height: Dimensions.get('window').height * 0.65,
            blockModal: false,
        });
    };

    return (
        <ScrollView>
            <View style={{ width: '100%', padding: 5, marginTop: 45 }}>
                <Row style={{ flexDirection: 'row' }}>
                    <Card
                        style={[styles.containerCards, { minHeight: 162 }]}
                        icon={
                            <Image
                                style={{ width: 42.29, height: 45.32, marginBottom: 17 }}
                                source={require('assets/icons/MentalHealthIcons/About.png')}
                            />
                        }
                        title={t('about.title')}
                        subtitle={t('about.subCard')}
                        onPress={() => navigation.navigate('AboutScreen')}
                    />
                    <Card
                        style={[styles.containerCards, { minHeight: 162 }]}
                        icon={
                            <Image
                                style={{ width: 40, height: 48, marginBottom: 18 }}
                                source={require('assets/icons/MentalHealthIcons/Appointments.png')}
                            />
                        }
                        title={t('appointmentsMH.title')}
                        subtitle={t('appointmentsMH.subCard')}
                        onPress={() => navigation.navigate('AppointmentsScreen')}
                    />
                </Row>
                <Row style={{ flexDirection: 'row', marginVertical: 20 }}>
                    <Card
                        style={[styles.containerCards, { minHeight: 162 }]}
                        icon={
                            <Image
                                style={{ width: 54, height: 42.5, marginBottom: 6.5 }}
                                source={require('assets/icons/MentalHealthIcons/EducationalResources.png')}
                            />
                        }
                        title={t('educationalResoulce.title')}
                        subtitle={t('educationalResoulce.subCard')}
                        onPress={() => navigation.navigate('EducationalResources')}
                    />
                    <Card
                        style={[styles.containerCards, { minHeight: 162 }]}
                        icon={
                            <Image
                                style={{ width: 41.5, height: 46.5, marginBottom: 12.5 }}
                                source={require('assets/icons/MentalHealthIcons/NeedHelp.png')}
                            />
                        }
                        title={t('needhelpMH.optionTitle')}
                        subtitle={t('needhelpMH.optionSubtitle')}
                        onPress={() => handlerNeedHelp()}
                    />
                </Row>
                <Row style={{ flexDirection: 'row', paddingHorizontal: 5, marginBottom: 60 }}>
                    <Card
                        isHorizontal
                        icon={<Image
                            style={{ width: 41.5, height: 46.5, marginLeft: 10 }}
                            source={require('assets/icons/MentalHealthIcons/Selftools.png')}
                        />}
                        title={t('myHealth.screenSelfManagementTools.titleSelfManagementTools')}
                        subtitle={t('myHealth.screenSelfManagementTools.subTitleCardHome')}
                        onPress={() => navigation.navigate('SelfManagementToolsScreen')}
                    />
                </Row>
            </View>
        </ScrollView>
    );
};
