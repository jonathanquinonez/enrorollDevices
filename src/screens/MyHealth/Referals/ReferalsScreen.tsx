import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { RefaralList } from './RefaralList';
import { View, ScrollView, Text } from 'react-native';
import EcwService from 'adapter/api/ecwService';
import moment, { Moment } from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { useLoading } from 'src/components/organisms/LoadingProvider/LoadingProvider';

export const ReferalsScreen = () => {
	const { t } = useTranslation();
	const { setAlertErrorMessage } = useErrorAlert();
	const { ecwId } = useAppSelector(userSelectors.selectUser);
	const [data, setData] = useState<any[]>([]);
	const [showData, setShowData] = useState<any[]>([]);
	const [referalRequest] = EcwService.useFetchReferralMutation();
	const { setLoading } = useLoading();
	const handlerData = useCallback(async () => {
		try {
			setLoading(true);
			if (ecwId) {
				const dataReferals: any[] = await referalRequest(ecwId).unwrap();
				let tempData: any[] = [];
				dataReferals.forEach((v) =>
					tempData.push({ ...v, status: t(`myHealth.referrals.${v.status ?? 'NN'}`) }),
				);
				const newData = [...tempData].sort((a: any, b: any) =>
					moment(b.startDate, FORMATS.date).diff(moment(a.startDate, FORMATS.date)),
				);
				setShowData(newData);
				setData(newData);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			if (error != '999') setAlertErrorMessage('Error: ' + error);
		}
	}, [referalRequest]);

	useEffect(() => {
		handlerData();
	}, []);

	const handleFilterChange = useCallback(
		(from: Moment, to: Moment) => {
			if (!data) return;
			if (!from) return setShowData(data);
			const fromDate = from.startOf('day');
			const toDate = to.endOf('day');
			const filteredData = data.filter((ref: any) => {
				const currentDate = moment(ref.startDate, FORMATS.date);
				return currentDate.isBetween(fromDate, toDate, undefined, '[]');
			});
			return setShowData(filteredData);
		},
		[data],
	);

	return (
		<RootGeneral
			title={t('myHealth.ref')}
			subtitle={t('myHealth.textRefeD')}
			data={data}
			showData={showData}
			content={<RefaralList data={showData} totalData={data.length} />}
			filterComponent={handleFilterChange}
		/>
	);
};
