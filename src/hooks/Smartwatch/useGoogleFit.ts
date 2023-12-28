/* eslint-disable no-console */
import { useState } from 'react';
import GoogleFit, { BucketUnit } from 'react-native-google-fit';
import {
	IHealthValues,
	IResponseValue,
} from 'src/components/organisms/Smartwatch/LobbyOrganis.types';
import moment from 'moment';

interface IConfig {
	startDate: string;
	endDate: string;
}

const useHealthValues = () => {
	const [healthValues, setHealthValues] = useState<IHealthValues>({
		dailySteps: [],
		walkingDistance: [],
		caloriesBurned: [],
		hearthRate: [],
		weight: [],
		height: [],
		sleepTime: [],
	});

	const getDailySteps = (options: IConfig) => {
		GoogleFit.getDailyStepCountSamples(options)
			.then((res) => {
				const mergedData = res.find(
					(source) => source.source === 'com.google.android.gms:merge_step_deltas',
				);
				if (mergedData && mergedData.steps.length > 0) {
					const values = consolidateWeek(mergedData.steps);
					setHealthValues((prevValues) => ({ ...prevValues, dailySteps: values }));
				} else {
					setHealthValues((prevValues) => ({ ...prevValues, dailySteps: [] }));
				}
			})
			.catch((err) => {
				console.error('Error al obtener los pasos diar:', err);
				setHealthValues((prevValues) => ({ ...prevValues, dailySteps: [] }));
			});
	};

	const getWalkingDistance = (options: IConfig) => {
		GoogleFit.getDailyDistanceSamples(options)
			.then((res) => {
				if (res) {
					const distances = res.map((distance) => ({
						date: distance.startDate,
						value: distance.distance || 0,
					}));
					const values = consolidateWeek(distances);
					setHealthValues((prevValues) => ({
						...prevValues,
						walkingDistance: values,
					}));
				} else {
					setHealthValues((prevValues) => ({
						...prevValues,
						walkingDistance: [],
					}));
				}
			})
			.catch((err) => {
				console.log('Error al obtener la distancia caminada:', err);
				setHealthValues((prevValues) => ({ ...prevValues, walkingDistance: [] }));
			});
	};

	const getCaloriesBurned = (options: IConfig) => {
		GoogleFit.getDailyCalorieSamples({ ...options, basalCalculation: true })
			.then((res) => {
				if (res) {
					const calories = res.map((calorie) => ({
						value: calorie.calorie > 0 ? parseFloat(calorie.calorie.toFixed(2)) : 0,
						date: calorie.startDate,
					}));
					const values = consolidateWeek(calories);
					setHealthValues((prevValues) => ({
						...prevValues,
						caloriesBurned: values,
					}));
				} else {
					setHealthValues((prevValues) => ({ ...prevValues, caloriesBurned: [] }));
				}
			})
			.catch((err) => {
				console.error('Error al obtener las calorías quemadas:', err);
				setHealthValues((prevValues) => ({ ...prevValues, caloriesBurned: [] }));
			});
	};

	const getHearthRate = (options: IConfig) => {
		GoogleFit.getHeartRateSamples(options)
			.then((res) => {
				if (res) {
					const hearthRates = res.map((rate) => ({
						value: rate.value,
						date: rate.startDate,
					}));
					const values = consolidateWeek(hearthRates);
					setHealthValues((prevValues) => ({ ...prevValues, hearthRate: values }));
				} else {
					setHealthValues((prevValues) => ({ ...prevValues, hearthRate: [] }));
				}
			})
			.catch((err) => {
				console.error('Error al obtener el ritmo cardíaco:', err);
				setHealthValues((prevValues) => ({ ...prevValues, hearthRate: [] }));
			});
	};

	const getWeight = (options: IConfig) => {
		GoogleFit.getWeightSamples({ ...options, unit: 'pound' })
			.then((res) => {
				if (res) {
					const weights = res.map((weight) => ({
						value: parseFloat(weight.value.toFixed(2)),
						date: weight.startDate,
					}));
					const values = consolidateWeek(
						weights,
						weights.length > 0 ? weights[0].value : undefined,
					);
					setHealthValues((prevValues) => ({ ...prevValues, weight: values }));
				} else {
					setHealthValues((prevValues) => ({ ...prevValues, weight: [] }));
				}
			})
			.catch((err) => {
				console.error('Error al obtener el peso:', err);
				setHealthValues((prevValues) => ({ ...prevValues, weight: [] }));
			});
	};

	const getHeight = (options: IConfig) => {
		GoogleFit.getHeightSamples(options)
			.then((res) => {
				if (res) {
					const heights = res.map((height) => ({
						value: parseFloat(height.value.toFixed(2)),
						date: height.startDate,
					}));
					const values = consolidateWeek(
						heights,
						heights.length > 0 ? heights[0].value : undefined,
					);
					setHealthValues((prevValues) => ({ ...prevValues, height: values }));
				} else {
					setHealthValues((prevValues) => ({ ...prevValues, height: [] }));
				}
			})
			.catch((err) => {
				console.error('Error al obtener la altura:', err);
				setHealthValues((prevValues) => ({ ...prevValues, height: [] }));
			});
	};

	const getSleepTime = (options: IConfig) => {
		GoogleFit.getSleepSamples(options)
			.then((res) => {
				if (res) {
					const sleepHoursByDay: { [date: string]: number } = {};

					res.forEach((record) => {
						const day = moment(record.startDate).format('YYYY-MM-DD');
						const duration = moment(record.endDate).diff(
							moment(record.startDate),
							'hours',
							true,
						);

						if (sleepHoursByDay[day]) {
							sleepHoursByDay[day] += duration;
						} else {
							sleepHoursByDay[day] = duration;
						}
					});

					const weeklySleep = Object.keys(sleepHoursByDay).map((day) => ({
						date: day,
						value: parseFloat(sleepHoursByDay[day].toFixed(2)),
					}));

					setHealthValues((prevValues) => ({ ...prevValues, sleepTime: weeklySleep }));
				} else {
					setHealthValues((prevValues) => ({
						...prevValues,
						sleepTime: Array(7).fill(0),
					}));
				}
			})
			.catch((err) => {
				console.error('Error al obtener las horas de sueño:', err);
				setHealthValues((prevValues) => ({ ...prevValues, sleepTime: Array(7).fill(0) }));
			});
	};

	const consolidateWeek = (data: IResponseValue[], uniqueValue?: number) => {
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

	const GoogleFitValues = () => {
		const genericalOptions = {
			startDate: moment().day(0).toISOString(),
			endDate: new Date().toISOString(),
			bucketUnit: BucketUnit.DAY,
			bucketInterval: 1,
		};
		const lastYear = moment().subtract(1, 'years').day(0).toISOString();

		getDailySteps(genericalOptions);
		getWalkingDistance(genericalOptions);
		getCaloriesBurned(genericalOptions);
		getHearthRate(genericalOptions);
		getWeight({ ...genericalOptions, startDate: lastYear });
		getHeight({ ...genericalOptions, startDate: lastYear });
		getSleepTime(genericalOptions);
	};

	return { healthValues, GoogleFitValues };
};

export default useHealthValues;
