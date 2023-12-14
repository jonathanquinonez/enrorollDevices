import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    contentRow: {
      marginTop: 25,
			alignItems: 'center',
			flexDirection: 'row',
		},
    titleConfig: {
      marginLeft: 4,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      color: '#0071A3',
    },
    subText: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      marginTop: 16,
      marginBottom: 10,
      color: '#000'
    },
    textModal: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      color: '#0071A3',
      marginLeft: 16,
    },
    btn:{
      fontFamily: 'proxima-bold',
      fontSize: 16,
      color: '#0071A3',
      marginTop: 15,
      marginBottom: 20
    },
    contentTextModal: {
      paddingVertical: 25,
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.8
    },
    contentModal: {
      
    },
    void: {
      height: Dimensions.get('window').height * 0.55,
      justifyContent: 'center',
      alignItems: 'center'
    },
    textVoid: {
      fontFamily: 'proxima-regular',
      fontSize: 18,
      color: '#5B5C5B',
      marginTop: 40
    }
  });

export default styles;
