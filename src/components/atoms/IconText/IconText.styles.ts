import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {},
		mainContent: {
			width: '100%',
			flexDirection: 'row',
		},
		iconContainer: {
			width: 10,
			height: 16,
		},
		infoText: {
			color: colors.BLUEDC1,
			fontSize: 16,
		},
	});

export default styles;
