import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      marginBottom: 15,
      marginTop: 30,
      color: '#065394',
      textAlign: 'center',
    },

  });

export default styles;
