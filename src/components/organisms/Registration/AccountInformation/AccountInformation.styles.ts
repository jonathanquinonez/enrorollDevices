import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
    },
    radioGroup: {
      paddingTop: 32,
      paddingHorizontal: 10,
    },
  });

export default styles;