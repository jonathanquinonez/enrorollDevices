import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'

import { EducationalResourcesOptions } from './EducationalResourcesOptions'
/**
 * View options MyHealth
 * @returns 
 */
export const EducationalResources = () => {
  const { t } = useTranslation();
  
  return (
    <RootGeneral
      title={t('educationalResoulce.title')}
      subtitle={t('educationalResoulce.subTitle')}
      content={<EducationalResourcesOptions />}
      isButton={false}
    />
  )
}
