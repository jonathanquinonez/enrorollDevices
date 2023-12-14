import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import FORMATS from 'ui-core/utils/formats';
import { MedicationList } from './MedicationList';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';


export const MedicationScreen = () => {

  const { t } = useTranslation();
  const { firstName, ecwId } = useAppSelector(userSelectors.selectUser);
  const [fetchMedicaton] = EcwService.useFetchMedicatonMutation();
  const { setAlertErrorMessage } = useErrorAlert();
  const [data, setData] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showData, setShowData] = useState([]);
  const [showData2, setShowData2] = useState([]);
  const [activeFilterByDate, setActiveFilterByDate] = useState(false);

  const handlerData = useCallback(
    async () => {
      try {
        if (ecwId) {
          const dataReferals: never[] = await fetchMedicaton(ecwId).unwrap();
          const newData = [...dataReferals].sort((a: any, b: any) => moment(b.startDate, FORMATS.date).diff(moment(a.startDate, FORMATS.date)))
          setShowData(newData);
          setData(newData);
        }
      } catch (error) {
        if (error != '999') setAlertErrorMessage('Error: ' + error);
      }
    },
    [fetchMedicaton, ecwId],
  );

  useEffect(() => {
    handlerData()
  }, []);

  const filterFunction = (filteredData: never[], value: string) => {
    return filteredData.filter((ref: any) => ref.medicationName.toLowerCase().includes(value.toLowerCase()))
  }

  const filterBySearch = (search: string) => {
    setSearchValue(search);
    if (activeFilterByDate) {
      if (!showData2) return;
      if (!search) return setShowData(showData2);
      return setShowData(filterFunction(showData2, search));
    } else {
      if (!data) return;
      if (!search) return setShowData(data);
      return setShowData(filterFunction(data, search));
    }
  };

  const handleFilterChange = useCallback(
    (from: Moment, to: Moment) => {
      if (!data) return setActiveFilterByDate(false);
      if (!from) {
        if (searchValue) {
          setShowData(filterFunction(data, searchValue));
        } else {
          setShowData(data);
        }
        return setActiveFilterByDate(false);
      };
      setActiveFilterByDate(true);
      const fromDate = from.startOf('day');
      const toDate = to.endOf('day');
      const filteredData = data.filter((ref: any) => {
        const currentDate = moment(ref.startDate, FORMATS.date);
        return currentDate.isBetween(fromDate, toDate, undefined, '[]');
      });
      if (searchValue) {
        setShowData(filterFunction(filteredData, searchValue));
        setShowData2(filteredData);
      } else {
        setShowData(filteredData);
        setShowData2(filteredData);
      }
    },
    [data, searchValue],
  );


  return (
    <RootGeneral
      title={t('myHealth.medi')}
      subtitle={t('myHealth.textMediD1')}
      data={data}
      isForm
      showData={showData}
      content={<MedicationList data={showData} totalData={data.length} />}
      filterComponent={handleFilterChange}
      filterBySearch={filterBySearch}
    />
  )
}
