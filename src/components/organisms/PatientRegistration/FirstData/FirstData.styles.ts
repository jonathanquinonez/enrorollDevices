import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      alignItems: 'center'
    },
    input: {
      width: '85%',
      marginBottom: 30
    },
    radioGroup: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: colors.BLUEDC1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 15,
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 16,
      color: '#5B5C5B',
    },
    radioButton: {
      paddingRight: 0,
    },
    label: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: '#055293',
    },
    titleRadioButtons: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: '#055293',
      paddingTop: 15
    }
  });

export default styles;