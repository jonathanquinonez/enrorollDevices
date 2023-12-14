import React from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { UpdateMyInsurance } from './UpdateMyInsurance';

export const UpdateScreen = () => {

  const { t } = useTranslation();
  return (
    <RootGeneral
    title={t('myInsurance.my')}
    subtitle = {t('myInsurance.detail')}
    isForm
    content = {<UpdateMyInsurance/>}
    isButton = {false}
   />
  )
}
