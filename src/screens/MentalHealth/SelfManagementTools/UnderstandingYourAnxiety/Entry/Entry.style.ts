import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    contentTitleGeneral: {
      flexDirection: 'column',
      marginTop: 33, 
    },
    gradientTop: {
      width: '100%',
      height: 33,
      position: 'absolute',
      top: 27,
      zIndex: 1
    },
    title: {
      color: '#022F58',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      marginLeft: 5,  
      marginTop: 7, 
    },
    titleTwo: {
      color: '#022F58',
      fontFamily: 'proxima-bold',
      fontSize: 18,
      marginLeft: 3,
    },
    titleMadeIt: {
      color: '#022F58',
      fontFamily: 'proxima-bold',
      fontSize: 28,      
      marginBottom:'8%'
    },
    subTitle: {
      marginLeft: 35,
      width: Dimensions.get('window').width * 0.7,
      marginBottom: 18,
      marginTop: -12
    },
    styleTextSubThing: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14      
    },
    styleTextSub: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14, 
      marginLeft:'-20%', 
    },
    styleTextSubEn: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14, 
      marginLeft:'-14%', 
    },
    styleTextInput: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,    
    },
    styleTextSubFeeli: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-5%',
      marginBottom:'7%',
      marginLeft:'10%', 
    },
    styleTextSubFeeliEn: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-5%',
      marginBottom:'7%',  
      marginLeft:'-3%'
    },
    styleTextSubFe: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-5%',
      marginBottom:'7%',
      marginLeft:'6%', 
    },
    styleTextSubFeEn: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-7%',
      marginBottom:'7%',
      marginLeft:'-6%'
    },
    styleTextSubPhys: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-7%',
      marginBottom:'7%', 
      marginLeft:'-8%'
    },
    styleTextSubPhysEn: {
      color: '#212121',
      alignSelf: 'center',
      fontFamily: 'proxima-regular',
      fontSize: 14,
      marginTop: '-7%',
      marginBottom:'7%',
      marginLeft:'-6%',
    },
    linearGradient: {
      position: 'absolute',
      bottom: 60,
      height: 100,
      alignSelf: 'center',
      width: '100%'
    },
    linearGradientTwo: {
      position: 'absolute',
      bottom: 147,      
      alignSelf: 'center',
      width: '100%', 
    },
    rectangleContent: {
      borderColor: '#065394',
      backgroundColor: '#F1F1F1',
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      paddingVertical: 8,
      paddingHorizontal: 32,
      marginBottom: 28,
      borderRadius: 60,
      shadowColor: '#000', 
      shadowOffset: {
        width: 0,
        height: 2
      },
      elevation: 5, shadowOpacity: 0.25, shadowRadius: 3.84
    },
    inputContent: {
      paddingVertical: 20,
      paddingHorizontal: 20,
      height: 172,
      width: Dimensions.get('window').width * 0.8,
      color: '#212121',      
      fontFamily: 'proxima-regular',
      fontSize: 16,   
    },
    input: {
      marginTop: 14,
      width: Dimensions.get('window').width * 0.8,
      alignSelf: 'center',
      backgroundColor: '#FFF',
      //marginBottom: 5,
      borderRadius: 15,
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.21,
      shadowRadius: 7.68,
      elevation: 10
    },
    textRectangle: {
      fontFamily: 'proxima-bold',
      fontSize: 14,
      color: '#0069A7'
    },
    directionRowActions:{
      flexDirection:'row',  marginBottom:'-5%', marginTop:'2%', 
    },
    directionRow:{
      flexDirection:'row', 
    },
    directionRowMadeIt:{
      flexDirection:'row', justifyContent:'center', marginBottom:'7%'
    },
    viewContFellings:{
      flexDirection:'row', width:'100%', flexWrap: 'wrap', marginLeft:'3%', marginRight:'3%'
    },
    viewFellingsLeft:{
      alignItems: 'flex-end', width:'48%'
    },
    viewFellingsRight:{
      alignItems: 'flex-start',  width:'48%'
    },
    btnFellings : {
      borderColor: '#065394',
      backgroundColor: "#F1F1F1",
      borderWidth: 2,
      paddingTop:'7%',  
      paddingBottom:'7%',      
      paddingLeft:'12%',
      paddingRight: '12%',
      alignItems: 'center',
      marginBottom: '6%',
      borderRadius: 60,		  
    },
    btnFellingsActive : {
      borderColor: '#065394',
      backgroundColor: "#065394", 
      borderWidth: 2,
      paddingTop:'7%',  
      paddingBottom:'7%',      
      paddingLeft:'12%',
      paddingRight: '12%',
      alignItems: 'center',
      marginBottom: '6%',
      borderRadius: 60,		  
    },
    textFellings:{
      fontSize: 14, color: '#0069A7', fontWeight:'bold', textAlign: 'center'
    },
    textFellingsActive:{
      fontSize: 14, color: 'white', fontWeight:'bold', textAlign: 'center'
    },
    void: {
      alignItems: 'center',
      marginTop: Dimensions.get('window').height * 0.15
    },
    voidText: {
      marginTop: 40,
      fontFamily: 'proxima-regular',
      fontSize: 18,
      color: '#5B5C5B'
    },
    btnNext:{
      alignSelf: 'center', marginTop:'4%', marginBottom: 170
    },
    viewGrafic:{
      width:'80%'
    },
    textGrafic:{
      marginLeft: '20%', marginBottom:'10%', color: '#212121', textAlign: 'justify', lineHeight:17.05, fontFamily: 'proxima-regular', fontSize: 14, marginTop: '3%',
    },
    fontBold:{
      fontWeight:'bold'
    },
    viewStart:{
      width:'100%', alignItems:'center', justifyContent:'center'
    },
    textSubtitleStart:{
      color: '#212121',  fontFamily: 'proxima-regular', fontSize: 16, marginTop: '7%', marginBottom:'15%', alignSelf: 'center',
    },
    texBtnStart:{
      marginTop:'10%', marginBottom:'25%', color: "#022F58"
    },
    displayNone:{
      display: 'none'
    },
    viewIconGraficEn:{
      marginBottom: '8%',alignItems:'center', 
    },
    viewIconGrafic:{
      marginBottom: '8%', alignItems:'center', 
    },
  });

export default styles;