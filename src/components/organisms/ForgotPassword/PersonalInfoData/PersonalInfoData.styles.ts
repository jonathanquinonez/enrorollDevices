import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      width: Dimensions.get('window').width,
      alignItems: 'center'
    },
    input: {
      width: Dimensions.get('window').width * 0.85
    },
    label: {
      color: '#055293'
    },
    btnSupport:{
      marginBottom: '7%', marginLeft: '3%', marginVertical: 20
    }, 
    textBtnSupport:{
      fontWeight: 'bold', fontSize: 17, color: '#055293', paddingLeft: '1%', textDecorationLine: 'underline'
    }
  });

export default styles;