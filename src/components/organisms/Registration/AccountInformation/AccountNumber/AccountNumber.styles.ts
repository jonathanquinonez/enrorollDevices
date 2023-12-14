import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const { width } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    note: {
      color: '#5B5C5B',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: 10,
      textAlign: 'center',
      marginBottom: 30,
      width: Dimensions.get('window').width * 0.8
    }
  });

export default styles;
