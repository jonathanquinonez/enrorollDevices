import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    contentRow: {
			flexDirection: 'row',
		},
    icon: { paddingHorizontal: 8, width: '15%' },
    contentText: { width: '15%', alignItems: 'center' },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#002E58',
      marginBottom: 8
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 14,
      color: '#212121'
    },
    time: {
      marginTop: 5,
      fontFamily: 'proxima-bold',
      fontSize: 12,
      color: '#002E58',
    }

  });

export default styles;
