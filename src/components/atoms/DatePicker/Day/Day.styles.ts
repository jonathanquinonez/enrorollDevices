import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    day: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      marginVertical: 4,
    },
    dayText: {
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'center',
      color: colors.BLUEDC1,
    },
    selected: {
      backgroundColor: colors.BLUEDC1,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectedText: {
      color: colors.WHITE,
    },
    disabledText: {
      opacity: 0.3,
    },
    disabled: {},
  });

export default styles;
