import React from 'react';
import { View } from 'react-native';
import componentStyles from './DateStepper.styles';
import useStyles from 'src/hooks/useStyles';
import { IDateStepperProps } from './DateStepper.types';
import DateStepperButton from '../DateStepperButton/DateStepperButton';

const DateStepper = (props: IDateStepperProps) => {
	const { steps = [] } = props;
	const { styles } = useStyles(componentStyles);
	return (
		<View style={styles.container}>
			<DateStepperButton label="D" isActive />
			<DateStepperButton label="W" />
			<DateStepperButton label="M" />
			<DateStepperButton label="6M" />
			<DateStepperButton label="Y" />
		</View>
	);
};

export default DateStepper;
