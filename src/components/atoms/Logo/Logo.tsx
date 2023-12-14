import React from 'react'
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './Logo.styles';
import { LogoProps as Props } from './Logo.types';
import { windowDimentions } from 'ui-core/utils/globalStyles';

import Image from 'react-native-scalable-image';
import LogoSanitas from 'icons/LogoSanitas.svg';
import { isIphone } from 'src/utils/devices';

/**
 * Render a logo.
 * @since 1.0.0
 */
const Logo = (props: Props) => {
    const { width, withOutText } = props;
    const { styles } = useStyles(componentStyles);
    const validWidth = width ? width :  windowDimentions.width * .3;

    return (
        withOutText ? <LogoSanitas accessibilityRole='image' accessibilityLabel='Logo sanitas' width={validWidth} /> : <Image accessibilityRole='image' accessibilityLabel='Logo sanitas' width={validWidth} source={require('assets/images/logo/sanitas.png')} />
    )
}

export default Logo