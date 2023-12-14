import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";
import { isIphone } from "src/utils/devices";
import { windowDimentions } from "ui-core/utils/globalStyles";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#F1F1F1',
      borderTopLeftRadius: 40,
      paddingTop: 10,
      paddingHorizontal: 20,
    },
    block_position: {
      position: 'absolute',
      top: -20,
      alignSelf: "center",
      borderRadius: 5,
      zIndex: 2,
      borderWidth: 1,
      borderColor: '#ffffff'
    },
    shadow: {
      alignSelf: "center",
      width: windowDimentions.width * .95,
      height: 30,
      marginTop: 1,
      position: "absolute",
      zIndex: 1,
      borderTopLeftRadius: 60
    },
    block_number: {
      backgroundColor: 'rgba(255,255,255,0.7)',
      height: windowDimentions.height * .05,
      paddingHorizontal: 20,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
    },
    block_text: {
      fontFamily: 'proxima-bold',
      fontSize: isIphone() ? 16 : 14,
      textAlign: 'center',
      color: '#004B7F'

    }
  });

export default styles;
