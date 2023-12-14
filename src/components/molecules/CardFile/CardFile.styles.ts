import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";
import { isIphone } from "src/utils/devices";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    card_container: {
      marginBottom: 24,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 45, 87, 0.3)',
      marginHorizontal: 4,
      backgroundColor: colors.WHITE,
      minHeight: 174,
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    columnRight: {
      width: '60%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontFamily: 'proxima-bold',
      marginBottom: 15,
      fontSize: 18,
      color: '#002E58'
    },
    label: {
      marginBottom: 26,
      marginLeft: 5,
      fontFamily: 'proxima-regular',
      width: '85%',
      fontSize: 14,
      color:  '#747474'
    },
    columnLeft: {
      width: '40%',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default styles;
