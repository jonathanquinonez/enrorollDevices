import { KeraltyColors } from 'config/theme';
import { Dimensions, StyleSheet } from 'react-native';
import { screenDimentions, windowDimentions } from 'ui-core/utils/globalStyles';


const styles = (colors: KeraltyColors) =>
    StyleSheet.create({
        row_1: {
            flexShrink: 1,
            flexGrow: 1
        },
        row_2: {
            flexShrink: 1,
            flexGrow: 2
        },
        row_3: {
            flexShrink: 1,
            flexGrow: 3
        },
        row_4: {
            flexShrink: 1,
            flexGrow: 4
        },
        row_5: {
            flexShrink: 1,
            flexGrow: 5
        },
        row_6: {
            flexShrink: 1,
            flexGrow: 6
        },
        border: {
            borderColor: "gray",
            borderWidth: 1,
        },
        base: {
            flex: 1
        }
    });

export default styles;