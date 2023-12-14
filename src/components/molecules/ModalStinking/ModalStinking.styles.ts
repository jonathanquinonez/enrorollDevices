import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    btn: {
      color: '#0071A3',
      fontSize: 18,
      fontFamily: 'proxima-bold',
      paddingTop: 2,
      marginBottom: 25
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: '#022F58',
      marginBottom: 30
    },
    body: {
      fontFamily: 'proxima-regular',
      fontSize: 16,
      marginBottom: 40
    },
    quote: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      marginBottom: 40
    },
    container: {
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.8,
    }
  });

export default styles;
