import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 10,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      color: colors.BLUEDC1,
      marginBottom: 20,
      marginTop: 25,
    },
    text2: {
      textAlign: 'center',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      lineHeight: 20,
      color: colors.BLUEDC1,
      marginBottom: 20,
      marginTop: -10,
    },
    button: {
      marginBottom: 5,
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
