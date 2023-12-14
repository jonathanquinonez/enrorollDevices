import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface ColumnProps
 * @since 1.0.0
 */
 export interface ColumnProps {

    border?: boolean;

    width?: number;

    children: JSX.Element|JSX.Element[];

    style?: StyleProp<ViewStyle>;
}   
