import { Platform, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      marginBottom: 10,
      flexDirection: 'row',
      paddingHorizontal: 16,
      height: 44,
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderColor: '#DBDBDB',
      borderWidth: 1,
      borderRadius: 5,
    },
    label: {
      marginTop: 5,
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 17,
      marginBottom: 5,
    },
    iconContainer: {
      paddingRight: 12,
    },
    icon: {
      paddingTop: Platform.OS === 'ios'?0:16,
      position: 'absolute',
      right: 0,
      marginRight: 30,
      marginTop: 8,
    },
    pickerContainer: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      minWidth: '100%',
    },
    pickerWithIcon: {
      marginRight:Platform.OS === 'ios'? windowDimentions.width * .08:windowDimentions.width * .17
    },
     pickerNoIcon: {
      marginRight:Platform.OS === 'ios'? windowDimentions.width * .01:windowDimentions.width * .105
    },
  });

export default styles;
