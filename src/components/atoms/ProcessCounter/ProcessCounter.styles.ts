import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      height: 80
    },
    circleButton: {
      width: 32,
      height: 32,
      borderRadius: 32 / 2,
      justifyContent: 'center',
      alignItems: 'center'
    },
    progressLine: {
      top: 16,
      position: 'absolute',
      width: '100%',
      height: 2,
    },
    progressNumber: {
      fontFamily: 'proxima-bold',
      fontSize: 18,
    },
    touchableContainer: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 70,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-bold',
      fontSize: 12,
      marginTop: 5,
    }
  });

export default styles;
