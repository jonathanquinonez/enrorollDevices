import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width * 0.9,
      marginVertical: 20
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 18,
      color: '#002E58'
    },
    datePicker: {
      paddingTop: 11,
    },
    buttonContainer: {
      width: Dimensions.get('window').width * 0.9,
      flexDirection: 'row',
      paddingTop: 30,
      justifyContent: 'space-around',
      alignItems: 'center',
      marginBottom: 15
    },
    cancelButton: {
      paddingVertical: 10,
      color: '#0071A3',
      fontFamily: 'proxima-semibold',
      textTransform: 'capitalize',
      fontSize: 17,
    },
    filterButton: {
      textTransform: 'capitalize',
      fontSize: 17,
      paddingHorizontal: 50
    }
  });

export default styles;
