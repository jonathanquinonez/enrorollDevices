import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'src/config/theme';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    button: {
      minHeight: 45,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonDisabled: {
      backgroundColor: '#DBDBDB',
      borderColor: '#DBDBDB'
    },
    buttonContained: {
      borderRadius: 22,
      backgroundColor: '#0071A3',
    },
    buttonUnderline: {
      minHeight: 0
    },
    buttonOutlined: {
      width: 200,
      borderRadius: 22,
      borderColor: '#0071A3',
      backgroundColor: '#fff',
      borderWidth: 1
    },
    pressed:{
      backgroundColor: '#0071A3'
    },
    buttonOutlinedFocus: {
      width: 200,
      borderRadius: 22,
      borderColor: '#0071A3',
      backgroundColor: '#fff',
      borderWidth: 1
    },
    buttonText: {
      minHeight: 0,
      backgroundColor: 'transparent',
    },
    text: {
      fontSize: 14,
      lineHeight: 22,
      fontFamily: 'proxima-regular',
      paddingHorizontal: 30,
      textAlign: 'center',
    },
    textDisabled: {
      color: '#5B5C5B',
    },
    approvedText: {
      color: '#3CA70D',
    },
    textContained: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 19,
      color: colors.WHITE,
    },
    textOutlined: {
      color: '#0071A3',
    },
    textOutlinedFocus: {
      color: '#0071A3',
    },
    textUnderline: {
      textDecorationLine: 'underline',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: colors.DARKBLUE,
      lineHeight: 17,
    },
    textText: {
      color: '#0071A3',
    },
    textPressed: {
      color: colors.WHITE
    }
  });

export default styles;
