import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    
    breadCrumbText: {
      fontFamily: 'proxima-regular',
      color: colors.WHITE
    },
    contentBreadCrumb: {
      alignSelf: "flex-start",
      marginTop: 15, marginLeft: 30
    },
    containerPagination: {
      backgroundColor: colors.BLUE8AF,
      alignItems: 'center',
      height: '100%'
    },
    iconButton: {
      position: 'absolute',
      top: -15,
      zIndex: 2,
      right: 20
    },
    layout: {
      backgroundColor: colors.GRAY_LIGHT_4,
      borderTopLeftRadius: 40,
      paddingTop: 10
    },
    shadow: {
      alignSelf: "center",
      width: '95%',
      height: 30,
      position: "absolute",
      zIndex: 1,
      borderTopLeftRadius: 60
    },

    
    radioGroup: {
      paddingTop: 32,
      paddingHorizontal: 10,
    },
    radioButton: {
      paddingRight: 24,
    },
    title: {
      fontSize: 14,
      color: colors.BLUEDC1,
      paddingTop: 24,
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    textVerification: {
      fontFamily: 'proxima-bold',
      fontSize: 18,
      color: colors.BLUEDC1,
      marginBottom: 16,
      lineHeight: 21,
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 14,
      letterSpacing: 0,
      color: colors.GRAYDC1,
      width: '100%',
      marginBottom: 40
    },
    textMobileNumber: {
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 15,
    },
    textRadioButton: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.GRAYDC1
    },
    textSelectEmail: {
      marginHorizontal: 20,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.BLUEDC1,
      marginBottom: 15
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 25
    }
  });

export default styles;