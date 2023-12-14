import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, View, Image, Text, Platform } from 'react-native'

//components
import Card from 'src/components/molecules/Card/Card'
import Row from 'src/components/atoms/Row/Row';
//transaltion and navigation
import componentStyles from './AppointmentsOptions.styles';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Button from 'src/components/atoms/Button/Button';
import QuestionCircle from 'icons/MentalHealthIcons/Appointments/question-circle.svg';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { userActions } from 'adapter/user/userSlice';
import { useAppDispatch } from 'adapter/hooks';

export const AppointmentsOptions = () => {
  const { t } = useTranslation()
  const { styles } = useStyles(componentStyles);
  const { navigate }: any = useNavigation();
  const { setModal, closeModal } = useBottomSheet();
  const dispatch = useAppDispatch();

  const navigateAppointments = () => {
    dispatch(userActions.setIsBeWell(true));
    navigate('BookingScreen')
  }

  const openModalNotSure = () => {
    setModal({
      render: () => (
        <ModalWarning
          title={t(`appointmentsMH.btnSure`)}
          warningText={
            <View style={styles.viewModal}>
              <Text style={styles.fontBold}>{t(`appointmentsMH.textFsh`)}</Text>
              <Text style={styles.textCenter}>{t(`appointmentsMH.subTitleModalFsh`)}</Text>
              <Text style={styles.textBeWell}>{t(`appointmentsMH.textBeWell`)}</Text>
              <Text style={styles.textCenter}>{t(`appointmentsMH.subTitleModalBeWell`)}</Text>
            </View>
          }
          textButton={t(`appointmentsMH.btnClose`)}
          variantBtn={"Underline"}
          styleTitle={{ fontSize: 20 }}
          styleSubtitle={Platform.OS === 'ios' ? styles.modalSubTitleIos : styles.viewModal}
          styleTextBtn={styles.modalBtn}
          colorTextBtn='#0071A3'
          onPress={() => { closeModal() }}
        />
      ), height: 390, blockModal: false
    });
  }

  return (
    <ScrollView>
      <View style={styles.viewContent}>
        <Row style={styles.flexDirect}>
          <View style={styles.marginV} />
          <Card icon={<Image style={styles.img} source={require('assets/icons/MentalHealthIcons/Appointments/1.png')} />}
            title={t('appointmentsMH.card1Title')}
            styleTitle={styles.fontEighteen}
            styleSub={styles.fontTwelve}
            subtitle={t('appointmentsMH.card1subTitle')}
            onPress={() => navigateAppointments()} />
          <View style={styles.marginV} />
          {/* <Card icon={<Image style={styles.img} source={require('assets/icons/MentalHealthIcons/Appointments/2.png')} />}
            title={t('appointmentsMH.card2Title')}
            styleTitle={styles.fontEighteen}
            styleSub={styles.fontTwelve}
            subtitle={t('appointmentsMH.card2subTitle')}
            onPress={() => navigate('FHSScreen')} />
          <View style={styles.marginVFourteen} />
          <Button
            accessibilityRole='link'
            onPress={openModalNotSure}
            textStyle={styles.textBtn}
            title={t('appointmentsMH.btnSure')}
            icon={<QuestionCircle />}
            variant='Underline' /> */}
          <View style={styles.viewEnd} />
        </Row>
      </View>
    </ScrollView >
  )
}