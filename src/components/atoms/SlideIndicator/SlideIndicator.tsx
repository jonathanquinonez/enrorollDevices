import { View, Text } from 'react-native';

//Hooks
import useStyles from 'hooks/useStyles';

// Types, Styles
import { SlideIndicatorInterface as IndicatorProps, DotInterface as DotProps, VariantsIndicator } from './SlideIndicator.types';
import componentStyles from './SlideIndicator.styles';

/**
 * Render a SlideIndicator.
 * @since 1.0.0
 */

const SlideIndicator: React.FC<IndicatorProps> = (props) => {

    const { currentPosition, length, variant = VariantsIndicator.Blue } = props;
    const { styles } = useStyles(componentStyles);

    return (
        <View
            style={styles.indicator_layout}>
            {[...Array(length)].map((_, index) => (
                <Dot key={index} variant={variant} isActive={index === currentPosition} />
            ))}
        </View>
    );
}


const Dot: React.FC<DotProps> = (props) => {

    const { isActive, variant } = props;
    const { styles } = useStyles(componentStyles);
    return (
        <View
            style={[isActive ? [styles.indicator_active, variant === VariantsIndicator.Blue ? styles.indicator_blue : styles.indicator_green] : styles.indicator]}
        />
    )
}

export default SlideIndicator

