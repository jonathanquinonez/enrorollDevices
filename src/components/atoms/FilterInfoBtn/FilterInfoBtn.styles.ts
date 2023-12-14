import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#0069A7',
      minHeight: 30,
      paddingLeft: 5,
      paddingRight: 15,
      justifyContent: 'center',
      alignItems: "center",
      borderRadius: 35,
      width: 200,
    },
    text: {
      color: '#FFF',
      fontFamily: 'proxima-bold',
      fontSize: 14,
    }
  });
export default styles;
