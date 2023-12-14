import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    btn: {
      width: 24,
      height: 25,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14
    }
  });

export default styles;
