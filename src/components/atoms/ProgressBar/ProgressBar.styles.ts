import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    gradient: {
      width: 45,
      height: 4
    },
    circle: {
      width: 27,
      height: 27,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      width: Dimensions.get('window').width * 0.8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center'
    },
    text: {
      fontFamily: 'proxima-bold',
      fontSize: 16
    }
  });

export default styles;
