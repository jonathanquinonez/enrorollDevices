import { ReactElement } from "react";
import { Moment } from 'moment';
import { StyleProp, TextStyle } from "react-native";

export interface IRootHeader {
	
	content: ReactElement;
	title: string;
	subtitle: string;
	isButton? : boolean; // Creo que ya no se necesita
	filterComponent?: any;
	filterBySearch?: any;
	moreOptionComponent? : ReactElement ; 
	data?: Array<any>, 
	showData?: Array<any>
	isForm?: boolean;
	btnBack?: boolean;
	onPressGoBack?: any;
	hiddenBackButton?: boolean;
	backgroundWhite?: boolean;
	stylesTitle?: StyleProp<TextStyle>
}