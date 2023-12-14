import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    subText: {
      fontFamily: 'proxima-bold',
      fontSize: 16,
      marginVertical: 16,
      color: '#002D57'
    },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      marginBottom: 15,
      color: '#002D57'
    },
    linearGradient: {
      alignSelf: 'center',
      width: Dimensions.get('window').width,
      paddingBottom: Dimensions.get('window').height * 0.265,
    },
    btn: {
      position: 'absolute',
      alignSelf: 'center',
    },
    contentRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    content: {
      backgroundColor: '#FFF',
      paddingHorizontal: 15,
      paddingVertical: 20,
      borderRadius: 10,
      marginVertical: 8,
      marginTop: 30
    },
    icon: {
      paddingHorizontal: 8,
      width: '15%'
    },
    contentText: {
      width: '15%',
      alignItems: 'center'
    },
    title2: {
      width: '70%',
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#002E58'
    },

  });

export default styles;
