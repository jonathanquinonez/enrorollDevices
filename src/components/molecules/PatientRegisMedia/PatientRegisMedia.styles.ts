import { KeraltyColors } from 'config/theme';
import { BackHandler, Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'column',
      alignItems: 'center',
      flex: 1
    },
    header: {
      paddingVertical: 10,
      alignItems: 'center',
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-around"
    },
    media_group: {
      marginHorizontal: 25,
      width: 400,
    },
    line: {
      backgroundColor: colors.BLUE07F,
      height: 2,
      width: '100%'
    },
    media_image: {
      justifyContent: 'center',
      resizeMode: 'contain'
    },
    breadCrumbText: {
      color: colors.WHITE
    },
    contentBreadCrumb: {
      alignSelf: "flex-start",
      marginLeft: 20,
    }
  });

export default styles;