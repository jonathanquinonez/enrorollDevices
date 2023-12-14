import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import FORMATS from 'ui-core/utils/formats';
import { InmmunizationList } from './InmmunizationList';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useLoading } from 'src/components/organisms/LoadingProvider/LoadingProvider';


export const InmmunizationScreen = () => {

  const { t } = useTranslation();
  const { firstName, ecwId } = useAppSelector(userSelectors.selectUser);
  const [fetchInmunization] = EcwService.useFetchInmunizationMutation();
  const { setAlertErrorMessage } = useErrorAlert();
  const [data, setData] = useState([])
  const [showData, setShowData] = useState([]);
  const { setLoading } = useLoading();
  const handlerData = useCallback(
    async () => {
      try {
        setLoading(true);
        if(ecwId){
          const dataReferals: never[] = await fetchInmunization(ecwId).unwrap();
          const newData = [...dataReferals].sort((a: any, b: any) => moment(b.givenDate, FORMATS.date).diff(moment(a.givenDate, FORMATS.date)))
          setShowData(newData);
          setData(newData);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setAlertErrorMessage('Error: ' + error);
      }
    },
    [fetchInmunization, ecwId],
  );

  useEffect(() => {
    handlerData()
  }, []);

  const handleFilterChange = useCallback(
    (from: Moment, to: Moment) => {
      if (!data) return;
      if (!from) return setShowData(data);
      const fromDate = from.startOf('day');
      const toDate = to.endOf('day');
      const filteredData = data.filter((inm: any) => {
        const currentDate = moment(inm.givenDate, FORMATS.date);
        return currentDate.isBetween(fromDate, toDate, undefined, '[]');
      });
      return setShowData(filteredData);
    },
    [data],
  );


  return (
    <RootGeneral
      title={t('myHealth.myInm')}
      subtitle={t('myHealth.textInmmD')}
      data={data}
      showData={showData}
      content={<InmmunizationList data={showData} totalData={data.length} />}
      filterComponent={handleFilterChange}
    />
  )
}
