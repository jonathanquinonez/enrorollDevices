import { IResponseValue } from 'src/components/organisms/Smartwatch/LobbyOrganis.types';

export interface IGenericBarProps {
	labels: string[];
	data: number[];
	width?: number;
	height?: number;
	yAxisLabel?: string;
	yAxisSuffix?: string;
}
