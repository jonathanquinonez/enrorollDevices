import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: 'row'
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 17,
      color: '#5B5C5B',
      marginLeft: 10
    }
  });

export default styles;