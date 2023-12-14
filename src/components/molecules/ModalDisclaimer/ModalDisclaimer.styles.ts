import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: '#022F58',
      marginBottom: 13
    },
    body: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginBottom: 40
    },
    container: {
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.8,
    }
  });

export default styles;
