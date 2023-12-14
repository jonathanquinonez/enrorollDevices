import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height * 0.5
    },
    radioGroup: {
      paddingTop: 32,
      paddingHorizontal: 10,
    },
    textOption: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: colors.BLUE288,
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.GRAYDC1
    }
  });

export default styles;