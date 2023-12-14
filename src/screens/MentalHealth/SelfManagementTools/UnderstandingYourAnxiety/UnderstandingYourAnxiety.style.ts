import { KeraltyColors } from 'config/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    voidText: {
      marginTop: 30,
      fontFamily: 'proxima-regular',
      fontSize: 18,
      color: '#5B5C5B'
    },
    void: {
      alignItems: 'center',
      height: Dimensions.get('window').height * 0.5,
      justifyContent: 'center'
    },
    linearGradient: {
      position: 'absolute',
      bottom: 0,
      alignSelf: 'center',
      width: '100%',
      paddingBottom: Dimensions.get('window').height * 0.265
    }
  });

export default styles;