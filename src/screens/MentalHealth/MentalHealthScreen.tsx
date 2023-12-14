import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { MentalHealthOptions } from './MentalHealthOptions'
import UsersService from 'adapter/api/usersService'
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider'
import OnboardingMentalHealth from 'src/components/organisms/OnboardingMentalHealth/OnboardingMentalHealth';
import ModalDisclaimer from 'src/components/molecules/ModalDisclaimer/ModalDisclaimer';
import { userSelectors } from 'adapter/user/userSelectors'
import { useAppSelector } from 'adapter/hooks'
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider'
import { Dimensions } from 'react-native'

/**
 * View options MentalHealth
 * @returns 
 */
export const MentalHealthScreen = () => {
  const { t } = useTranslation()
  const [onboardingValueByEmail] = UsersService.useOnboardingValueByEmailMutation()
  const [updateOnboardingByEmail] = UsersService.useUpdateOnboardingByEmailMutation()
  const userInfo = useAppSelector(userSelectors.selectUser);
  const { setAlertErrorMessage } = useErrorAlert();

  const { closeModal, setModal } = useBottomSheet();

  const onFinish = useCallback(async () => {
    try {
      console.log('--->>>>>')
      await updateOnboardingByEmail({ email: userInfo.email, state: userInfo.state }).unwrap();
      closeModal();
    } catch (error) {
      closeModal();
      setAlertErrorMessage(t(`errors.code${error}`))
    }
  }, [updateOnboardingByEmail])

  const openOnboardingMentalHealth = (statusOnboarding: boolean) => {
    closeModal();
    if (statusOnboarding) setTimeout(() => {
      setModal({
        render: () => (<OnboardingMentalHealth onFinish={onFinish} />),
        height: 570,
        blockModal: true
      })
    }, 300);
  }

  const getOnboardingValue = useCallback(async () => {
    try {
      const resp = await onboardingValueByEmail({ email: userInfo.email, state: userInfo.state }).unwrap();
      setModal({
        render: () => (<ModalDisclaimer onPress={() => openOnboardingMentalHealth(!Boolean(resp))} />),
        height: Dimensions.get('screen').height * 0.5,
        blockModal: true
      });
    } catch (error) {
      setAlertErrorMessage(t(`errors.code${error}`))
    }
  }, [onboardingValueByEmail])

  useEffect(() => {
    getOnboardingValue()
  }, [])

  return (
    <RootGeneral
      isForm
      title={t('home.mentalHealthTitle')}
      subtitle={t('home.mentalHealthSubGeneral')}
      content={<MentalHealthOptions />}
      isButton={false}
    />
  )
}
