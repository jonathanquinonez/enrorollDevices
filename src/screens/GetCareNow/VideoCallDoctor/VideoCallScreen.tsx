import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import VideoCallRegistry from './VideoCallRegistry'
/**
 * View options MyHealth
 * @returns 
 */
export const VideoCallScreen = () => {
  const { t } = useTranslation()
  return (
    <RootGeneral
      title={t('getCareNow.videoCall.title')}
      subtitle={t('getCareNow.videoCall.subTitle')}
      content={<VideoCallRegistry />}
      isButton={false}
    />
  )
}
