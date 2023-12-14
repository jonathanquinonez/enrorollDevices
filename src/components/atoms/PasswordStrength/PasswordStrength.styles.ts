import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      paddingBottom: 24,
      width: '85%',
      paddingTop:0
    },
    icon: {
      marginRight: 4,
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 8,
       
    },
    label: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      lineHeight: 17,
      color: colors.BLUEDC1,
      textDecorationLine: 'underline',
    },
    value: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      lineHeight: 17,
      color: colors.GREENDC1,
      textDecorationLine: 'underline',
    },
    indicatorContainer: {
      flexDirection: 'row',
      width: '55%',
    },
    indicator: {
      borderRadius: 4,
      height: 4,
      
    },
    indicatorGray: {
      borderRadius: 4,
      flex: 1,
      marginRight: 8,
      backgroundColor: colors.GRAY_MEDIUM,
      
    },
    secondIcon: {
      alignItems: 'flex-start',
      paddingRight: 5,
    },
    textBlue: {
      marginTop: 24,
      marginBottom: 32,
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 24,
      color: '#055293',
    },
    containerModal: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

export default styles;
