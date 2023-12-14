import React from 'react'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { MyInsuranceList } from './MyInsuranceList'
import { useTranslation } from 'react-i18next'

export const MyInsuranceScreen = () => {

  const { t } = useTranslation();
  return (
    <RootGeneral
    title={t('myInsurance.my')}
    subtitle = {t('myInsurance.detail')}
    content = {<MyInsuranceList/>}
    isButton = {false}
   />
  )
}
