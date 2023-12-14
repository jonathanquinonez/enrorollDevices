import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
	StyleSheet.create({
		textButton: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
            textDecorationLine:'none'
		},
	});

export default styles;
