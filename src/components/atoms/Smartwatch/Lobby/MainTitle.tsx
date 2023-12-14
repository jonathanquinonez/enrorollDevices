import React from 'react';
import { MainTitleProps } from './MainTitle.types';
import { Text, View } from 'react-native';
import componentStyles from './MainTitle.styles';
import useStyles from '../../../../hooks/useStyles';

const MaintTitle = (props: MainTitleProps) => {
	const { label } = props;
	const { styles } = useStyles(componentStyles);
	return (
		<View style={styles.container}>
			<Text style={styles.label}>{label}</Text>
		</View>
	);
};

export default MaintTitle;
