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
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: colors.BLUE307,
      marginBottom: 35,
      marginTop: 35
    },
    tittle: {
      textAlign: 'center',
      fontFamily: 'proxima-bold',
      fontSize: 20,
      lineHeight: 20,
      letterSpacing: 0.25,
      color: "#012A58",
      marginBottom: 7,
      marginTop: 20
    },
    button: {
      marginTop: 4,
      marginBottom: 5,
      paddingLeft:30,
      paddingRight:30,
     
    },
    secondaryText: {
			color: "#012A58",
      fontFamily: 'proxima-bold',
      fontSize: 16,
		}, 
    head:{
      justifyContent: 'center',
      backgroundColor:"#3CA70D",
      padding:10,
      borderRadius:16,
      marginTop:20,
    },
    logo_image: {
      width: 16,
      height: 16,
      justifyContent: 'center',
      
  },
  });

export default styles;