import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

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
        width: Dimensions.get('window').width * 0.85,

      },
      input: {
        fontFamily: 'proxima-bold',
      },
      textTitle: {
        color: colors.DARKBLUE,
        fontFamily: 'proxima-bold',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center'
      },
      textDescription: {
        color: "#5B5C5B",
        fontSize: 18,
        fontFamily: 'proxima-bold',
        marginTop: 10,
        textAlign: 'center'
      },
      justifyText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
       // width: windowDimentions.width,
       // paddingHorizontal: 30,
        marginBottom: 10
      },
      check: {
        position: 'absolute',
        left: 5,
        top: 4,
        opacity: 0.5,
      }
  });

export default styles;
