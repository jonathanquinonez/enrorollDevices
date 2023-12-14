import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    contentRow: {
			flexDirection: 'row',
		},
    icon: {  
      width: '15%',
      justifyContent: 'center', // Centra verticalmente
  alignItems: 'center',
    },
    contentText: { width: '15%', alignItems: 'center', marginTop: 8 },
    title: {
      fontFamily: 'proxima-bold',
      fontSize: 15,
      color: '#002E58',
    },
    text: {
      fontFamily: 'proxima-regular',
      fontSize: 12,
      color: '#212121'
    }

  });

export default styles;
