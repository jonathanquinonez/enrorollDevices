import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      paddingVertical: 5
    },
    label: {
      color: colors.BLUEDC1,
      fontFamily: 'semibold',
      fontSize: 16,
      marginBottom: 5,
    },
    text: {
      paddingLeft: 12,
      fontFamily: 'proxima-regular',
      fontSize: 16,
      color: colors.GRAYDC1,
    },
  });

export default styles;
