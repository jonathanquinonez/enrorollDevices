import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '90%',
      top: '10%',
      alignSelf: 'center',
      flexDirection: 'row',
      borderRadius: 8,
      borderLeftWidth: 9,
      borderWidth: 1,
      alignItems: 'center',
    },
    colorError: {
      backgroundColor: '#E6CECE',
      borderColor: '#B50303'
    },
    colorWarning: {
      backgroundColor: '#F2D99E',
      borderColor: '#E7A304'
    },
    colorSucces: {
      backgroundColor: '#FFF',
      borderColor: '#407F06'
    },
    colorIconError: {
      backgroundColor: '#B50303'
    },
    colorIconWarning: {
      backgroundColor: '#F2D99E'
    },
    colorIconSucces: {
      backgroundColor: '#407F06'
    },
    icon: {
      width: 32,
      height: 32,
      padding: 6
    },
    containerText: {
      marginHorizontal: 15,
      width: '75%',
      alignItems: 'flex-start',
      marginVertical: 10
    },
    button: {
      color: '#B50303',
      paddingHorizontal: 0,
      marginTop: 5,
      fontFamily: 'proxima-bold'
    },
    text: {
      fontFamily: 'proxima-regular'
    }
  });

export default styles;
