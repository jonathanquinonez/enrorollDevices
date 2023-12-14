import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 20
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      color: colors.BLUEDC1,
      marginBottom: 20,
      marginTop: 25,
    },
    title: {
      textAlign: 'center',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      marginTop: 15,
      lineHeight: 20,
      color: colors.DARKBLUE,
    },
    button: {
      marginBottom: 5,
      marginTop: 15,
    },
    head: {
      justifyContent: 'center',
      marginTop: 20,
    },
    secondaryText: {
      color: 'white',
      fontFamily: 'proxima-bold',
      fontSize: 16,
    }
  });

export default styles;
