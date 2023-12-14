import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';
const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    imageMenu: {
      left: 20,
    },
    textText: {
      position: "absolute",
      marginTop: 38,
      left: 70,
      lineHeight: 45,
      fontSize: 16,
      fontFamily: 'proxima-bold',
      color: colors.BLUEDC1
    },
    icon: {
      position: "absolute",
      marginTop: 48,
      left: 230
    }
  });
export default styles;