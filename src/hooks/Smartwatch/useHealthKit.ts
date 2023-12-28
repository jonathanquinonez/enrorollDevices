/* eslint-disable no-console */
import { useState } from 'react';
import AppleHealthKit from 'react-native-health';
import { IHealthValues } from 'src/components/organisms/Smartwatch/LobbyOrganis.types';
import moment from 'moment';

interface IConfig {
	startDate: string;
	endDate: string;
}

const useHealthKit = () => {
	const [healthValuesIOS, setHealthValues] = useState<IHealthValues>({
		dailySteps: [],
		walkingDistance: [],
		caloriesBurned: [],
		hearthRate: [],
		weight: [],
		height: [],
		sleepTime: [],
	});

	const getDailyStepsIOS = (options: IConfig) => {
		AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
			if (err) {
				console.error('Error al obtener los pasos diarios:', err);
				setHealthValues((prevValues) => ({ ...prevValues, dailySteps: [] }));
				return;
			}
			const steps = results.map((step) => ({ value: step.value, date: step.startDate }));
			const values = consolidateWeek(steps);
			setHealthValues((prevValues) => ({ ...prevValues, dailySteps: values }));
		});
	};

	const getWalkingDistanceIOS = (options: IConfig) => {
		AppleHealthKit.getDailyDistanceWalkingRunningSamples(
			{ ...options, limit: 10 },
			(err, results) => {
				if (err) {
					setHealthValues((prevValues) => ({ ...prevValues, walkingDistance: [] }));
					return;
				}
				const distances = results.map((item) => ({
					value: item.value > 0 ? parseFloat(item.value.toFixed(2)) : 0,
					date: item.startDate,
				}));
				const values = consolidateWeek(distances);
				setHealthValues((prevValues) => ({
					...prevValues,
					walkingDistance: values,
				}));
			},
		);
	};

	const getCaloriesBurnedIOS = (options: IConfig) => {
		AppleHealthKit.getActiveEnergyBurned(options, (err, results) => {
			if (err) {
				console.error('Error al obtener las calorías quemadas:', err);
				setHealthValues((prevValues) => ({ ...prevValues, caloriesBurned: [] }));
				return;
			}

			const calories = results.map((calorie) => ({
				value: calorie.value > 0 ? parseFloat(calorie.value.toFixed(2)) : 0,
				date: calorie.startDate,
			}));
			const values = consolidateWeek(calories);
			setHealthValues((prevValues) => ({
				...prevValues,
				caloriesBurned: values,
			}));
		});
	};

	const getHearthRateIOS = (options: IConfig) => {
		AppleHealthKit.getHeartRateSamples(options, (err, results) => {
			if (err) {
				console.error('Error al obtener el ritmo cardíaco:', err);
				setHealthValues((prevValues) => ({ ...prevValues, hearthRate: [] }));
				return;
			}
			const heartrates = results.map((item) => ({ value: item.value, date: item.startDate }));
			const values = consolidateWeek(heartrates);
			setHealthValues((prevValues) => ({
				...prevValues,
				hearthRate: values,
			}));
		});
	};

	const getWeightIOS = (options: IConfig) => {
		AppleHealthKit.getWeightSamples({ ...options, unit: 'pound' }, (err, results) => {
			if (err) {
				console.error('Error al obtener el peso:', err);
				setHealthValues((prevValues) => ({ ...prevValues, weight: [] }));
				return;
			}
			const sortedResults = results.sort(
				(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
			);
			const weights = sortedResults.map((weight) => ({
				value: parseFloat(weight.value.toFixed(2)),
				date: weight.startDate,
			}));
			const values = consolidateWeek(
				weights,
				sortedResults.length > 0 ? sortedResults[0].value : undefined,
			);
			setHealthValues((prevValues) => ({ ...prevValues, weight: values }));
		});
	};

	const getHeightIOS = (options: IConfig) => {
		AppleHealthKit.getHeightSamples({ ...options, unit: 'meter' }, (err, results) => {
			if (err) {
				console.error('Error al obtener la altura:', err);
				setHealthValues((prevValues) => ({ ...prevValues, height: [] }));
				return;
			}
			const sortedResults = results.sort(
				(a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
			);
			const heights = sortedResults.map((height) => ({
				value: parseFloat(height.value.toFixed(2)),
				date: height.startDate,
			}));
			const values = consolidateWeek(
				heights,
				sortedResults.length > 0 ? sortedResults[0].value : undefined,
			);
			setHealthValues((prevValues) => ({ ...prevValues, height: values }));
		});
	};

	const getSleepTimeIOS = (options: IConfig): void => {
		AppleHealthKit.getSleepSamples({ ...options, limit: 10 }, (err, results) => {
			if (err) {
				console.error('Error al obtener las horas de sueño:', err);
				setHealthValues((prevValues: IHealthValues) => ({
					...prevValues,
					sleepTime: [],
				}));
				return;
			}
			const sleepHoursByDay: { [date: string]: number } = {};
			results.forEach((sample) => {
				const day = moment(sample.startDate).format('YYYY-MM-DD');
				const duration = moment(sample.endDate).diff(
					moment(sample.startDate),
					'hours',
					true,
				);
				sleepHoursByDay[day] = (sleepHoursByDay[day] || 0) + duration;
			});
			const weeklySleep = Object.keys(sleepHoursByDay).map((day) => ({
				date: day,
				value: parseFloat(sleepHoursByDay[day].toFixed(2)),
			}));
			setHealthValues((prevValues) => ({ ...prevValues, sleepTime: weeklySleep }));
		});
	};

	const consolidateWeek = (data: any[], uniqueValue?: number) => {
		const startOfWeek = moment().day(0);
		const today = moment();
		const daysToFill = today.diff(startOfWeek, 'days');

		const weekStructure = Array(daysToFill + 1).fill({ value: uniqueValue ?? 0 });
		data.forEach((item) => {
			const dayOfWeek = moment(item.date).day();
			weekStructure[dayOfWeek] = { value: item.value };
		});
		return weekStructure;
	};

	const HealthKitValues = () => {
		const genericalOptions = {
			startDate: moment().day(0).toISOString(),
			endDate: new Date().toISOString(),
		};
		const lastYear = moment().subtract(1, 'years').day(0).toISOString();

		getDailyStepsIOS(genericalOptions);
		getWalkingDistanceIOS(genericalOptions);
		getCaloriesBurnedIOS(genericalOptions);
		getHearthRateIOS(genericalOptions);
		getWeightIOS({ ...genericalOptions, startDate: lastYear });
		getHeightIOS({ ...genericalOptions, startDate: lastYear });
		getSleepTimeIOS(genericalOptions);
	};

	return { healthValuesIOS, HealthKitValues };
};

export default useHealthKit;
