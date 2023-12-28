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
      width: Dimensions.get('window').width * 0.90,
      marginBottom: 15
    },
    item: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      lineHeight: 20,
      width: '95%'
    },
    radioGroup: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: colors.BLUEDC1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      marginBottom: 15
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 16,
      color: '#5B5C5B',
    },
    radioButton: {
      paddingRight: 24,
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
    },
    textButton: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
      fontWeight: '600',
      paddingTop: '2%',
      paddingLeft: 8,
      color: '#055293',
      
		},
  });

export default styles;