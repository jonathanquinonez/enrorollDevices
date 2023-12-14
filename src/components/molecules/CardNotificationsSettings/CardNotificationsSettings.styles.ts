import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    content: {
      backgroundColor: '#FFF',
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderRadius: 10,
      marginVertical: 8
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon: {
      paddingHorizontal: 8,
      width: '15%'
    },
    contentText: {
      width: '15%',
      alignItems: 'center'
    },
    title: {
      width: '70%',
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#002E58'
    },

  });

export default styles;
