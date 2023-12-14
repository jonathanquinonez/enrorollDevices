import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.BLACK,
      flex: 1
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      paddingHorizontal: 10,
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.BLUEDC1,
    },
    button: {
      marginTop: 4,
      marginBottom: 20
    },
    containerButton: {
      paddingTop: 15,
      flexDirection: 'row',
      justifyContent: 'center'
    },
    containerButton2: {
      flexDirection: 'row',
      justifyContent: 'center'
    },
    textResend: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.BLUEDC1,
      marginBottom: 20,
      marginTop: 16
    },
    text2Resend: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#3CA70D',
      marginBottom: 20,
      marginTop: 5
    },
    buttonResend: {
      marginTop: 4,
      marginBottom: 20
    },
    headResend: {
      justifyContent: 'center',
      backgroundColor: "#3CA70D",
      padding: 6,
      borderRadius: 20,

      alignItems: 'center',
      width: 40,
      height: 40,
      marginLeft: '45%'
    },
    logo_imageResend: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',

    },
    simpleButton: {
      backgroundColor: 'none',
      borderEndColor: 'none',

    },
  });

export default styles;