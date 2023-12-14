import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const { width } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    dayHeader: {
      width: width * 0.09,
      justifyContent: 'center',
    },
    dayHeaderText: {
      textAlign: 'center',
      color: colors.GREENDC1,
    },
  });

export default styles;
