export interface IChartLineProps {
	labels: string[];
	data: number[];
	width?: number;
	height?: number;
	yAxisLabel?: string;
	yAxisSuffix?: string;
	yAxisInterval?: number;
	decimalPlaces?: number;
	bezier?: boolean;
}
