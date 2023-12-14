import { StyleSheet } from 'react-native';
import { KeraltyColors } from 'config/theme';

const baseStyleIndicator = {
    marginHorizontal: 3,
    borderRadius: 50,
    marginRight: 12,
    height: 8
}

const styles = (colors: KeraltyColors) =>
    StyleSheet.create({
        indicator_layout: {
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 12,
        },
        indicator: {
            ...baseStyleIndicator,
            width: 8,
            backgroundColor: '#B4B4B4',
        },
        indicator_blue: {
            width: 21,
            backgroundColor: '#002D57',
        },
        indicator_green: {
            width: 8,
            backgroundColor: '#4FAE8C',
        },
        indicator_active: {
            ...baseStyleIndicator,
        },
    });

export default styles;
