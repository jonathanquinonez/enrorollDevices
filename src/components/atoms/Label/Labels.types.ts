import { ReactElement } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

/**
 * @interface LabelIconProps
 * @since 1.0.0
 */

export interface LabelIconProps {
	/**
	 * Icon label
	 *@since 1.0.0
	 *@example icon={ <Email /> }
	 */
	icon: ReactElement;

	/**
	 * Title label
	 *@since 1.0.0
	 *@example title={ 'Titulo Label' }
	 */
	title: string;

	/**
	 *Subtitle label is optional
	 *@since 1.0.0
	 *@example subTitle={ true }
	 */
	subTitle?: string;

	/**
	 *Subtitle label is optional
	 *@since 1.0.0
	 *@example isTitle2={ 'Text' }
	 */
	isTitle2?: string;

	/**
	 * Option for double line (title and subtitle)
	 *@since 1.0.0
	 *@example isDoubleLine={ true }
	 *@default false
	 */
	isDoubleLine?: boolean;
	position?: number;
	typeBody?: string;
	maxPosition?: number;

	/**
	 * Option for double line (title and subtitle)
	 *@since 1.0.0
	 *@example isDoubleLine={ true }
	 */
	url?: any;

	/**
	 * Style view label general
	 * @since  1.0.0
	 * @example styleView={{borderColor:"#ddee44"}}
	 */
	styleView?: StyleProp<ViewStyle>;
	/**
	 *Style specific de title
	 * @since  1.0.0
	 * @example styleTitle={{borderColor:"#ddee44"}}
	 */
	styleTitle?: StyleProp<ViewStyle>;
	/**
	 * Style specific de title
	 * @since  1.0.0
	 * @example styleSubTitle={{borderColor:"#ddee44"}}
	 */
	styleSubTitle?: StyleProp<ViewStyle>;


}
