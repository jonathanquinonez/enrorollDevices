import {
	StepsIcon,
	DistanceIcon,
	CaloriesIcon,
	SleepIcon,
	PersonIcon,
	HearthIcon,
} from 'assets/icons/Smartwatch/index';
import { IHealthItemType } from './LobbyOrganis.types';

import {
	GraphicCategory,
	GraphicTypes,
} from 'src/components/organisms/Smartwatch/Detail/DetailOrganism.types';

const initialStateData: IHealthItemType[] = [
	{
		id: 'dailySteps',
		icon: StepsIcon,
		counter: '0',
		unit: 'smartwatch.units.steps',
		label: 'smartwatch.options.steps',
		date: 'currentDate',
		graphicCategory: GraphicCategory.STEPS,
		graphicType: GraphicTypes.BARS,
	},
	{
		id: 'walkingDistance',
		icon: DistanceIcon,
		counter: '0',
		unit: 'smartwatch.units.distance',
		label: 'smartwatch.options.distance',
		date: 'currentDate',
		graphicCategory: GraphicCategory.DISTANCE,
		graphicType: GraphicTypes.LINES,
	},
	{
		id: 'caloriesBurned',
		icon: CaloriesIcon,
		counter: '0',
		unit: 'smartwatch.units.calories',
		label: 'smartwatch.options.calories',
		date: 'currentDate',
		graphicCategory: GraphicCategory.CALORIES,
		graphicType: GraphicTypes.BARS,
	},
	{
		id: 'hearthRate',
		icon: HearthIcon,
		counter: '0',
		unit: 'smartwatch.units.heartrate',
		label: 'smartwatch.options.heartrate',
		date: 'currentDate',
		graphicCategory: GraphicCategory.HEARTRATE,
		graphicType: GraphicTypes.BARS,
	},
	{
		id: 'weight',
		icon: PersonIcon,
		counter: '0',
		unit: 'smartwatch.units.weight',
		label: 'smartwatch.options.weight',
		date: 'currentDate',
		graphicCategory: GraphicCategory.WEIGHT,
		graphicType: GraphicTypes.LINES,
	},
	{
		id: 'height',
		icon: PersonIcon,
		counter: '0',
		unit: 'smartwatch.units.height',
		label: 'smartwatch.options.height',
		date: 'currentDate',
		graphicCategory: GraphicCategory.HEIGHT,
		graphicType: GraphicTypes.LINES,
	},
	{
		id: 'sleepTime',
		icon: SleepIcon,
		counter: '0',
		unit: 'smartwatch.units.sleep',
		label: 'smartwatch.options.sleep',
		date: 'currentDate',
		graphicCategory: GraphicCategory.SLEEP,
		graphicType: GraphicTypes.BEZIER,
	},
];

enum SleepStages {
	Awake = 1,
	Sleep,
	OutOfBed,
	LightSleep,
	DeepSleep,
	REM,
}

const sleepStagesByGoogle: Record<SleepStages, string> = {
	[SleepStages.Awake]: 'Awake',
	[SleepStages.Sleep]: 'Sleep',
	[SleepStages.OutOfBed]: 'OutOfBed',
	[SleepStages.LightSleep]: 'LightSleep',
	[SleepStages.DeepSleep]: 'DeepSleep',
	[SleepStages.REM]: 'REM',
};

export const convertMetersToInches = (meters: number) => {
	const pulgadasTotales = meters * 39.3701;
	const pies = Math.floor(pulgadasTotales / 12);
	const pulgadas = pulgadasTotales % 12;
	return `${pies}' ${pulgadas.toFixed(0)}''`;
};

export { initialStateData, sleepStagesByGoogle, SleepStages };
