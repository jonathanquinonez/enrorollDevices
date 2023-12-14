import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import componentStyles from './ButtonMenu.styles';
import useStyles from 'src/hooks/useStyles';
import { FontAwesome5 } from '@expo/vector-icons';
import Image from 'react-native-scalable-image';
import { windowDimentions } from 'ui-core/utils/globalStyles';

const ButtonMenu = (props: any) => {
    const { styles } = useStyles(componentStyles);
    const { name, color = '#888A81', size = 20, style, source, title, onPress } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <Image width={windowDimentions.width * .1} style={[styles.imageMenu]} source={source} />
            <Text style={styles.textText} maxFontSizeMultiplier={1.3}>{title}</Text>
            <FontAwesome5 name={name} color={color} size={size} style={styles.icon} />
        </TouchableOpacity>
    )
}
export default ButtonMenu;