import { KeraltyColors } from "config/theme";
import { Dimensions } from 'react-native';
import { windowDimentions } from "ui-core/utils/globalStyles";
import { Platform, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: '#F1F1F1',
    },
    icon: {
      paddingTop: Platform.OS === 'ios' ? 0 : 16,
      position: 'absolute',
      right: 0,
      marginTop: Platform.OS === 'ios' ? 0 : 6,
    },
    icon2: {
      paddingTop: Platform.OS === 'ios' ? 0 : 16,
      position: 'absolute',
      right: Platform.OS === 'ios' ? 10 : 0,
      marginTop: Platform.OS === 'ios' ? 5 : 6,
    },
    containerSelect: {
      width: windowDimentions.width * 0.85,
      marginBottom: 10,
      flexDirection: 'row',
      paddingHorizontal: 16,
      height: 44,
      alignItems: 'center',
      backgroundColor: '#DBDBDB',
      borderColor: '#DBDBDB',
      borderWidth: 1,
      borderRadius: 5,
    },
    pickerContainer: {
      flex: 1,
      height: 45,
      justifyContent: 'center',
      minWidth: '100%'
    },
    pickerWithIcon: {
      marginRight: Platform.OS === 'ios' ? windowDimentions.width * .73 : windowDimentions.width * 0.98
    },
    pickerWithIcon2: {
      marginRight: Platform.OS === 'ios' ? windowDimentions.width * 0 : windowDimentions.width * 0.2
    },
    body: {
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center'
    },
    row: {
      flexDirection: 'row',
    },
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingHorizontal: 30,
    },
    text: {
      textAlign: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 18,
      lineHeight: 24,
      letterSpacing: 0.25,
      color: '#5B5C5B',
      marginBottom: 20,
      marginTop: 25,
      paddingLeft: 41,
      paddingRight: 41
    },
    tittle: {
      textAlign: 'left',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      lineHeight: 18,
      letterSpacing: 0.25,
      color: "#012A58",
      paddingLeft: 18

    },
    goBack: {
      textAlign: 'left',
      fontSize: 12,
      lineHeight: 18,
      letterSpacing: 0.25,
      color: "#3CA70D",

      paddingTop: 10,
      paddingBottom: 10

    },
    button: {
      minWidth: 140,
      marginTop: 4,
      marginBottom: 90,
      backgroundColor: "#fff",
      borderColor: "#0069A7",
      borderWidth: 2,
      borderRadius: 60
    },
    buttonBlue: {
      minWidth: 140,
      marginTop: 30,
      marginBottom: 5,
      borderRadius: 60
    },
    secondaryText: {
      color: "#0069A7",
      fontFamily: 'proxima-bold',
      fontSize: 16,
    },
    head: {
      justifyContent: 'center',
      marginTop: 20,
    },
    logo_image: {
      width: 100,
      height: 100,
      justifyContent: 'center',
    },
    textArea: {
      height: 100,
      width: Dimensions.get('window').width * 0.85,
      padding: 0,
      margin: 0,
      paddingHorizontal: 15,
      backgroundColor: '#fff',
      fontFamily: 'proxima-regular',
      color: '#5B5C5B',
      alignItems: 'flex-start'
    }

  });

export default styles;
