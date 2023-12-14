import { View, Text, Image } from 'react-native';
import React from 'react';

//Styles
import componentStyles from './Row.styles';
import useStyles from "hooks/useStyles";
import { RowProps } from './Row.types';

/**
 * Render a Row.
 * @since 2.0.0
 */
const Row: React.FC<RowProps> = (props) => {
    const { styles, colors } = useStyles(componentStyles);
    const { width, children, border, style } = props;
    const widthtyle: string = width ? `row_${width}` : 'row_1';
    const borderStyle = border && styles.border;

    return (
        <View style={[ styles.base, styles[widthtyle as keyof typeof styles], borderStyle, style ]}>
            {children}
        </View>
    )
}

export default Row;
