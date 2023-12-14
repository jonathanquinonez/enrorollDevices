import { colorsLight } from 'config/theme';
import React, { useEffect } from 'react';
import { AbstractChartConfig, BarChart } from 'react-native-chart-kit';
import { IGenericBarProps } from './GenericBarChart.types';
import { Dimensions } from 'react-native';
import componentStyles from './GnericBarChart.styles';
import useStyles from 'hooks/useStyles';

const chartConfig: AbstractChartConfig = {
	backgroundColor: colorsLight.background,
	backgroundGradientFrom: colorsLight.background,
	backgroundGradientFromOpacity: 1,
	backgroundGradientTo: colorsLight.background,
	backgroundGradientToOpacity: 1,
	labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
	color: () => '#8CD76D',
	strokeWidth: 1,
	barPercentage: 1,
	useShadowColorFromDataset: false,
	propsForBackgroundLines: {
		strokeWidth: 1,
		stroke: colorsLight.GRAY_MEDIUM_3,
		strokeDasharray: [0.2, 0.1],
	},
};

const GenericBarChart = (props: IGenericBarProps) => {
	const { styles } = useStyles(componentStyles);
	const {
		labels,
		width = Dimensions.get('screen').width * 0.9,
		height = 300,
		yAxisLabel = '',
		yAxisSuffix = '',
		data,
	} = props;

	const fullData = {
		labels: [...labels],
		datasets: [
			{
				data: [...data],
			},
		],
	};
	return (
		<BarChart
			style={styles.container}
			yAxisSuffix={yAxisSuffix}
			data={fullData}
			width={width}
			height={height}
			yAxisLabel={yAxisLabel}
			chartConfig={chartConfig}
			verticalLabelRotation={0}
		/>
	);
};

export default GenericBarChart;
