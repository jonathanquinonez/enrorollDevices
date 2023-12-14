import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { isIphone } from 'src/utils/devices';
import { screenDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		title_text: {
			fontFamily: 'proxima-bold',
			fontSize: 16,
			lineHeight: 19,
			color: '#002F87',
		},
		row_container: {
			flexDirection: 'row',
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			paddingBottom: 10,
		},
		radioButton: {
			alignItems: "center",
			justifyContent: "center",
			paddingHorizontal: 10
		},
		info1: { marginLeft: 20, fontFamily: 'proxima-bold', color: '#002F87', fontSize: 16 },
		info2: { fontFamily: 'proxima-bold', color: '#B50303', fontSize: 14, marginRight: 9 },
		textRadioButton: {
			marginLeft: 16
		},
		contentRow: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			marginBottom: 10,
		},
		content_radio_button: {
			flexDirection: "row",
			alignItems: "center",
		},
		radio_button: {
			margin: 5,
			backgroundColor: 'white',
			paddingHorizontal: 2,
			paddingVertical: 5,
			borderRadius: 5,
			width: Dimensions.get('window').width * 0.43,
		},
		label_text: {
			fontSize: 14,
			fontFamily: 'proxima-regular',
			color: '#002F87',
		},
	});

export default styles;
