import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface CardProps
 * @since 1.0.0
 */
export interface CardProps {

    icon: ReactElement;

    title: string;

    subtitle?: string;

    style?: StyleProp<ViewStyle>;

    isHorizontal?: boolean;

    onPress? : () => void;

    isCarePrograms?: boolean;
    isAvailable?: boolean;
    textFloat?: string;
}
