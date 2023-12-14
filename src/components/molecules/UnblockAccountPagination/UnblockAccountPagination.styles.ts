import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    layout: {
      backgroundColor: colors.GRAY_LIGHT_4,
      borderTopLeftRadius: 40,
      paddingTop: 24
    },
    container: {
      marginTop: 24,
      flex: 1
    },
    iconButton: {
      zIndex: 1,
      position: 'absolute',
      top: -15,
      right: 20
    },
    text_font: {
      fontSize: 24,
      fontFamily: 'proxima-regular',
      lineHeight: 29,
      color: colors.TEXTCOLORLIGHT
    },
    contentContainerScroll: {
      alignItems: 'center',
      width: '100%'
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