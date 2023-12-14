import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.BACKGROUND_GRAY,
      width: '100%',
      borderTopLeftRadius: 40,
      position: "relative",
      marginTop: -120
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center'

    },
    containerForm: {
      paddingTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      fontFamily: 'proxima-bold',
    },
    text: {
      color: colors.TEXTCOLORLIGHT,
      fontSize: 20,
      fontFamily: 'proxima-regular'
    },
    justifyText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 330,
      marginBottom: 5,
      left: -5
    },
    media_group: {
      marginHorizontal: 25,
    },
    textstyle: {
      marginTop: 20,
      left: 0,
      fontSize: 16,
      color: colors.GRAYDC1,
      fontFamily: 'proxima-regular',
    }
  });

export default styles;
