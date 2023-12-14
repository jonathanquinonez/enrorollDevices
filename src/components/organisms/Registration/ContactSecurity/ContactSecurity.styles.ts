import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
    },
    radioGroup: {
      paddingTop: 32,
      paddingHorizontal: 10,
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 18,
      lineHeight: 22,
      color: colors.BLUEDC1,
      marginLeft: 19.3
    }
  });

export default styles;