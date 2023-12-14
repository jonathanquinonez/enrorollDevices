import { IHealthItemType } from '../LobbyOrganis.types';

export interface IDetailProps {
	categoy: string;
	graphicType?: GraphicTypes;
	data: number[];
	item: IHealthItemType;
	showProgressCharts?: boolean;
}

export enum GraphicTypes {
	'LINES' = 'LINES',
	'BARS' = 'BARS',
	'BEZIER' = 'BEZIER',
}

export enum GraphicCategory {
	'STEPS' = 'STEPS',
	'DISTANCE' = 'DISTANCE',
	'CALORIES' = 'CALORIES',
	'HEARTRATE' = 'HEARTRATE',
	'WEIGHT' = 'WEIGHT',
	'HEIGHT' = 'HEIGHT',
	'SLEEP' = 'SLEEP',
}
