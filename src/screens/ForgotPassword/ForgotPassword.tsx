import React from 'react';
import { SafeAreaView } from 'react-native';
import useStyles from 'hooks/useStyles';
//Component
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';
import ForgotPasswordIntro from 'src/components/organisms/ForgotPassword/ForgotPassword';
//Styles 
import componentStyles from './ForgotPassword.styles';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

/**
 * Render a ForgotPassword.
 * @since 1.0.0
 */
const ForgotPassword = () => {

    const { styles, colors } = useStyles(componentStyles);

    return (
        <SafeScreen>
            <ForgotPasswordIntro/>
        </SafeScreen>
    );
}

export default ForgotPassword;