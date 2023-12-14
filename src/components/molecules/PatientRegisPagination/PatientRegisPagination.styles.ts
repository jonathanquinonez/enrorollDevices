import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    layout: {
      backgroundColor: colors.BACKGROUND_GRAY,
      borderTopLeftRadius: 40,
    },
    container: {
      marginTop: 24
    },
    iconButton: {
      position: 'absolute',
      top: -20,
      right: 20
    },
    textTitle: {
      fontFamily: 'proxima-bold',
      fontSize: 18,
      color: '#055293',
    },
    title_font: {
      fontFamily: 'proxima-bold',
      marginBottom: 18,
      marginLeft: 30,
      fontSize: 18,
      lineHeight: 22,
      color: colors.BLUEDC1
    },
    text_font: {
      fontSize: 24,
      fontFamily: 'proxima-regular',
      lineHeight: 29,
      color: colors.TEXTCOLORLIGHT
    },
    group_button: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    buttonNext: {
      marginVertical: 27,
      alignItems: "center"
    },
    buttonBack: {
      alignItems: "center"
    },
    name: {
      fontFamily: 'proxima-regular',
      fontSize: 16,
      lineHeight: 19,
      color: '#055293',
    },
    contentContainerScroll: {
      alignItems: 'center',
      width: '100%'
    },
    secondaryText: {
      color: "#0069A7"
    },
    textButton: {
			fontFamily: 'proxima-bold',
			fontSize: 18,
      fontWeight: '600',
      paddingTop: '2%',
      paddingLeft: 8,
      color: '#055293',
      
		},
  });

export default styles;