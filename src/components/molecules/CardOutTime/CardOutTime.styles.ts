import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";
import { isIphone } from "src/utils/devices";
import { windowDimentions } from "ui-core/utils/globalStyles";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    card_container: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 45, 87, 0.3)',
      backgroundColor: colors.WHITE,
      marginHorizontal: 4,
      minHeight: 155,
      height: '100%',
      maxHeight: 180,
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
    textFloat: {
      zIndex: 1,
      backgroundColor: '#0269A7',
      borderTopRightRadius: 50,
      borderBottomRightRadius: 50,
      paddingVertical: 6,
      paddingHorizontal: 15,
      alignSelf: 'flex-start',
      color: '#FFF',
      fontFamily: 'proxima-bold',
      fontSize: 12,
      top: 15,
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    titleCarePrograms: {
      height: 24,
      justifyContent: "center",
      backgroundColor: colors.BLUE307,
      width: '100%',
      position: 'absolute',
      top: 0,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8
    },
    card_container_horizontal: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'rgba(0, 45, 87, 0.3)',
      backgroundColor: colors.WHITE,
      minHeight: 85,
      height: '100%',
      width: '100%',
      maxHeight: 95,
      justifyContent: "space-around",
      alignItems: "center",
      padding: 10,
      flexDirection: 'row',
      flex: 1,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2
      },

      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84

    },
    text_title: {
      color: '#002D57',
      fontFamily: 'proxima-bold',
      fontSize: isIphone() ? 17 : 15,
      marginBottom: 2,
      paddingHorizontal: 0,
      textAlign: 'center'
    },
    text_subtitle: {
      color: '#5B5C5B',
      fontFamily: 'proxima-regular',
      fontSize: isIphone() ? 13 : 12,
      textAlign: 'center'
    },
    text_title_horizontal: {
      color: '#002D57',
      fontFamily: 'proxima-bold',
      fontSize: isIphone() ? 17 : 15,
      marginBottom: 1,
      textAlign: 'left'
    },
    text_subtitle_horizontal: {
      color: '#5B5C5B',
      fontFamily: 'proxima-regular',
      fontSize: isIphone() ? 13 : 12,
      textAlign: 'left',
    },
    textHour: {
      fontFamily: 'proxima-bold',
      color: '#FFF',
      fontSize: 12,
      textAlign: 'center'
    }

  });

export default styles;
