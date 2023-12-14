import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { EnrollDeviceOption } from './EnrollDeviceOptions'



/**
 * View options Booking
 * @returns 
 */
const EnrollDevice = () => {
  const { t } = useTranslation()
  return (
    <RootGeneral
     title= {t('notifications.EnrollDevice.title')}
     subtitle = {t('notifications.EnrollDevice.subTitle')}
     content = {<EnrollDeviceOption />}
     isButton = {false} 
     isForm
    />
  )
}

export default EnrollDevice;
