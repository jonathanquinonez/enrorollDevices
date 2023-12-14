import { Platform, StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';
const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    icon: {
      marginHorizontal: 18,
      alignSelf: 'center',
    },
    textText: {
      fontSize: 18,
      fontFamily: 'proxima-bold',
      color: colors.BLUEDC1,
      alignSelf: 'center',
      left: 50,
    },
    textPress: {
      fontSize: 18,
      fontFamily: 'proxima-bold',
      color: colors.GREEN001,
      alignSelf: 'center',
    },
    button: {
      flexDirection: 'row',
      marginTop: 35,
      minHeight: 70,
      backgroundColor: "#fff",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: Platform.OS === 'ios' ? 4 : 7,
    },
    buttonPress: {
      flexDirection: 'row',
      marginTop: 35,
      minHeight: 70,
      backgroundColor: "#CEFFB9",
      opacity: 0.9,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,

      elevation: Platform.OS === 'ios' ? 4 : 7,

    }
  });
export default styles;