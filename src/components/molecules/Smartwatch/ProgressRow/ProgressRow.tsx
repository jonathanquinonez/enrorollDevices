import React from 'react';
import { ScrollView, View } from 'react-native';
import componentStyles from './ProgressRow.styles';
import useStyles from 'src/hooks/useStyles';
import ProgressChart from '../../Charts/ProgressChart/ProgressChat';
import { IProgressRowProps } from './ProgressRow.types';

const ProgressRow = (props: IProgressRowProps) => {
	const { data, labels } = props;
	const { styles } = useStyles(componentStyles);

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				{data.map((item, index) => (
					<ProgressChart value={item} key={index} bottomLabel={labels[index]} />
				))}
			</ScrollView>
		</View>
	);
};
export default ProgressRow;
