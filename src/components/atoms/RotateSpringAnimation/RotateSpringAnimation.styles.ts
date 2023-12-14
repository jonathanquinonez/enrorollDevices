import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      shadowOpacity: 0.3,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowColor: '#444',
      shadowRadius: 1,
      elevation: 1
    },
  });

export default styles;
