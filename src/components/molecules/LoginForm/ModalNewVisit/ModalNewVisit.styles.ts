import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 30,
      
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: '#002E58',
      marginBottom: 20,
      marginTop: 15
    },
    tittle: {
      textAlign: 'center',
      fontFamily: 'proxima-bold',
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: "#002E58",
      marginBottom: 7,
      marginTop: 20
    },
    button: {
      marginTop: 4,
      marginBottom: 5,
      backgroundColor:"#f5f5f5",
    },
    secondaryText: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
		}, 
    head:{
      justifyContent: 'center',
      marginTop:20,
    },
    logo_image: {
      width: 20,
      height: 20,
      justifyContent: 'center',
      
  },
  });

export default styles;