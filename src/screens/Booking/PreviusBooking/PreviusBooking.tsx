import EcwService from 'adapter/api/ecwService';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import moment from 'moment';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import FORMATS from 'ui-core/utils/formats';
import { PreviusBookingList } from './PreviusBookingList';


export const PreviusBookingScreen = () => {
	const { t } = useTranslation();
	const { state, ecwId } = useAppSelector(userSelectors.selectUser);
	const [previusRequest] = EcwService.useFetchPrevApptmsMutation();
	const [showData, setShowData] = useState([]);
	const [data, setData] = useState([]);
	const { setAlertErrorMessage } = useErrorAlert();
	const { isBeWell } = useAppSelector(userSelectors.selectIsBeWell);


	const handlerData = useCallback(
		async () => {
			try {
				if (ecwId) {
					const dataReferals: never[] = await previusRequest({ ecw: ecwId, isBeWell, state }).unwrap();
					const newData = [...dataReferals].sort((a: any, b: any) => moment(b.date, FORMATS.date2).diff(moment(a.date, FORMATS.date2)))
					setShowData(newData);
					setData(newData);
				}
			} catch (error) {
				if (error != '999') setAlertErrorMessage('Error: ' + error);
			}
		},
		[previusRequest, ecwId, isBeWell, state],
	);

	useEffect(() => {
		handlerData();
	}, []);

	/**
	   * Filters the list of registries.
	   * @since 1.0.0
	   * @param from Start date.
	   * @param to End date
	   */
	const handleFilterChange = useCallback(
		(from: Moment, to: Moment) => {

			if (!data) return;
			if (!from) return setShowData(data);
			const fromDate = from.startOf('day');
			const toDate = to.endOf('day');
			const filteredData = data.filter((ref: any) => {
				const currentDate = moment(ref.date, FORMATS.date);
				return currentDate.isBetween(fromDate, toDate, undefined, '[]');
			});
			return setShowData(filteredData);
		},
		[data],
	);

	return (
		<RootGeneral
			data={data}
			showData={showData}
			title={t('appoiment.previusTitle')}
			subtitle={t('appoiment.previusSubtitle')}
			content={<PreviusBookingList data={showData} totalData={data.length} />}
			filterComponent={data.length > 0 ? handleFilterChange :  null}
			isButton={false}
		/>
	)
}

