import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      color: '#5B5C5B',
      marginTop: 5,
      fontSize: 18,
      fontFamily: 'proxima-bold',
      paddingBottom: 6
    },
    subTitle: {
      textAlign: "center",
      color: '#5B5C5B',
      fontSize: 18,
      lineHeight:22,
      fontFamily: 'proxima-regular'
    },
    logo_image: {
      width: 180,
      height: 157,
      justifyContent: 'center',
      marginBottom: 15
    }
  });

export default styles;
