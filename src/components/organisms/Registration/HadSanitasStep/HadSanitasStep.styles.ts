import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: Dimensions.get('window').height * 0.5
    },
    radioButton: {
      padding: 12,
      paddingRight: 24,
    },
    radioGroup: {
      fontSize: 14,
      color: colors.BLUEDC1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: colors.BLUEDC1,
      textAlign: 'center',
      marginHorizontal: '5%'
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.GRAYDC1
    }
  });

export default styles;