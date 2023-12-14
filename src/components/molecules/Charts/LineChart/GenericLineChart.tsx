import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { colorsLight } from 'config/theme';
import { IChartLineProps } from './GenericLineChart.types';

const chartConfig: AbstractChartConfig = {
	backgroundColor: colorsLight.background,
	backgroundGradientFrom: colorsLight.background,
	backgroundGradientFromOpacity: 1,
	backgroundGradientTo: colorsLight.background,
	backgroundGradientToOpacity: 1,
	labelColor: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
	color: () => '#8CD76D',
	strokeWidth: 1,
	barPercentage: 1.2,
	useShadowColorFromDataset: false,
	propsForBackgroundLines: {
		strokeWidth: 1,
		stroke: colorsLight.GRAY_MEDIUM_3,
		strokeDasharray: [0.2, 0.1],
	},
};

const GenericLineChart = (props: IChartLineProps) => {
	const {
		labels,
		width = Dimensions.get('screen').width * 0.9,
		height = 300,
		yAxisInterval = 1,
		yAxisLabel = '',
		yAxisSuffix = '',
		decimalPlaces = 2,
		data,
		bezier = false,
	} = props;

	const fullData = {
		labels: [...labels],
		datasets: [
			{
				data: data.length > 0 ? [...data] : [0, 0, 0, 0, 0, 0, 0],
			},
		],
	};

	return (
		<View>
			<LineChart
				data={fullData}
				width={width}
				height={height}
				yAxisLabel={yAxisLabel}
				yAxisSuffix={yAxisSuffix}
				yAxisInterval={yAxisInterval}
				chartConfig={{ ...chartConfig, decimalPlaces: decimalPlaces }}
				style={{
					marginVertical: 8,
					borderRadius: 16,
				}}
				bezier={bezier}
			/>
		</View>
	);
};

export default GenericLineChart;
