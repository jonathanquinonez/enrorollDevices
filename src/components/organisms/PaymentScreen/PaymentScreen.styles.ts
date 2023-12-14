import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    label: {
      marginTop: 5,
      color: colors.BLACK3,
      fontFamily: 'proxima-bold',
      fontSize: 16,
    },
    input: {
      fontSize: 14,
      textColor: '#5B5C5B',
      fontFamily: 'proxima-regular',
      borderWidth: 1,
      borderColor: '#DBDBDB',
      borderRadius: 5,
      backgroundColor: '#FFFFFF'
    },
    containerInput: {
      width: Dimensions.get('window').width * 0.8,
      height: 44,
      marginTop: 5,
      marginBottom: 10,
      borderRadius: 10
    },
    btn: {
      marginTop: 20,
      width: Dimensions.get('window').width * 0.8,
      backgroundColor: '#474747'
    }
  });

export default styles;
