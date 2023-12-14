import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    labelSelected: {
      alignSelf: 'flex-start',
      color: '#022F58',
      fontFamily: 'proxima-bold',
      marginTop: 9,
      fontSize: 18,
      marginBottom: 5
    },
    labelSubtitle: {
      alignSelf: 'flex-start',
      color: '#767676',      
      marginTop: 3,
      fontSize: 16,
      marginBottom: 8
    },
    labelContainer: { 
      paddingHorizontal: 2,
      width: windowDimentions.width * 0.85,     
      marginBottom: 9, 
    },
    label:{
      marginTop: 16, marginBottom: 10, color: '#022F58'
    },  
    btnLabel:{
      marginTop: 16, marginBottom: 170,
    },
});

export default styles;
