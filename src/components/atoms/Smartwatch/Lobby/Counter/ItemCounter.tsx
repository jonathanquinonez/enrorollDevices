import React from 'react';
import { Text, View } from 'react-native';
import useStyles from 'hooks/useStyles';
import componentStyles from './ItemCounter.styles';
import ItemCounterProps from './ItemCounter.types';
import { colorsDark } from 'config/theme';

const ItemCounter = (props: ItemCounterProps) => {
	const {
		counter,
		unit,
		date,
		counterColor = colorsDark.BLACK,
		dateColor = colorsDark.BLACK,
		labelColor = colorsDark.BLACK,
	} = props;
	const { styles } = useStyles(componentStyles);

	return (
		<View style={styles.container}>
			<View style={styles.subContainer}>
				<Text style={[styles.label, { color: counterColor }]}>{counter}</Text>
				<Text style={[styles.subLabel, { color: labelColor }]}>{unit}</Text>
			</View>
			<Text style={[styles.date, { color: dateColor }]}>{date}</Text>
		</View>
	);
};

export default ItemCounter;
