import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    header: {
      alignItems: 'center',
      width: '100%',
      flexDirection: "row",
      justifyContent: "space-around",
    },  
    borderLine:{
      borderBottomColor: '#004B7F',
      borderBottomWidth: 1,
    },
    button: {		
			backgroundColor: '#004A7E',
			borderRadius: 50,
			width: 44,
			height: 44,
		},
    icon: {
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#004A7E',
			width: 44,
			height: 44,
			left: 30,
		},
  });

export default styles;
