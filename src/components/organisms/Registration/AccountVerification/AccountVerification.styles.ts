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
    radioButton: {
      paddingRight: 24,
    },
    title: {
      fontSize: 14,
      color: colors.BLUEDC1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    textVerification: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: colors.BLUEDC1,
      marginBottom: 16
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 17,
      color: colors.GRAYDC1,
      alignItems: 'center',
      width: '90%',
      marginBottom: 40
    },
    textMobileNumber: {
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 24
    },
    textRadioButton: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.GRAYDC1
    },
    textSelectEmail: {
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 24
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 56
    }
  });

export default styles;