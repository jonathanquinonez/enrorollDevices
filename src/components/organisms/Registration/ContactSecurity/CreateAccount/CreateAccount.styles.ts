import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const { width } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    item: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      lineHeight: 20
    },
    customRow: {
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.9
    },
    text: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      paddingTop: 8,
      paddingBottom: 8,
      lineHeight: 20,
      textAlign: 'left',
      width: Dimensions.get('window').width * 0.9

    },
  });

export default styles;
