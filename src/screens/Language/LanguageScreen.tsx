import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { LanguageOptions } from './LanguageOptions'
/**
 * View options MyHealth
 * @returns 
 */
export const LanguageScreen = () => {
  const { t } = useTranslation()
  return (
    <RootGeneral 
     title={t('language.title')}
     subtitle = {t('language.subTitle')}
     content = {<LanguageOptions/> } 
     isButton = {false} 
    />
  )
}
