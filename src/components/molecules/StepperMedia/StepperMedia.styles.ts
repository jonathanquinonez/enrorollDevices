import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    rootContainer: {
      marginBottom: 80
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
      width: Dimensions.get('window').width * 0.85,
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
      alignItems: 'flex-start',
    },
    title_container:{
      width: Dimensions.get('window').width,
      alignItems: 'flex-start',
    },
    actions_container:{
      width: Dimensions.get('window').width * 0.85,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    title_font:{
      fontSize: 28,
      color: '#002D57',
      fontFamily: 'proxima-bold',
    },
    title_group:{
      width: Dimensions.get('window').width,
      marginHorizontal: 0,
      alignContent: 'center', 
      alignItems: 'flex-start'
    },
    scroll: {
      width: Dimensions.get('window').width * .85,
    },
    text_font:{
      color: colors.TEXTCOLORLIGHT,
      marginTop: 5,
      fontFamily: 'proxima-regular', 
      marginLeft:'3%',
    },
    group_button: {
      width: '100%',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'center',
    },
    viewBtnBack:{
      width: '50%', alignItems: 'flex-end', 
    },    
    viewBtnNext:{
      width: '45%', paddingLeft:'4%'
    },
    viewImg:{
      alignItems: 'center'
    }
  });

export default styles;