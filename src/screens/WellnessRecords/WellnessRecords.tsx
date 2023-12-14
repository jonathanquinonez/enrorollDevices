import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { WellnessRecordsOptions } from './WellnessRecordsOptions'


/**
 * View options WellnessRecords
 * @returns 
 */
export const WellnessRecordsScreen = () => {
  const { t } = useTranslation();

  return (
    <RootGeneral
      isForm
      title={t('wellness.records.title')}
      subtitle={t('wellness.records.subTitle')}
      content={<WellnessRecordsOptions />}
      isButton={false}
    />
  )
}
