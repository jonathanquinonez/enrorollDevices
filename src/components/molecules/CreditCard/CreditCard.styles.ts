import { KeraltyColors } from "config/theme";
import { Dimensions, StyleSheet } from "react-native";

const styles = (colors: KeraltyColors) =>
  StyleSheet.create({
    content: {
      alignSelf: "center",
      justifyContent: "center",
      alignContent: "center",
      marginBottom: 30
    },
    expire: {
      position: "absolute",
      bottom: 15,
      fontFamily: 'ocr-a',
      right: 25,
      fontSize: 15,
      color: '#FFF'
    },
    textCvv: {
      position: "absolute",
      left: 115,
      fontFamily: 'ocr-a',
      top: 70,
      fontSize: 15,
      color: '#FFF'
    },
    lineCvv: {
      top: 70,
      left: 105,
      width: 50,
      borderRadius: 20,
      height: 23,
      backgroundColor: '#ffb94e',
      opacity: 0.5,
      position: "absolute"
    },
    backgroundCvv: {
      position: "absolute",
      height: 23,
      top: 70,
      left: 0,
      backgroundColor: '#FFF',
      width: 155,
      opacity: 0.2
    },
    lineExpire: {
      bottom: 15,
      right: 20,
      borderRadius: 20,
      height: 20,
      backgroundColor: '#ffb94e',
      opacity: 0.5,
      position: "absolute"
    },
    lineCard: {
      top: 72,
      borderRadius: 20,
      height: 20,
      backgroundColor: '#ffb94e',
      opacity: 0.5,
      position: "absolute",
    },
    numberCard: {
      position: "absolute",
      top: 70,
      fontSize: 17,
      fontFamily: 'ocr-a',
      color: '#FFF'
    },
    imgContainer: {
      width: 250,
      height: 150,
      justifyContent: 'center',
    },
    front: {
      height: 150,
      width: 250,
      backgroundColor: '#1b1b1b',
      borderRadius: 16,
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backfaceVisibility: "hidden",
    },
    back: {
      height: 150,
      width: 250,
      backgroundColor: "#FF8787",
      borderRadius: 16,
      backfaceVisibility: "hidden",
      alignItems: "center",
      justifyContent: "center",
    }
  });

export default styles;
