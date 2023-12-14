import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    btnlistText: {
      fontSize: 16,
      fontFamily: 'proxima-bold',
      fontWeight: "600",

    },
    btnList: {
      width: Dimensions.get('window').width * 0.85,
      margin: 8
    },
    btn: {
      color: '#0071A3',
      fontSize: 18,
      fontFamily: 'proxima-bold',
      paddingTop: 2,
      marginBottom: 30
    },
    btnClose: {
      marginTop: 30,
      marginBottom: 15
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: '#022F58',
      marginBottom: 25
    },
    body: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginBottom: 40
    },
    container: {
      alignItems: 'center',
      width: Dimensions.get('window').width * 0.9,
    }
  });

export default styles;
