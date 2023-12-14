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
      justifyContent: "space-around",
      borderBottomColor: '#004B7F',
      borderBottomWidth: 1,
    },
    line: {
      backgroundColor: colors.BLUE07F,
      height: 2,
      width: '100%'
    },
    breadCrumbText: {
      fontFamily: 'proxima-regular',
      color: colors.WHITE
    },
    contentBreadCrumb: {
      alignSelf: "flex-start",
      marginTop: 15, marginLeft: 30
    },
    contentColumn: {
      width: '100%',
      justifyContent: "space-evenly"
    }
  });

export default styles;