import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { screenDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    linearGradient: {
      alignItems: 'center',
      width: screenDimentions.width,
      flex: 1
    },
    textTitle: {
      color: colors.WHITE,
      fontFamily: 'proxima-bold',
      fontSize: 24,
      marginVertical: 5,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textSub: {
      color: '#DBDBDB',
      fontSize: 12,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'proxima-regular',
    },
  });

export default styles;
