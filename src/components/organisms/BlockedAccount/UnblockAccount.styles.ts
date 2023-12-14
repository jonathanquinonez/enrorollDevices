import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    containerPagination: {
      backgroundColor: colors.BLUE8AF,
      alignItems: 'center',
      height: '100%'
    },
    
  });

export default styles;
