import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    linearGradient: {
      width,
      alignItems: 'center',
      flex: 1
    },
    textTitle: {
      color: colors.WHITE,
      fontFamily: 'proxima-bold',
      fontSize: 24,
      marginTop: 16,
      marginBottom: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSub: {
      color: "#DBDBDB",
      fontSize: 12,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'proxima-regular',
    },
    logo_bar: {
      width: '100%',
      height: 2,
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'stretch',
    },
    justifyText: {
      flexDirection: 'row',
      alignSelf: 'center',
      justifyContent: 'space-around',
      width: '95%',
      marginVertical: 10,
    },
    buttons: {
      width: 44,
      height: 44,
      backgroundColor: '#002D57',
      borderRadius: 100,
      opacity: 0.5
    },
    iconoClose: {
      alignSelf: 'center',
      marginTop: 13,
      width: 18.41,
      height: 18.41,
    }
  });

export default styles;
