import { KeraltyColors } from 'config/theme';
import { BackHandler, Dimensions, StyleSheet } from 'react-native';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flex: 1
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
      fontFamily: 'proxima-regular',
      color: colors.WHITE
    },
    contentBreadCrumb: {
      alignSelf: "flex-start",
      marginTop: 15, marginLeft: 30
    }
  });

export default styles;