import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flex: 1,
			width: '100%',
			flexDirection: 'column',
			justifyContent: 'center',
			borderColor: colors.GRAYDC2,
			borderBottomWidth: 1,
			marginBottom: 10,
		},
		containerNoBorder: {
			flex: 1,
			width: '100%',
			flexDirection: 'column',
			justifyContent: 'center',
			marginBottom: 10,
		},
	});

export default styles;
