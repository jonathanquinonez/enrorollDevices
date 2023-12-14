import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    content: {
      height: 44,
      width: '100%',
      backgroundColor: '#F1F1F1',
      justifyContent: 'center',
      borderRadius: 7,
      marginVertical: 8
    },
    contentRow: {
			flexDirection: 'row',
      alignItems: 'center'
		},
    touch:{
      marginHorizontal: 16
    },
    text: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#002E58'
    }
  });

export default styles;
