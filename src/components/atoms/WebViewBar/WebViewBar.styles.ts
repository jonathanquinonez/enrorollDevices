import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'flex-end',
      alignSelf: 'stretch',
      height: 50,
      backgroundColor: colors.GREENDC1,
    },
    closeSign: {
      fontFamily: 'proxima-bold',
					fontSize: 18,
					color: colors.WHITE,
					marginRight: 30,
    },
   
  });

export default styles;
