import EcwService from 'adapter/api/ecwService';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import FORMATS from 'ui-core/utils/formats';
import { RegistryList } from './RegisterList';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import moment from 'moment';
import { useLoading } from 'src/components/organisms/LoadingProvider/LoadingProvider';

export const RegistryScreen = () => {
	const { t } = useTranslation();

	const [fetchRegistries] = EcwService.useFetchRegistriesMutation();
	const { firstName, ecwId } = useAppSelector(userSelectors.selectUser);
	const { setAlertErrorMessage } = useErrorAlert();
	const [data, setData] = useState([])
	const [ageDate, setDate] = useState({})
	const [persistentData, setPersistentData] = useState([])
	const [showData, setShowData] = useState([]);
	const { setLoading } = useLoading();


	const handlerData = async (data: any) => {
		setDate(data);
		try {
			setLoading(true);
			const dataReferals: never[] = await fetchRegistries(data.values).unwrap();
			const newData = [...dataReferals].sort((a: any, b: any) => moment(b.appointmentDate, FORMATS.date2).diff(moment(a.appointmentDate, FORMATS.date2)))
			if (data.saveData && newData.length) setPersistentData(newData);
			setShowData(newData);
			setData(newData);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error != '999') setAlertErrorMessage('Error: ' + error);
		}
	}

	useEffect(() => {
		const currentDate = new Date().setMonth(new Date().getMonth() - 12);
		handleFilterChange1(moment(currentDate), moment(new Date()))
	}, []);

	const handleFilterChange1 = useCallback(
		(from: Moment, to: Moment) => {
			if (!data) return;
			if (!from) return setData(persistentData);
			const fromDate = from.startOf('day');
			const toDate = to.endOf('day');
			if (ecwId) {
				handlerData({
					values: {
						beginDate: fromDate.format(FORMATS.dateISO8601),
						endDate: toDate.format(FORMATS.dateISO8601),
						ecwId,
					},
					saveData: true
				})
			}
		},
		[ecwId, persistentData],
	);
	const handleFilterChange = useCallback(
		(from: Moment, to: Moment) => {
			if (!data) return;
			if (!from) return setData(persistentData);
			const fromDate = from.startOf('day');
			const toDate = to.endOf('day');
			if (ecwId) {
				handlerData({
					values: {
						beginDate: fromDate.format(FORMATS.dateISO8601),
						endDate: toDate.format(FORMATS.dateISO8601),
						ecwId,
					},
					saveData: false
				})
			}
		},
		[ecwId, persistentData],
	);

	return (
		<RootGeneral
			title={t('myHealth.regis')}
			subtitle={t('myHealth.textRegD')}
			data={data}
			showData={data}
			content={<RegistryList data={data} dates={ageDate} totalData={persistentData.length} />}
			filterComponent={handleFilterChange}
		// isButton
		/>
	)
}
