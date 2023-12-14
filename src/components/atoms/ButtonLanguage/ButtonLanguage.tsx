import { Text, TouchableOpacity } from 'react-native';
import React from 'react'
import componentStyles from './ButtonLanguage.styles';
import useStyles from 'src/hooks/useStyles';
import { ButtonLanguageProps as Props } from './ButtonLanguage.types';
import Check from 'icons/check-circle.svg'
const ButtonLanguage = (props: Props) => {
    const {
        isChecked,
        name,
        color = '#888A81',
        size = 20,
        title,
        onPress,
    } = props;
    const { styles } = useStyles(componentStyles);
    const handleOnPress = () => {
        onPress()
    };
    return (
        <TouchableOpacity onPress={() => handleOnPress()} style={isChecked ? styles.buttonPress : styles.button}>
            {isChecked ? <Check style={styles.icon} /> : <></>}
            <Text style={isChecked ? styles.textPress : styles.textText} maxFontSizeMultiplier={1.3}>{title}</Text>
        </TouchableOpacity>
    )
}
export default ButtonLanguage