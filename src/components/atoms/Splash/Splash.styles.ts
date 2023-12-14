import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#0a3f6c',
      height: Dimensions.get('window').height,
      justifyContent: 'center', alignSelf: 'center'
    },
    shadowImage: {
      width: Dimensions.get('window').height * 1.4,
      height: Dimensions.get('window').height * 1.4
    }
  });

export default styles;
