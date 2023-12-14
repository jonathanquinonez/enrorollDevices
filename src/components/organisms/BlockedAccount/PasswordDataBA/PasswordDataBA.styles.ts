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
      marginBottom: 30,
      marginLeft: 25,
      fontSize: 18,
      lineHeight: 22,
      color: colors.BLUEDC1
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
    containerModal: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    btnSupport:{
      marginBottom: '7%', marginLeft: '3%', marginVertical: 30
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    }
  });

export default styles;
