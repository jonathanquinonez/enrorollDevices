import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    label: {
      marginTop: 5,
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 17,
      marginBottom: 5,
    },
    inputContainer: {
      paddingHorizontal: 2,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 5,
      borderWidth: 1,
      borderColor: '#DBDBDB',
      borderRadius: 5,
      width: windowDimentions.width * 0.90,
      backgroundColor: colors.WHITE
    },
    inputContainerActive: {
      borderBottomColor: colors.BLUE307,
    },
    iconPad: {
      width: 45,
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    secondIcon: {
      alignItems: 'flex-end',
      paddingRight: 12,
    },
    input: {
      flex: 1,
      minHeight: 44,
      fontSize: 14,
      lineHeight: 17,
      color: colors.GRAYDC1,
      borderTopEndRadius: 5,
      borderTopStartRadius: 5,
      fontFamily: 'proxima-regular',
      top: 0,
      left: 0,
    },
  });

export default styles;
