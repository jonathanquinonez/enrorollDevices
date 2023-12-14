import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    itemContainer: {
      flex: 1,
      minWidth: '30%',
      paddingVertical: 16,
      alignItems: 'center',
    },
    text: {
      color: colors.BLUEDC1,
      fontFamily: 'proxima-regular',
    },
    selected: {
      fontFamily: 'proxima-bold',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    headerText: {
      fontSize: 18,
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      paddingHorizontal: 8,
    },
    monthButtonContainer: {
      paddingVertical: 8,
      paddingHorizontal: 32,
    },
    headerTextContainer: {
      flexDirection: 'row',
    },
  });

export default styles;
