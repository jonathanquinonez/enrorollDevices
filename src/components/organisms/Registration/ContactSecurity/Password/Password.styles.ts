import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    textButton: {
      paddingHorizontal: 4,
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 17,
      color: colors.GRAYDC1
    }
  });

export default styles;
