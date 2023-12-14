import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    touchableArea: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: colors.BLACK_TRANSPARENT,
    },
    modalContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      alignItems: 'center',
    },
    modal: {
      backgroundColor: colors.WHITE,
      width: '90%',
      borderRadius: 14,
      alignItems: 'center',
      overflow: 'hidden',
    },
  });

export default styles;
