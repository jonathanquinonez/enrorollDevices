import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";
import { marginStatusBar } from '../../../ui-core/utils/globalStyles';

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
      justifyContent: 'center',
      marginLeft: 10,
      marginRight: 10,
    },
    text: {
      color: colors.TEXTCOLORLIGHT,
      fontSize: 12,
      fontFamily: 'proxima-regular'

    },
    titlestyle: {
      width: Dimensions.get('window').width * 0.85,
      marginTop: 20,
      left: 20,
      fontSize: 24,
      color: '#055293',
      fontFamily: 'proxima-bold'
    },
    textLine: {
      margin: 20,
      textAlign: 'justify',
      fontSize: 16,
      color: colors.GRAYDC1,
      fontFamily: 'proxima-regular'
    },
    link: {
      textDecorationLine: 'underline',
      color: colors.primary
    },
    titlestylecontent: {
      left: 70,
      fontSize: 16,
      color: '#055293',
      fontFamily: 'proxima-bold',
      textDecorationLine: 'underline'
    }
  });
export default styles;
