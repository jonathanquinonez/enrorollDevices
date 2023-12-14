import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    layout: {
      backgroundColor: colors.GRAY_LIGHT_4,
      borderTopLeftRadius: 60,
      flex: 1
    },
    container: {
      marginTop: 24,
      flex: 1
    },
    iconButton: {
      position: 'absolute',
      top: -20,
      right: 20,
    },
    title_font: {
      fontFamily: 'proxima-bold',
      marginBottom: 18,
      marginLeft: 30,
      fontSize: 18,
      lineHeight: 22,
      color: colors.BLUEDC1
    },
    text_font: {
      fontSize: 24,
      fontFamily: 'proxima-regular',
      lineHeight: 29,
      color: colors.TEXTCOLORLIGHT
    },
    group_button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonNext: {
      marginTop: 27, 
      alignItems: "center"
    }
  });

export default styles;