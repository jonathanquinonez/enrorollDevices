import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'

import { AboutList } from './AboutList';
import OnboardingMentalHealth from 'src/components/organisms/OnboardingMentalHealth/OnboardingMentalHealth';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { Dimensions } from 'react-native';


export const AboutScreen = () => {

  const { t } = useTranslation();
  const { setModal, closeModal } = useBottomSheet();

  const openOnboardingMentalHealth = () => {
    setModal({
      render: () => (<OnboardingMentalHealth onFinish={closeModal} />),
      height: Dimensions.get('screen').height * 0.55,
      blockModal: false
    })
  }

  return (
    <RootGeneral
      title={t('about.title')}
      subtitle={t('about.subTitle')}
      content={<AboutList onPress={openOnboardingMentalHealth} />}
      isButton={false}
    />
  )
}
