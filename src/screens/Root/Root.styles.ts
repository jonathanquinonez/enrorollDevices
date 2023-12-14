import { KeraltyColors } from 'config/theme';
import { StyleSheet } from 'react-native';
import { container, marginStatusBar, screenDimentions } from 'ui-core/utils/globalStyles';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    container: {
      flex: 1
    },
    header: {
      alignItems: 'center',
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-around",
      borderBottomColor: '#004B7F',
      borderBottomWidth: 1,
      flexGrow: 1
    },
  });

export default styles;