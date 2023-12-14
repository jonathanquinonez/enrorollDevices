import { Dimensions, StyleSheet } from 'react-native';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const styles = () =>
   StyleSheet.create({
      container: {
         width: Dimensions.get('window').width * 0.8,
         flexDirection: 'row'
      },
      title: {
         fontFamily: 'proxima-semibold',
         fontSize: 15,
         color: '#5B5C5B',
         flex: 1, 
         flexWrap: 'wrap',
         width: Dimensions.get('window').width * 0.55,
      },
      title1: {
			fontFamily: 'proxima-semibold',
			fontSize: 15,
			color: '#5B5C5B',
			paddingRight: 5,

		},
      subTitle: {
         fontFamily: 'proxima-regular',
         fontSize: 15,
         color: '#5B5C5B',
         flex: 1,
      },
      subTitle1: {
			fontFamily: 'proxima-regular',
			fontSize: 15,
			color: '#5B5C5B',
			flex: 1,
		},
      text: {
         fontFamily: 'proxima-bold',
         fontsize: 15,
         paddingLeft: 7,
         paddingVertical: 10,
         color: '#055293'
      },
      textUrl:{
         color: '#055293', 
         textDecorationLine: 'underline',          
         fontFamily: 'proxima-bold',  
      },
      titleUrl:{
         fontFamily: 'proxima-semibold',
         fontSize: 15,
         color: '#5B5C5B',
         flexWrap: 'wrap'
      },
      viewElement:{
         alignItems: 'center', justifyContent: 'center', marginRight: 10, width: 18
      },
      flexRow:{
         flexDirection: 'row'
      }
   });

export default styles; 