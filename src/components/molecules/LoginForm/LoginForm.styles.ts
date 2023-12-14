import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";
import { screenDimentions, windowDimentions } from "ui-core/utils/globalStyles";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BACKGROUND_GRAY,
      width: '100%',
      borderTopLeftRadius: 40,
      paddingTop: 30,
      flex: 1,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center'
    },
    containerForm: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    input:{

    },
    text: {
      color: colors.TEXTCOLORLIGHT,
      fontSize: 14,
      fontFamily: 'proxima-regular',
      textAlign: 'center',
       
    },
    justifyText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10
    },
    check: {
      position: 'absolute',
      left: 7,
      top: 7,
      opacity: 0.5,
    },
    buttonsModalCheck:{
      flexDirection: "row",
      justifyContent: 'space-between',
      marginTop:50,
      marginBottom: 25
    }
  });

export default styles;
