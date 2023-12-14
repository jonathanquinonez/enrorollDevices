import { ReactNode } from 'react';
import {
	GraphicCategory,
	GraphicTypes,
} from 'src/components/organisms/Smartwatch/Detail/DetailOrganism.types';
export interface IHealthItemType {
	id: string;
	icon: ReactNode;
	counter: string;
	unit: string;
	date: string;
	label: string;
	graphicType: GraphicTypes;
	graphicCategory: GraphicCategory;
	fullWeek?: IResponseValue[];
}

export interface IHealthValues {
	dailySteps?: IResponseValue[];
	walkingDistance?: IResponseValue[];
	caloriesBurned?: IResponseValue[];
	hearthRate?: IResponseValue[];
	weight?: IResponseValue[];
	height?: IResponseValue[];
	sleepTime?: IResponseValue[];
}

export interface IResponseValue {
	value: string | number;
	date?: string;
}

export interface IProps {
	healthValues?: IHealthValues;
	onReload?: () => void;
	loading?: boolean;
}
