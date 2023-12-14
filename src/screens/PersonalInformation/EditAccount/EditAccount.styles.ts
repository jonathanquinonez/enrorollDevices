import { Platform, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerSelect: {
      width: windowDimentions.width * 0.85,
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
    pickerContainer: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      minWidth: '100%',
    },
    labelContainer: {
      paddingHorizontal: 2,
      width: windowDimentions.width * 0.85,
    },
    labelSelected: {
      alignSelf: 'flex-start',
      color: '#022F58',
      fontFamily: 'proxima-bold',
      marginTop: 9,
      fontSize: 16,
      marginBottom: 5
    },
    pickerWithIcon: {
      marginRight: Platform.OS === 'ios' ? windowDimentions.width * .73 : windowDimentions.width * 0.98
    },
    pickerWithIcon2: {
      marginRight: Platform.OS === 'ios' ? windowDimentions.width * 0 : windowDimentions.width * 0.2
    },
    icon: {
      paddingTop: Platform.OS === 'ios' ? 0 : 16,
      position: 'absolute',
      right: Platform.OS === 'ios' ? 10 : 0,
      marginTop: Platform.OS === 'ios' ? 0 : 6,
    },
    icon2: {
      paddingTop: Platform.OS === 'ios' ? 0 : 16,
      position: 'absolute',
      right: Platform.OS === 'ios' ? 10 : 0,
      marginTop: Platform.OS === 'ios' ? 5 : 6,
    },
  });

export default styles;
