import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { container, marginStatusBar, screenDimentions } from 'ui-core/utils/globalStyles';
const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        ...container,
        ...marginStatusBar
    },
  });
export default styles;