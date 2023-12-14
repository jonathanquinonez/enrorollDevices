import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      backgroundColor: '#3CA70D',
      height: 34,
      width: 34,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30
    },
    text: {
      marginVertical: 20,
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 22,
      textAlign: "center",
      color: colors.BLUEDC1
    },
    btnText: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUE07F
    }
  });

export default styles;