import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').width,
      position: 'absolute',
      zIndex: 2,
      justifyContent: 'center',
      alignItems: 'center',
      bottom: -(Dimensions.get('window').width * 0.26)
    },
    iconCenter: {
      flexDirection: 'row',
      width: Dimensions.get('window').width * 0.85,
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute'
    },
    iconTop: {
      width: '90%',
      top: '7%',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      height: '28%'
    },
    text: {
      marginTop: 10,
      fontFamily: 'proxima-regular',
      fontSize: 15,
      lineHeight: 16,
      alignItems: 'center',
      textAlign: 'center',
      color: '#FFFFFF',
    },
    background: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      backgroundColor: 'white',
      opacity: 0.5,
      position: 'absolute',
    },
    pressIconCenter: {
      alignItems: 'center',
      width: 90,
      marginBottom: 85
    }
  });

export default styles;
