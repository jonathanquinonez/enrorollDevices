import { ReactElement } from "react";

export interface IRootContent {
	component: ReactElement;
	isButton?: boolean;
	filterComponent? : any;
	filterBySearch? : any;
	moreOptionComponent? : ReactElement ; 
	title?: string;
	data?: Array<any>, showData?: Array<any>
	isForm?: boolean;
	onPressGoBack?: any;
	hiddenBackButton?: boolean;
}  