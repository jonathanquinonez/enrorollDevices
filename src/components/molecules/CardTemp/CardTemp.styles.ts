import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      borderRadius: 10,
      backgroundColor: colors.WHITE,
      marginHorizontal: 4,
      minHeight: 185,
      height: '100%',
      maxHeight: 180,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    textFloat: {
      zIndex: 1,
      backgroundColor: '#0269A7',
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      paddingVertical: 6,
      paddingHorizontal: 15,
      alignSelf: 'flex-start',
      color: '#FFF',
      fontFamily: 'proxima-bold',
      fontSize: 12,
      top: 15,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    title: {
      fontSize: 20,
      fontFamily: 'proxima-bold',
      color: '#3F3F3F',
      textAlign: 'center'
    },
    subA: {
      marginTop: 10,
      fontSize: 14,
      fontFamily: 'proxima-semibold',
      color: '#3F3F3F',
      textAlign: 'center'
    },
    subB: {
      fontSize: 14,
      fontFamily: 'proxima-regular',
      color: '#3F3F3F',
      textAlign: 'center',
      marginBottom: -25
    }

  });

export default styles;
