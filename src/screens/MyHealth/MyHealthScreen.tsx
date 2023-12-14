import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { MyHealthOptions } from './MyHealthOptions'


/**
 * View options MyHealth
 * @returns 
 */
export const MyHealthScreen = () => {
  const { t } = useTranslation()
  return (
    <RootGeneral
     title= {t('myHealth.myHealth')}
     subtitle = {t('myHealth.access')}
     content = {<MyHealthOptions/>}
     isButton = {false} 
    />
  )
}
