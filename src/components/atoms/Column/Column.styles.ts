import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';


const styles = (colors: KeraltyColors) =>
    StyleSheet.create({
        col_1:  {
            flex: 1
        },
        col_2: {
            flex: 2
        },
        col_3: {
            flex: 3
        },
        col_4: {
            flex: 4
        },
        border: {
            borderColor: "gray",
            borderWidth: 1,
        },
    });

export default styles;