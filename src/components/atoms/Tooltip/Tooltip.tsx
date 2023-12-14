import React from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import componentStyles from './Tooltip.styles';
import { ITooltipProps } from './Tooltip.types';

const Tooltip = (props: ITooltipProps) => {
	const { title, description } = props;
	const { styles } = useStyles(componentStyles);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	);
};

export default Tooltip;
