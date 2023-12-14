import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'

import { AppointmentsOptions } from './AppointmentsOptions'
/**
 * View options MyHealth
 * @returns 
 */
export const AppointmentsScreen = () => {
  const { t } = useTranslation();
  
  return (
    <RootGeneral
      title={t('appointmentsMH.title')}
      subtitle={t('appointmentsMH.subTitle')}
      content={<AppointmentsOptions />}
      isButton={false}
    />
  )
}
