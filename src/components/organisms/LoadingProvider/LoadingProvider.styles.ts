import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		loadingContainer: {
			position: 'absolute',
			width: '100%',
			height: '100%',
			backgroundColor: colors.WHITE,
			justifyContent: 'center',
			alignItems: 'center',
		},
	});

export default styles;
