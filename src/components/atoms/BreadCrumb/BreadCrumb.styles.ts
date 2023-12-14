import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    routeText: {
      color: colors.BLUEDC1,
      fontFamily: 'proxima-regular',
      fontSize: 16,
      lineHeight: 16,
      paddingRight: 8
    },
    icon: {
      marginRight: 8,
    },
    routeTextLink: {
      textDecorationLine: 'underline',
    },
  });

export default styles;
