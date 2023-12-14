import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { isIphoneX } from 'src/utils/devices';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      bottom: isIphoneX() ? 24 : 17,
      flex: 1,
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 12,
      paddingTop: 1,
      textAlign: 'center',
      justifyContent: 'center'
    },
    textSelected: {
      color: '#002D57',
      fontFamily: 'proxima-semibold',
    },
    focus_container:{
			backgroundColor: '#DBDBDB',
			height: 35,
			width: 35,
			alignContent: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: 50
		}
  });

export default styles;
