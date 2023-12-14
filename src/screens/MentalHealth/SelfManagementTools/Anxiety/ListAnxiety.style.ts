import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    contentTitleGeneral: {
      flexDirection: 'row',
      marginTop: 33, 
    },
    title: {
      color: '#022F58',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      marginTop: 7
    },
    subTitle: {
      marginLeft: 35,
      width: Dimensions.get('window').width * 0.7,
      marginBottom: 18,
      marginTop: -12
    },
    styleTextSub: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
    },
    rectangleContent: {
      borderColor: '#065394',
      backgroundColor: '#0069A7',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: 8,
      paddingHorizontal: 32,
      marginBottom: '10%',
      marginTop: '3%',
      borderRadius: 60,
      shadowColor: '#000',
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    textRectangle: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#F1F1F1', 
    },
    textCenter:{
      textAlign:'center', color:'#212121', marginBottom:'3%'
    },
    viewBodyText:{
      alignItems:'center',      
    },
    textBody:{
      backgroundColor: '#e6eaf1', borderRadius: 18, padding:'6%', textAlign: 'left',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.27,
      shadowRadius: 4.65,
      elevation: 4,
    },
    viewIcon:{
      justifyContent:'center', marginTop:'3%'
    },
    justyCenter:{
      justifyContent:'center'
    },
    viewFellings:{
      alignItems:'flex-start', width:'80%', marginLeft:'14%', marginBottom:'1%'
    },
    BtnFellings: {
      borderColor: '#065394',
      backgroundColor: '#0069A7',
      borderWidth: 1,
      paddingVertical: 8,
      paddingHorizontal: 32,
      marginTop:'6%',      
      borderRadius: 60,
      shadowColor: '#000',
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    textFellings: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      padding:'2%',
      color: '#F1F1F1', 
    },
    contentTitleActions: {
      flexDirection: 'row',
      marginTop: '5%', 
      marginBottom:'3%'
    },
    viewIconPsycal:{
      justifyContent:'center', marginTop:'5%'
    },
    viewContentFellings:{
      alignItems:'flex-start', width:'80%', marginLeft:'14%'
    },
    viewEnd:{
      marginBottom: '20%'
    }
});

export default styles;