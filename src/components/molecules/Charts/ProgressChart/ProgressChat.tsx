import React from 'react';
import CircularProgress from 'react-native-circular-progress-indicator';
import { IProgressProps } from './ProgressChart.types';
import { View, Text } from 'react-native';
import componentStyles from './ProgressChart.styles';
import useStyles from 'hooks/useStyles';
import { CircularProgressProps } from 'react-native-circular-progress-indicator/lib/typescript/types';
import { colorsLight } from 'config/theme';

const ProgressChart = (props: IProgressProps & CircularProgressProps) => {
	const {
		value,
		title = '',
		maxValue = 8,
		radius = 22,
		progressValueColor = colorsLight.BLUE307,
		activeStrokeWidth = 12,
		bottomLabel = '',
	} = props;

	const { styles } = useStyles(componentStyles);

	return (
		<View style={styles.container}>
			<CircularProgress
				title={title}
				value={value}
				maxValue={maxValue}
				radius={radius}
				activeStrokeWidth={activeStrokeWidth}
				activeStrokeColor={colorsLight.BLUE307}
				progressValueColor={progressValueColor}
				valueSuffix="h"
				valueSuffixStyle={{ marginLeft: -5 }}
				progressValueStyle={{ marginLeft: -5 }}
			/>
			<Text style={styles.bottomLabel}>{bottomLabel}</Text>
		</View>
	);
};

export default ProgressChart;
