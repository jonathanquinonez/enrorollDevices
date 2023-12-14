import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { isIphone } from 'src/utils/devices';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      marginHorizontal: 15
    },
    title: {
      marginVertical: 10,
      textAlign: 'center',
      fontFamily: 'proxima-semibold',
      fontSize: 24,
      color: '#065394'
    },
    message: {
      color: '#065394',
      fontSize: 12,
      fontFamily: 'proxima-regular',
      textAlign: 'center'
    },
    btnSendMsg: {
      marginTop: 15,width: 240,  
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center', 
      alignSelf: 'center'
    },
    txtBtnMsg: {
      color: '#4E9D2D',
      fontSize: 14,
      fontFamily: 'proxima-regular',
    },
    containerList: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginVertical: 5
    },
    txtList: {
      fontSize: 16,
      color: '#065394',
      fontFamily: 'proxima-regular',
    }
  });

export default styles;