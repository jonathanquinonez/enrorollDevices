import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    rootContainer: {
      marginBottom: 20, 
      height:'93%', 
      flexDirection: 'column'
    },
    mainContainer: {
      flex: 1,
    },
    cardContainerStyle: {
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 5,
      margin: 5,
      width: 220,
    },
    layout: {
      flex: 1,
      backgroundColor: colors.WHITE,
      borderTopLeftRadius: 60,
      borderWidth: 1,
      borderColor: colors.BORDER_GRAY,
      paddingLeft: 35, 
      paddingRight:15, 
      paddingBottom:15
    },
    titleMentalHealth: {
      width: Dimensions.get('window').width * 0.7,
      color: '#002D58',
      fontSize: 20,
      fontFamily: 'proxima-bold'
    },
    iconMentalHealth: {
      alignItems: 'center'
    },
    bodyMentalHealth: {
      width: Dimensions.get('window').width * 0.8,
      borderColor: colors.TEXTCOLORLIGHT,
      fontFamily: 'proxima-regular'

    },
    indicator_container:{
      width: Dimensions.get('window').width,
      alignItems: 'center',
    },
    title_container:{
      width: Dimensions.get('window').width,
      alignItems: 'flex-start',
    },
    actions_container:{
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title_font:{
      fontSize: 20,
      color: '#022F58',
      fontFamily: 'proxima-bold',
      textAlign: 'left',
      marginVertical: 15,
      marginHorizontal: 5
    },
    title_group:{
      marginHorizontal: 5,
      marginVertical: 5,
      alignContent: 'center',

    },
    scroll: {
      width: Dimensions.get('window').width * .85,
    },
    text_font:{
      color: colors.TEXTCOLORLIGHT,
      margin: 5,
      fontFamily: 'proxima-regular',
    },
    group_button: {
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    card:{
      justifyContent: 'center',
			width: '100%',
			alignContent: 'center',
			alignItems: 'center',
      height:'93%', 
			flexDirection: 'column',
      borderRadius: 10,
      backgroundColor: colors.WHITE,
      padding: 5,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84,
      marginVertical: 10
    },
    textLink: {
      textDecorationLine: 'underline',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.BLUE307,
      lineHeight: 17,
    }
  });

export default styles;