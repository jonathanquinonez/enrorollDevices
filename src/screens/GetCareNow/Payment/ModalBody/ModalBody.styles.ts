import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      paddingLeft:'4%', 
      paddingRight:'5%', 
      justifyContent: 'center', 
      width: '100%',
    },
    title: {
      textAlign: 'center', 
      fontSize: 24, 
      color: '#065394',
      fontFamily: 'proxima-bold',
    },
    subTitle: {
      fontSize: 16, 
      textAlign: 'center', 
      color: '#065394', 
      fontFamily: 'proxima-bold',
      marginTop: 20
    },
    icon: {
      fontSize: 16, 
      textAlign: 'center', 
      color: '#065394', 
      fontFamily: 'proxima-semibold'
    },
    textRow: {
      fontSize: 16, 
      top:4,
      fontFamily: 'proxima-regular',
      textAlign: 'center', 
      color: '#065394'
    },
    textRow2: {
      fontSize: 16, 
      top:0,
      fontFamily: 'proxima-regular',
      textAlign: 'center', 
      color: '#065394'
    },
    textTotal: {
      fontSize: 20, 
      textAlign: 'center', 
      color: '#065394', 
      fontFamily: 'proxima-bold'
    },
    row: {
      flexDirection: 'row', 
      marginTop: '4%'
    },
    columOne: {
      width: '35%', 
      alignItems: 'flex-start'
    },
    columTwo: {
      width: '65%', 
      alignItems: 'flex-end'
    },
    titleTwo: {
      textAlign: 'center',
      fontFamily: 'proxima-semibold',
      fontSize: 20, 
      color:'#065394', 
    },
    titleLocation: {
      textAlign: 'center',
      fontWeight:'700',  
      fontFamily: 'proxima-regular',
      fontSize: 18, 
      color:'#065394', 
    },
    subtitleLocation: {
      textAlign: 'center',  
      fontFamily: 'proxima-regular',
      fontSize: 16, 
      color:'#065394', 
    },
    subTitleTwo: {
      fontSize: 16,
      fontFamily: 'proxima-regular',
      textAlign: 'center', 
      color: '#5B5C5B', 
      fontWeight: '400', 
      marginTop: '5%'
    },
    rowTwo: {
      flexDirection: 'row',
      marginTop: '13%', 
      alignItems: 'center', 
      alignContent: 'center'
    },
    valueTwo: {
      fontSize: 20, 
      textAlign: 'right', 
      color: '#065394', 
      fontFamily: 'proxima-regular',
    },
    btn: {
      backgroundColor: '#fff', 
      marginHorizontal: 10,
      paddingVertical: 15, 
      borderRadius: 30, 
      borderWidth: 1, 
      borderColor: '#065394'
    },
    titleThree: {
      fontFamily: 'proxima-regular',
      textAlign: 'center', 
      fontSize: 18, 
      color: '#055293', 
      fontWeight: '600'
    },
    subTitleThree: {
      textAlign: 'center', 
      fontSize: 18, 
      color: '#055293', 
      marginTop: '2%'
    },
    subTitleFour: {
      fontFamily: 'proxima-regular',
      textAlign: 'center', 
      fontSize: 16, 
      color: '#055293', 
      marginTop: '10%'
    },
    titleSuccesTransaction: {
      textAlign: 'center', 
      fontSize: 18,
      color: '#055293', 
      fontFamily: 'proxima-semibold',
      marginTop: '4%',
    },
    titleNotApplicable: {
      fontFamily: 'proxima-bold',
      fontSize: 20,
      lineHeight: 20,
      textAlign: 'center',
      color: '#002E58',
      fontWeight: '700'
    },
    subTextNotApplicable: {
      fontFamily: 'proxima-regular',
      fontSize: 16,
      textAlign: 'center',
      color: '#5B5C5B',
      lineHeight: 16,
      fontWeight: '400',
      marginTop: 20
    }
  });

export default styles;