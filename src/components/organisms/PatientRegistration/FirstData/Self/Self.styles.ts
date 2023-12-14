import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      alignItems: 'center'
    },
    item: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      lineHeight: 20,
      width: '95%'
    },
    input: {
      width: Dimensions.get('window').width * 0.90,
      marginBottom: 15
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
    customRow: {
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.90,
    },
    textConsents: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      paddingTop: 8,
      paddingBottom: 8,
      lineHeight: 20,
      textAlign: 'left',
      width: Dimensions.get('window').width * 0.90,
    },
    itemConsents: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      lineHeight: 20
    },
    customRowCheck: {
      width: Dimensions.get('window').width * 0.90,
    },
    textCheckbox: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      paddingTop: 8,
      paddingBottom: 8,
      lineHeight: 20,
      width: Dimensions.get('window').width * 0.82,
    },
    titleConsents: {
      color: colors.BLUEDC1,
      fontSize: 16,
      fontFamily: 'proxima-bold',
      paddingTop: 8,
      lineHeight: 20,
      width: Dimensions.get('window').width * 0.90,
    },
    hr: {
      width: Dimensions.get('window').width * 0.90,
      borderWidth: 0.5,
      color: '#757575',
      marginBottom: 10
    },
    require: {
      color: '#CA2300',
      paddingTop:0,
      flexDirection: "row",
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      width: Dimensions.get('window').width * 0.85,
    },
  });

export default styles;