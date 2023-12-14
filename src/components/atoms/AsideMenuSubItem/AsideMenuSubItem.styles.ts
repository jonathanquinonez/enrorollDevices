import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: colors.BLUEDC1,
      fontFamily: 'proxima-regular',
      fontSize: 15,
      paddingVertical: 16,
    },
    divider: {
      borderBottomColor: colors.GRAY_LIGHT_2,
    },
  });

export default styles;
