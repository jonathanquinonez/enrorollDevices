import { useAppDispatch } from 'adapter/hooks'
import { userActions } from 'adapter/user/userSlice'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { GetCareOptions } from './GetCareOptions'
/**
 * View options MyHealth
 * @returns 
 */
export const GetCareScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  dispatch(userActions.setPaymentResponse(undefined))
  return (
    <RootGeneral
      title={t('getCareNow.title')}
      subtitle={t('getCareNow.subTitle')}
      content={<GetCareOptions />}
      isButton={false}
    />
  )
}
