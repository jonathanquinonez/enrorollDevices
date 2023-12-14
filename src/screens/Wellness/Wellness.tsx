import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { WellnessOptions } from './WellnessOptions'


/**
 * View options Wellness
 * @returns 
 */
export const WellnessScreen = () => {
  const { t } = useTranslation();

  return (
    <RootGeneral
      isForm
      title={t('wellness.cardTitle')}
      subtitle={t('wellness.cardSubTitle')}
      content={<WellnessOptions />}
      isButton={false}
    />
  )
}
