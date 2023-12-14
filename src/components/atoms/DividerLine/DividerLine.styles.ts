import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		line: {
			width: '100%',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			borderBottomColor: colors.GRAY,
			borderBottomWidth: 1,
		},
	});

export default styles;
