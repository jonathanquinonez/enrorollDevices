import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    viewModal: {
      width: 350, alignItems: 'center'
    },
    fontBold: {
      fontWeight: 'bold'
    },
    textCenter: {
      textAlign: 'center'
    },
    textBeWell: {
      fontWeight: 'bold', marginTop: '4%'
    },
    modalSubTitleIos: {
      color: "#212121", fontFamily: 'proxima-regular', fontWeight: '400', fontSize: 14, marginLeft: '-6%'
    },
    modalSubTitle: {
      color: "#212121", fontFamily: 'proxima-regular', fontWeight: '400', fontSize: 14,
    },
    modalBtn: {
      color: "#0071a3", fontWeight: 'bold', fontSize: 19, padding: '6%', width: '100%'
    },
    viewContent: {
      flex: 1, padding: 10,
      marginTop: 30
    },
    flexDirect: {
      flexDirection: 'column'
    },
    marginV: {
      marginVertical: 5
    },
    marginVFourteen: {
      marginVertical: 14
    },
    img: {
      width: 40.5, height: 44.45, marginBottom: 10
    },
    fontEighteen: {
      fontSize: 18
    },
    fontTwelve: {
      fontSize: 12
    },
    textBtn: {
      paddingVertical: 5,
      fontFamily: 'proxima-bold', paddingHorizontal: 3
    },
    viewEnd: {
      marginVertical: 5, marginBottom: 60
    }
  });

export default styles;
