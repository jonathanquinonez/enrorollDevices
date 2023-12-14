import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { GraphicCategory, GraphicTypes, IDetailProps } from './DetailOrganism.types';
import GenericLineChart from 'src/components/molecules/Charts/LineChart/GenericLineChart';
import GenericBarChart from 'src/components/molecules/Charts/BarChart/GenericBarChart';

import useStyles from 'hooks/useStyles';
import componentStyles from './DetailOrganism.styles';
import AverageItem from 'src/components/molecules/Charts/AuxiliarComponents/AverageItem';
import { useTranslation } from 'react-i18next';
import Tooltip from 'src/components/atoms/Tooltip/Tooltip';
import ProgressRow from 'src/components/molecules/Smartwatch/ProgressRow/ProgressRow';

const DetailOrganism = (props: IDetailProps) => {
	const { categoy, graphicType, data = [], item, showProgressCharts = false } = props;
	const [average, setAverage] = useState<string>();
	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();
	const labels = [
		t('weekDays.sunday'),
		t('weekDays.monday'),
		t('weekDays.thuesday'),
		t('weekDays.wednesday'),
		t('weekDays.thursday'),
		t('weekDays.friday'),
		t('weekDays.saturday'),
	];

	useEffect(() => {
		calculateAverage(data);
	}, [data]);

	const calculateAverage = (dataParams: number[]) => {
		const calc =
			dataParams.reduce((acc, curr) => acc + curr, 0) /
			data.filter((value) => value !== 0).length;
		if (Number.isNaN(calc)) {
			setAverage('0');
			return;
		}
		setAverage(calc.toFixed(2) === '0.00' ? '0' : calc.toFixed(2));
	};

	const tooltipByCategory = useCallback(
		(category: string) => {
			switch (category) {
				case GraphicCategory.STEPS:
					return t('smartwatch.category.steps');
				case GraphicCategory.DISTANCE:
					return t('smartwatch.category.distance');
				case GraphicCategory.CALORIES:
					return t('smartwatch.category.calories');
				case GraphicCategory.HEARTRATE:
					return t('smartwatch.category.heartrate');
				case GraphicCategory.WEIGHT:
					return t('smartwatch.category.weight');
				case GraphicCategory.HEIGHT:
					return t('smartwatch.category.height');
				case GraphicCategory.SLEEP:
					return t('smartwatch.category.sleep');
				default:
					return '';
			}
		},
		[categoy],
	);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{showProgressCharts ? (
				<ProgressRow labels={labels} data={data} />
			) : (
				<AverageItem counter={average ?? '0'} date={t('charts.unit')} unit={t(item.unit)} />
			)}
			{/* <DateStepper /> */}
			{graphicType === GraphicTypes.BARS && <GenericBarChart data={data} labels={labels} />}
			{graphicType === GraphicTypes.LINES && <GenericLineChart data={data} labels={labels} />}
			{graphicType === GraphicTypes.BEZIER && (
				<GenericLineChart bezier data={data} labels={labels} />
			)}
			<Tooltip
				title={`${t('smartwatch.lobby.about')} ${t(item.label)}`}
				description={tooltipByCategory(categoy)}
			/>
		</ScrollView>
	);
};

export default DetailOrganism;
