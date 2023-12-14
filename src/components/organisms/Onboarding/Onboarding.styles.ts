import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { container, screenDimentions } from 'ui-core/utils/globalStyles';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
        backgroundColor: colors.BLACK,
        flex: 1
    },
  });

export default styles;