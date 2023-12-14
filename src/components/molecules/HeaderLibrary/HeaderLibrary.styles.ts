import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { screenDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			backgroundColor: colors.BLUEDC1,
			height: 77,
			justifyContent: 'center',
			flexDirection: 'row', 
		},
		rowTitle: {
			height: 30,
			width: 80,
			marginTop: 40,
			alignItems: 'flex-start',
			marginLeft: 15,
		},
		title: {
			color: 'white',
			fontSize: 18,
			fontFamily: 'proxima-bold',
		},
		rowButton: {
			height: 30,
			marginTop: 30,
			alignItems: 'flex-end',
			marginRight: 15,
		},

		buttonIcon: {
			backgroundColor: colors.BLUEDC1,
		},
	});

export default styles;
