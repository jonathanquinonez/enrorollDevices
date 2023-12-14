import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      alignItems: 'center'
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 17,
      color: '#5B5C5B'
    },
    title: {
      marginTop: 32,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: '#055293'
    },
    contentText: {
      paddingHorizontal: 20,
      marginBottom: 24
    },
    textVerification: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: colors.BLUEDC1,
      marginBottom: 16
    },
    textMobileNumber: {
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 20,
      alignSelf: 'flex-start'
    },
    radioButton: {
      paddingRight: 24,
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
      marginBottom: 20,
      alignSelf: 'flex-start'
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    },
    btnSupport:{
      marginBottom: '8%', marginLeft: '3%', marginTop: '5%'
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    }
  });

export default styles;