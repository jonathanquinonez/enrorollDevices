import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import { HorizontalGradientProps } from './HorizontalGradient.types';

const HorizontalGradient: React.FC<HorizontalGradientProps> = (props) => {

    const { heigth, colors } = props;

    return (
        <LinearGradient style={{height: heigth}} colors={colors} start={[0, 1]} end={[1, 0]}/>
    );
}

export default HorizontalGradient;