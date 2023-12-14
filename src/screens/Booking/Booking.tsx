import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { BookingOptions } from './BookingOptions'
import { userSelectors } from 'adapter/user/userSelectors'
import { useAppSelector } from 'adapter/hooks'


/**
 * View options Booking
 * @returns 
 */
export const BookingScreen = () => {
  const { t } = useTranslation();
  const { isBeWell } = useAppSelector(userSelectors.selectIsBeWell);

  return (
    <RootGeneral
      isForm
      title={isBeWell ? t('appointmentMH.title') : t('appoiment.tittle')}
      subtitle={isBeWell ? t('appointmentMH.subTitle') : t('appoiment.subtittle')}
      content={<BookingOptions />}
      isButton={false}
    />
  )
}
