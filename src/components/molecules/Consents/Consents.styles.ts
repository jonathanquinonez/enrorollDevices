import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      // backgroundColor: colors.BACKGROUND_GRAY,

      width: Dimensions.get('window').width - 10,
      alignSelf: "center",
      paddingBottom: 5,
      flexGrow: 1,
      
    },
    contentContainer: {
      justifyContent: 'flex-start',
    },
    containerForm: {
      paddingTop: 5,
      paddingLeft: Dimensions.get('window').width * 0.045,
      paddingRight: Dimensions.get('window').width * 0.02,
      justifyContent: 'flex-start',

      
    },
    input: {
      
      fontFamily: 'proxima-bold'
    },
    text: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      paddingTop: 8,
      paddingBottom: 8,
      lineHeight: 20
    },
    textCheckbox: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      paddingBottom: 8,
      paddingLeft: 12,
      lineHeight: 20
    },
    textLink: {
      color: colors.BLUEDC1,
      fontSize: 16,
      textDecorationLine: 'underline',
      fontFamily: 'proxima-bold',
      textAlign: 'left',
      paddingTop: 11,
      paddingBottom: 11,
      lineHeight: 20
    },
    textLink2: {
      color: colors.BLUEDC1,
      fontSize: 16,
      fontFamily: 'proxima-bold',
      textAlign: 'left',
      paddingTop: 11,
      paddingBottom: 11,
      lineHeight: 20,
      textDecorationLine: 'underline'
    },

    itemBold: {
      padding:0,
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-bold',
      textAlign: 'left',
    },
    itemP: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      paddingTop: 11,
      lineHeight: 20
    },
    label: {
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
    },
    tittle: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      color: '#055293',
    },
    row: {
      flexDirection: 'row', 
      alignItems: 'flex-start', 
      display:'flex'
    },
    li: {
      paddingBottom: 11,
      
    },
    item: {
      color: colors.GRAYDC1,
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'left',
      lineHeight: 20,
      
    },
    justifyText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 330,
      marginBottom: 10
    },
    customRow: {
      flexDirection: "row",
    },
    customRow2: {
    },
    customRowCheck: {
      flexDirection: 'row', 
      alignItems: 'flex-start', 
      marginBottom: 21

    },
    customRowCheckTop: {
      alignSelf: "flex-start",
      // paddingTop: 20
    },
    date: {
      flexDirection: 'row',
      width: '100%',

    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingBottom: 10,
      paddingTop: 10,
    },
    secondaryText: {
      color: "#0069A7"
    },
    firm: {
      paddingHorizontal: 15,
      width: Dimensions.get('window').width * 0.90,

    }
  });

export default styles;
