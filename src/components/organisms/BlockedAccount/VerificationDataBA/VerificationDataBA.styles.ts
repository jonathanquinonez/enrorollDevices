import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      alignItems: 'center'
    },
    subtitle: {
      fontFamily: 'proxima-normal',
      fontSize: 14,
      color: colors.GRAYDC1,
      lineHeight: 17,
      marginHorizontal: 20,
    },
    title_font: {
      alignSelf: "flex-start",
      fontFamily: 'proxima-bold',
      marginBottom: 18,
      marginLeft: 25,
      fontSize: 18,
      lineHeight: 22,
      color: colors.BLUEDC1
    },
    textMobileNumber: {
      alignSelf: "flex-start",
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 15
    },
    textRadioButton: {
      fontFamily: 'proxima-normal',
      fontSize: 14,
      color: colors.GRAYDC1
    },
    textSelectEmail: {
      alignSelf: "flex-start",
      marginTop: 30,
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 15
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30
    },
    radioButton: {
      paddingRight: 24,
    },
    btnSupport:{
      marginBottom: '7%', marginLeft: '3%', marginVertical: 20
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    }
  });

export default styles;
