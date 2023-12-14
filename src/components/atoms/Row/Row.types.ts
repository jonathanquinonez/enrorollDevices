import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface RowProps
 * @since 1.0.0
 */
 export interface RowProps {

    border?: boolean;

    width?: number;

    children: JSX.Element|JSX.Element[];

    style?: StyleProp<ViewStyle>;
}   
