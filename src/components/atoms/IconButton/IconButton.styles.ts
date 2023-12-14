import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 3,
      paddingHorizontal: 3,
      borderRadius: 40,
      backgroundColor: colors.GREENDC1,
      width: 44,
      height: 44,
    },
    title: {
      color: colors.GREENDC1,
      fontFamily: 'proxima-regular',
      fontSize: 16,
      textAlign: 'right',
      paddingHorizontal: 16,
    },
    iconSmall: {
      width: 30,
      height: 30,
    },
    iconRadianceGreen: {
      width: 54,
      height: 54,
      borderColor: 'rgba(60, 167, 13, 0.25)',
      borderWidth: 4,
      shadowColor: colors.GREENDC1,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    iconRadianceBlue: {
      backgroundColor: colors.primary,
      width: 59,
      height: 59,
      borderColor: '#d9e9f2',
      borderWidth: 7,
    },
    iconHeader: {
      backgroundColor: 'rgba(0, 45, 87, 0.5)'
    },
    iconFloat: {
      width: 45,
      height: 45,
      borderRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }
  });

export default styles;
