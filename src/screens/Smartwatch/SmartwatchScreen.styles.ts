import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { screenDimentions } from 'ui-core/utils/globalStyles';
import { isIphone } from 'src/utils/devices';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		container: {
			flexDirection: 'column',
			alignItems: 'center',
			flex: 1,
		},
		linearGradient: {
			alignItems: 'center',
			width: screenDimentions.width,
			flex: 1,
		},
		title_text: {
			fontFamily: 'proxima-bold',
			fontSize: 26,
			lineHeight: 31,
			color: colors.WHITE,
		},
		subtitle_text: {
			marginTop: 5,
			fontFamily: 'proxima-regular',
			fontSize: isIphone() ? 16 : 14,
			lineHeight: 17,
			color: colors.WHITE,
		},
	});

export default styles;
