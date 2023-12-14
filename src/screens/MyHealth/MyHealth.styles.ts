import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerCards: {
      shadowOpacity: 0.3,
      shadowRadius: 3,
      shadowOffset: {
        height: 0,
        width: 0
      },
      minHeight: 150,
      maxHeight: 500
    }
  });

export default styles;