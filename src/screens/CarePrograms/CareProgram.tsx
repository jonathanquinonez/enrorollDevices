import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { CareProgramOption } from './CareProgramOptions'



/**
 * View options Booking
 * @returns 
 */
export const CareProgramScreen = () => {
  const { t } = useTranslation()
  return (
    <RootGeneral
     title= {t('care.careTitle')}
     subtitle = {t('care.careSub')}
     content = {<CareProgramOption />}
     isButton = {false} 
     isForm
    />
  )
}
