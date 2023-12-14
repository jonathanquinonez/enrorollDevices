//Components
import { SafeAreaView, View } from 'react-native';
import { StatusBar } from 'react-native';
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';

//Types | Styles
import { SafeScreenProps as Props } from './SafeScreen.types';
import componentStyles from './SafeScreen.styles';
import { safeScreen, statusBarView } from 'ui-core/utils/globalStyles';

//Hooks
import useStyles from 'hooks/useStyles';


const SafeScreen: React.FC<Props> = (props) => {

    const { children, style, statuscolor } = props;
    const { styles, colors } = useStyles(componentStyles);
    const statusBarColor = statuscolor ? statuscolor : colors.primary;
    
    return(
        <SafeAreaView style={safeScreen}>
            <StatusBar barStyle="dark-content" animated />
            {children}
        </SafeAreaView>
    )

}

export default SafeScreen;