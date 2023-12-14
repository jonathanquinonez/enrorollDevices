import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height * 0.4
    },
    radioGroup: {
      paddingTop: 32,
      paddingHorizontal: 10,
    },
    textOption2: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 17,
      textAlign: 'center',
      color: '#5B5C5B',
      marginLeft: '1%',
      marginRight: '1%',      
    },
    textOption: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      lineHeight: 24,
      textAlign: 'center',
      marginBottom: 30,
      color: colors.BLUEDC1,
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.GRAYDC1
    },
    containerModal: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    textBlue: {
      marginTop: 24,
      marginBottom: 32,
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 24,
      color: '#055293',
    },
    textGreen: {
      textAlign: 'center',
      marginBottom: 24,
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 24,
      color: '#3CA70D',
    },
    buttonClose: {
      color: '#3CA70D',
      fontFamily: 'proxima-bold',
      fontSize: 16
    },
    title: { textAlign: 'center', fontSize: 30 },
    codeFiledRoot: { marginTop: 20 },
    cell: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      backgroundColor: '#C4C4C4',
      borderRadius: 10,
      margin: 5,
    },
    focusCell: {
      backgroundColor: '#b1b1b1',
    },
    btnSupport:{
     marginLeft: '3%', marginTop: '8%'
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    }
  });

export default styles;