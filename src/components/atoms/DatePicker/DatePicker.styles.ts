import { Dimensions, StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const { height, width } = Dimensions.get('screen');

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    inputContainer: {
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#DBDBDB',
      borderRadius: 5,
      width: '100%',
      backgroundColor: colors.WHITE,
      height: 44,
      color: colors.GRAYDC1,
      borderTopEndRadius: 5,
      borderTopStartRadius: 5,
      marginBottom: 10,
    },
    content: { width: '90%', alignItems: 'center' },
    label: {
      alignSelf: 'flex-start',
      marginTop: 5,
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      fontSize: 16,
      lineHeight: 17,
      marginBottom: 5,
    },
    errorContainer: {
      marginVertical: 15,
      width: '100%',
      height: 15,
    },
    errorMessage: {
      fontFamily: 'proxima-regular',
      color: colors.DANGER,
      fontSize: 12,
    },
    textInput: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      lineHeight: 16,
      color: '#626362',
      paddingLeft: 12,
      paddingTop: 6,
    },
    placeHolder: {
      fontFamily: 'proxima-regular',
      fontSize: 15,
      lineHeight: 16,
      color: '#adadad',
      paddingLeft: 12,
      paddingTop: 3,
    },
    backdrop: {
      backgroundColor: 'rgba(0,0,0,0.6)',
      position: 'absolute',
      width,
      height,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    container: {
      backgroundColor: 'white',
      borderRadius: 8,
      width: width * 0.85,
    },
    containerOverlap: {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: 8,
      width: width * 0.85,
      zIndex: 1001,
    },
    closeTrigger: {
      width,
      height,
    },
    closeContainer: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 20,
    },
    calendar: {
      paddingTop: 20,
      paddingHorizontal: 10,
      width: '100%',
    },
    headerTextContainer: {
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 18,
      color: colors.BLUEDC1,
      fontFamily: 'proxima-bold',
      paddingHorizontal: 8,
    },
    monthButtonContainer: {
      paddingVertical: 8,
      paddingHorizontal: 32,
    },
    dayHeaderContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      paddingBottom: 10,
    },
    week: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
    },
    buttonContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    bottomButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingHorizontal: 32,
      paddingBottom: 18,
      width: '100%',
    },
    button: {
      minWidth: '20%',
      flexGrow: 0.5,
    },
    cancelButtonText: {
      color: colors.GRAYDC1_TRANSPARENT,
    },
    outOfMonth: {
      color: colors.GRAY_MEDIUM_3,
    },
  });

export default styles;
