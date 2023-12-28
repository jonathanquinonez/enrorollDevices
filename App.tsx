import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from 'src/adapter/store';
import Navigation from 'src/navigation/Navigation';
import useColorScheme from 'hooks/useColorScheme';
import useCachedResources from 'hooks/useCachedResources';
import { ASYNC_STORAGE, ONBOARDING_VALUES } from 'config/constants/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 'react-native-gesture-handler';
import 'i18n/i18n';
import { useState } from 'react';
import Splash from 'src/components/atoms/Splash/Splash';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const [timer, setTimer] = useState(true);
	const colorScheme = useColorScheme();
	const [showOnboardingScreen, setShowOnboardingScreen] = useState(false);

	if (!isLoadingComplete) {
		return null;
	}

	setTimeout(() => {
		setTimer(false);
	}, 2000);

	const getOnboardingStatus = async (): Promise<string | null> => {
		try {
			return AsyncStorage.getItem(ASYNC_STORAGE.ONBOARDING);
		} catch (err) {
			return null;
		}
	};

	getOnboardingStatus().then((onboardingStatus) => {
		if (onboardingStatus !== ONBOARDING_VALUES.SHOWN) {
			setShowOnboardingScreen(true);
			return;
		}
		setShowOnboardingScreen(false);
	});

	return (
		<SafeAreaProvider style={{ backgroundColor: '#0a3f6c' }}>
			<Provider store={store}>
				{timer ? (
					<Splash startTime={0} />
				) : (
					<Navigation
						colorScheme={colorScheme}
						showOnboarding={showOnboardingScreen}
						setShowOnboardingScreen={setShowOnboardingScreen}
					/>
				)}
			</Provider>
		</SafeAreaProvider>
	);
}
