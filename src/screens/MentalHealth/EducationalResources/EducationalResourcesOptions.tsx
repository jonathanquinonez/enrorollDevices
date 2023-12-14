import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Image } from 'react-native'
//icons
import Call from 'icons/Call.svg';
//components
import Card from 'src/components/molecules/Card/Card'
import Row from 'src/components/atoms/Row/Row';
//transaltion and navigation
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalDisclaimer from 'src/components/molecules/ModalDisclaimer/ModalDisclaimer';

export const EducationalResourcesOptions = () => {
  const { t } = useTranslation()
  const { navigate }: any = useNavigation();
	const { closeModal, setModal } = useBottomSheet();

  const messageModal = () => {
    setModal({
      render: () => (<ModalDisclaimer isLibrary onPress={() => {
        closeModal()
        navigate('SymtomsView', { action: 'LIFESTYLE_LIB' })
      }} />),
      height: 395,
      blockModal: false
    });
  }

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10, marginTop: 30 }}>
        <Row style={{ flexDirection: 'column' }}>
          <View style={{ marginVertical: 5 }} />
          {/* <Card icon={<Image style={{ width: 50, height: 48, marginBottom: 5 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/2.png')} />}
            title={t('educationalResoulce.titleCard1')}
            styleTitle={{ fontSize: 18 }}
            styleSub={{ fontSize: 12 }}
            subtitle={t('educationalResoulce.subTitleCard1')}
            onPress={() => messageModal()} /> */}
          {/* <View style={{ marginVertical: 5 }} /> */}
          <Card icon={<Image style={{ width: 37.6, height: 49.4, marginBottom: 5 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/1.png')} />}
            title={t('educationalResoulce.titleCard2')}
            styleTitle={{ fontSize: 18 }}
            styleSub={{ fontSize: 12 }}
            subtitle={t('educationalResoulce.subTitleCard2')}
            onPress={() => navigate('OtherResourcesScreen')} />
          <View style={{ marginVertical: 5, marginBottom: 60 }} />
        </Row>
      </View>
    </ScrollView >
  )
}