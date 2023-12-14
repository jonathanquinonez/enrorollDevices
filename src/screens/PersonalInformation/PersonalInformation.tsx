import React from 'react'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { PersonalInformationList } from './PersonalInformationList'
import { useTranslation } from 'react-i18next'

export const PersonalInformationScreen = () => {

  const { t } = useTranslation();
  return (
    <RootGeneral
    title={t('personalInformation.personalInformation')}
    subtitle = {t('personalInformation.manage')}
    content = {<PersonalInformationList/>}
    isButton = {false}
   />
  )
}
