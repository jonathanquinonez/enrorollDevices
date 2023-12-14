import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerButton: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    text: {
      width: Dimensions.get('window').width * 0.8,
      alignSelf: "center",
      marginTop: 20,
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.BLUEDC1
    }

  });

export default styles;
