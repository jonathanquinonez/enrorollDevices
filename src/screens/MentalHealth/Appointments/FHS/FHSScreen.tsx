import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'

import { FHSList } from './FHSList';


export const FHSScreen = () => {
  const { t } = useTranslation();

  return (
    <RootGeneral 
      title={ t("myHealth.screenFloridaHealthcare.titleFloridaHealthcare") }
      subtitle={ t("myHealth.screenFloridaHealthcare.subTitleFloridaHealthcare")}
      content={<FHSList />}
      isButton={false}
    />
  )
}
