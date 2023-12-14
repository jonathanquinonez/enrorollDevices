import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerForm: {
      flexDirection: 'column',
      width: Dimensions.get('window').width * 0.90,
      alignItems: 'center'
    },
    buttonNext: {
      alignItems: "center",
      marginBottom: 40,
      marginTop: 30
    },
    contentRow: {
      paddingHorizontal: 5,
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%',
      flexDirection: 'row'
    },
    text: {
      fontFamily: 'proxima-bold',
      width: '90%',
      fontSize: 14,
      lineHeight: 17,
      color: colors.GRAYDC1,
      left: 15
    },
    textSupport: {
      fontFamily: 'proxima-regular',
      alignSelf: 'flex-start',
      color: "#999999",
      textAlign:'justify',
      fontWeight: '400',
      marginTop: 5
    },
    textError: {
      fontFamily: 'proxima-bold',
      textAlign:'center',
      color: 'red',
      fontWeight: '600',
      marginTop: 20,
      fontSize: 15,
    }
  });
export default styles;