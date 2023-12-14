import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { WellnessInstructionsOptions } from './WellnessInstructionsOptions'


/**
 * View options WellnessInstructions
 * @returns 
 */
export const WellnessInstructionsScreen = () => {
  const { t } = useTranslation();

  return (
    <RootGeneral
      isForm
      title={t('wellness.instructions.title')}
      subtitle={t('wellness.instructions.subTitle')}
      content={<WellnessInstructionsOptions />}
      isButton={false}
    />
  )
}
