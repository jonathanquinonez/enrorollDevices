import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: 15
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.BLUE307,
      marginBottom: 20,
      marginTop: 15
    },
    textBtn: {
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      fontSize: 18,
      alignSelf: 'center',
      flex: 1,
      marginTop: 20
    },
    tittle: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.DARKBLUE,
      marginBottom: 7,
      marginTop: 20
    },
    button: {
      marginTop: 4,
      marginBottom: 5,
      backgroundColor: colors.WHITE,
    },
    secondaryText: {
      color: colors.GREENDC1,
      fontFamily: 'proxima-bold',
      fontSize: 16,
    },
    head: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 6,
      borderRadius: 50,
      marginTop: 20,
    },
    logo_image: {
      width: 20,
      height: 20,
      justifyContent: 'center',

    },
    buttonsModalCheck: {
      flexDirection: "row",
      justifyContent: 'space-between',
      paddingBottom: 30
    }
  });

export default styles;