import { ReactElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

/**
 * @interface CardProps
 * @since 1.0.0
 */
export interface CardProps {
    onPress?: () => void;
    data: Data;
}

interface Data {
	name: string;
	description: string;
	fileType: 'jpg' | 'png' | 'jpeg' | 'heic'
	| 'pdf'
	| 'mp4' | 'mpeg' | 'mpg' | 'heif'
	| 'mp3' | 'wmv' | 'wav' | 'aac'
}
