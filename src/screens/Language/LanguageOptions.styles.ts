import { KeraltyColors } from "config/theme";
import { StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
     
      container: {
        backgroundColor: colors.BACKGROUND_GRAY,
        width: '100%',
        borderTopLeftRadius: 40,
        paddingBottom: 5,
        paddingTop: 30,
        flex: 1,
      },
      contentContainer: {
        flexGrow: 1,
        justifyContent: 'center'
      },
      containerForm: {
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      input: {
        fontFamily: 'proxima-bold',
      },
      textTitle: {
        color: "#022F57",
        fontSize: 18,
        fontFamily: 'proxima-regular',
        marginTop: 10,
        textAlign: 'center'
      },
      textDescription: {
        color: "#5B5C5B",
        fontSize: 18,
        fontFamily: 'proxima-regular',
        marginTop: 30,
        textAlign: 'center'
      },
      justifyText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
      },
      check: {
        position: 'absolute',
        left: 5,
        top: 4,
        opacity: 0.5,
      },
      icon: {
        marginVertical:20,
        alignSelf:'center',
        height:20,
        width:20
      },
      buttonsModalCheck:{
        flexDirection: "row",
        alignSelf:'center',
        marginVertical:60,
      },
      textDescriptionConf: {
        color: "#055293",
        fontSize: 18,
        fontFamily: 'proxima-regular',
        marginTop: 30,
        textAlign: 'center'
      },
      buttonsModalCheck2:{
        flexDirection: "row",
        marginVertical:40,
        alignSelf:'center',
      }
  });

export default styles;
