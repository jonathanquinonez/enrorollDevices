import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";
import { isIphone } from "src/utils/devices";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    card_container: {
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 45, 87, 0.3)',
      marginHorizontal: 4,
      backgroundColor: colors.WHITE,
      minHeight: 90,
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
      width: '80%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    label: {
      paddingHorizontal: 10,
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: '#212121'
    },
    columnLeft: {
      width: '20%',
      alignItems: 'center',
      justifyContent: 'center'
    },
    date: {
      fontFamily: 'proxima-bold',
      color: '#002E58',
      fontSize: 18
    },
    line: {
      height: 59, 
      width: 1, 
      backgroundColor: '#065394',
      alignSelf: 'center'
    }
  });

export default styles;
