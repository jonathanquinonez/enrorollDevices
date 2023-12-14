import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerForm: {
      width: Dimensions.get('window').width * 0.9,
    },
    buttonNext: {
      alignItems: "center",
      marginTop: 30,
      marginBottom: 80
    },
    btnSupport:{
      marginBottom: 15, marginLeft: '3%', marginVertical: 30
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    },
    dimensions: {
      width: Dimensions.get('window').width * 0.9,
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 30
    },
    contentRow: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row'
    },
    text: {
      width: Dimensions.get('window').width * 0.78,
      fontFamily: 'proxima-semibold',
      fontSize: 14,
      lineHeight: 17,
      color: colors.GRAYDC1,
      paddingLeft: 15
    },
    textSupport: {
      fontFamily: 'proxima-regular',
      alignSelf: 'flex-start',
      left: 20,
      color: "#C4C4C4",
    },
    label: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: '#055293',
    },
    buttonContainer: {
      width: 300,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'

    },
    cancelButton: {
      color: colors.BLUEDC1,
    },
    contentContainer: {
      flexGrow: 1,
    },
  });
export default styles;