import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    contentBreadCrumb: {
      alignSelf: "flex-start",
      marginTop: 15, 
      marginLeft: 30,
      paddingTop: 25
    },
    breadCrumbText: {
      fontFamily: 'proxima-regular',
      color: colors.WHITE,
      fontSize: 14
    },
    containerPagination: {
      backgroundColor: colors.BLUE8AF,
      alignItems: 'center',
      height: '100%'
    },
    iconButton: {
      position: 'absolute',
      top: -25,
      zIndex: 2,
      right: 20
    },
    layout: {
      backgroundColor: colors.GRAY_LIGHT_4,
      borderTopLeftRadius: 40,
      paddingTop: 25
    },
    shadow: {
      alignSelf: "center",
      width: '95%',
      height: 30,
      position: "absolute",
      zIndex: 1,
      borderTopLeftRadius: 60
    },
  });

export default styles;