import EcwService from 'adapter/api/ecwService';
import { userSelectors } from 'adapter/user/userSelectors';
import moment, { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import FORMATS from 'ui-core/utils/formats';
import { LabList } from './LabList';
import { LabMoreOption } from './LabMoreOption';
import { useAppSelector } from 'adapter/hooks';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useLoading } from 'src/components/organisms/LoadingProvider/LoadingProvider';

export const LabScreen = () => {
	const { t } = useTranslation();
	const { firstName, ecwId } = useAppSelector(userSelectors.selectUser);
	const [fetchLabDis] = EcwService.useFetchLabDisMutation();
	const { setAlertErrorMessage } = useErrorAlert();
	const [data, setData] = useState([])
	const [showData, setShowData] = useState([]);
	const { setLoading } = useLoading();
	const handlerData = useCallback(
		async () => {
			try {
				setLoading(true);
				if(ecwId){
					const dataReferals: never[] = await fetchLabDis(ecwId).unwrap();
					const newData = [...dataReferals].sort((a: any, b: any) => moment(b.orderDate, FORMATS.date).diff(moment(a.orderDate, FORMATS.date)))
					setShowData(newData);
					setData(newData);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[fetchLabDis, ecwId],
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
			const filteredData = data.filter((lab: any) => {
				const currentDate = moment(lab.orderDate, FORMATS.date);
				return currentDate.isBetween(fromDate, toDate, undefined, '[]');
			});
			return setShowData(filteredData);
		},
		[data],
	);

	return (
		<RootGeneral
			title={t('myHealth.myLabs')}
			subtitle={t('myHealth.general')}
			data={data}
			showData={showData}
			content={<LabList data={showData} totalData={data.length} />}
			filterComponent={handleFilterChange}
			moreOptionComponent={<LabMoreOption />}
		/>
	);
};
