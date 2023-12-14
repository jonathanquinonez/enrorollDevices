import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      marginTop: 15,
      marginBottom: 24,
    },
    content: {
      backgroundColor: colors.WHITE,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: colors.GRAY_MEDIUM,
      flexDirection: 'row',
    },
    inputContainer: {
      flexDirection: 'row',
      flex: 1,
      height: 43,
      alignItems: 'center',
      justifyContent: 'space-between',
      borderTopEndRadius: 6,
      borderTopStartRadius: 6,
      paddingLeft: 16,
      paddingRight: 100,
    },
    textInput: {
      fontSize: 14,
      lineHeight: 16,
      fontFamily: 'proxima-regular',
      color: colors.GRAYDC1_TRANSPARENT,
      paddingTop: 6,
    },
    button: {
      position: 'absolute',
      bottom: -2,
      right: 0,
      backgroundColor: colors.primary,
      height: 47,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 26,
      borderRadius: 6,
    },
    buttonText: {
      color: colors.WHITE,
      fontFamily: 'proxima-bold',
      fontSize: 14,
    },
    helperText: {
      paddingTop: 16,
      fontSize: 14,
      lineHeight: 17,
      fontFamily: 'proxima-regular',
      color: colors.GRAYDC1,
    },
    errorText: {
      color: colors.ALERT,
    },
  });

export default styles;
