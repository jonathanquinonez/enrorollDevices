import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
        backgroundColor: colors.BLACK,
        flex: 1
    },
  });

export default styles;