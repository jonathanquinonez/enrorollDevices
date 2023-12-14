import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		icon: {
			marginTop: 42,
			alignSelf: 'center',
		},
		divider: {
			width: '90%',
			marginTop: 16,
		},
		buttons: {
			flexDirection: 'row',
			alignSelf: 'flex-end',
			paddingHorizontal: 8,
		},
		button: {
			marginHorizontal: 8,
			marginBottom: 14,
			marginTop: 18,
		},
		secondaryText: {
			color: colors.GRAYDC1_TRANSPARENT,
		}
	});

export default styles;
