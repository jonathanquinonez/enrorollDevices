
import { View, Text, Image } from 'react-native';
import React from 'react';

//Styles
import componentStyles from './Column.styles';
import useStyles from "hooks/useStyles";
import { ColumnProps } from './Column.types';

/**
 * Render a Column.
 * @since 2.0.0
 */
const Column: React.FC<ColumnProps> = (props) => {
    const { styles, colors } = useStyles(componentStyles);
    const { width, children, border, style } = props;
    const widthtyle: string = width ? `col_${width}` : 'col_1';
    const borderStyle = border && styles.border;

    return (
        <View style={[styles[widthtyle as keyof typeof styles], borderStyle, style]}>
            {children}
        </View>
    )
}

export default Column;
