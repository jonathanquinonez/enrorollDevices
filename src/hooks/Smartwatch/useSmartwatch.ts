/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { Platform } from 'react-native';
import AppleHealthKit, { HealthKitPermissions } from 'react-native-health';
import useGoogleFit from './useGoogleFit';
import useHealthKit from './useHealthKit';

const useSmartwatch = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { GoogleFitValues, healthValues } = useGoogleFit();
	const { healthValuesIOS, HealthKitValues } = useHealthKit();

	useEffect(() => {
		checkPermission();
	}, []);

	const checkPermission = () => {
		if (Platform.OS === 'android') {
			if (!GoogleFit.isAuthorized) {
				requestAndroidPermissions();
			} else {
				retrieveData();
			}
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-types
			AppleHealthKit.isAvailable((error: Object, result: boolean) => {
				if (error) {

				} else if (result) {
					requestIosPermissions();
				}
			});
		}
	};

	const requestIosPermissions = () => {
		/* Permission options */
		const permissions = {
			permissions: {
				read: [
					AppleHealthKit.Constants.Permissions.Steps,
					AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
					AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
					AppleHealthKit.Constants.Permissions.HeartRate,
					AppleHealthKit.Constants.Permissions.Weight,
					AppleHealthKit.Constants.Permissions.Height,
					AppleHealthKit.Constants.Permissions.SleepAnalysis,
				],
				write: [],
			},
		} as HealthKitPermissions;

		AppleHealthKit.initHealthKit(permissions, (error: string) => {
			if (error) {
				console.error('[ERROR] Cannot grant permissions!');
			} else {
				retrieveData();
			}
		});
	};

	const requestAndroidPermissions = () => {
		GoogleFit.authorize({
			scopes: [
				Scopes.FITNESS_ACTIVITY_READ,
				Scopes.FITNESS_HEART_RATE_READ,
				Scopes.FITNESS_BODY_READ,
				Scopes.FITNESS_SLEEP_READ,
			],
		})
			.then((res) => {
				retrieveData();
			})
			.catch((error) => {

			});
	};

	const retrieveData = async () => {
		try {
			setIsLoading(true);
			if (Platform.OS === 'android') {
				GoogleFitValues();
			} else {
				HealthKitValues();
			}
		} catch (error) {
			console.error('Error retrieving data', error);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		isLoading,
		healthValues,
		healthValuesIOS,
		requestIosPermissions,
		requestAndroidPermissions,
		retrieveData,
	};
};

export default useSmartwatch;
