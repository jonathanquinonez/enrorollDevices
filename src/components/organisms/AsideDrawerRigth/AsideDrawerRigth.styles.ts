import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { screenDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		logoutContainer: {
			flex: 1,
			paddingHorizontal: 30
		},
		buttonText: {
			color: colors.BLUEDC1,
			fontFamily: 'proxima-regular',
			fontSize: 16,
		},
		logoutVisit: {
			flex: 1,
		},
		visitText: {
			color: colors.GRAYDC1,
			fontSize: 12,
			fontFamily: 'proxima-regular',
		},
		divider: {
			borderBottomColor: colors.GRAY_LIGHT_2,
		},

		container: {
			flex: 1,
			justifyContent: 'flex-start',
			paddingHorizontal: 20,
		},

		headerContainer: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingBottom: 40,
			paddingLeft: 30,
		},
	});

export default styles;
