import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'

import { SelfManagementToolsList } from './SelfManagementToolsList';


export const SelfManagementToolsScreen = () => {  
  const { t } = useTranslation();

  return (
    <RootGeneral
      title={t('myHealth.screenSelfManagementTools.titleSelfManagementTools')}
      subtitle={t('myHealth.screenSelfManagementTools.subTitleSelfManagementTools')}
      content={<SelfManagementToolsList />}
      isButton={false}
    />
  )
}
