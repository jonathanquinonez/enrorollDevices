import React from 'react';
import { SafeAreaView } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import OnboardingIntro from 'src/components/organisms/Onboarding/Onboarding';

//Types
import { MediaDataType } from 'src/components/molecules/OnboardingMedia/OnboardingMedia.types';
import { BottomDataType } from 'src/components/molecules/OnboardingPagination/OnboardingPagination.types';

//Styles
import componentStyles from './Onboarding.styles';
import { useNavigation } from '@react-navigation/native';
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';
import { safeScreen, screenDimentions } from 'ui-core/utils/globalStyles';
import { ASYNC_STORAGE, ONBOARDING_VALUES } from 'config/constants/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeScreen from 'src/components/organisms/SafeScreen/SafeScreen';

const Onboarding = () => {
	const { styles, colors } = useStyles(componentStyles);
	const { reset } = useNavigation();
	const { t, i18n } = useTranslation();
	const lng: string = i18n.language.slice(0, 2);

	const bottomData: BottomDataType[] = [
		{
			id: 0,
			title: t('onboarding.slide1.title'),
			body: t('onboarding.slide1.text'),
			fontSize: 16,
		},
		{
			id: 1,
			title: t('onboarding.slide2.title'),
			body: t('onboarding.slide2.text'),
			fontSize: 24,
		},
		{
			id: 2,
			title: t('onboarding.slide3.title'),
			body: t('onboarding.slide3.text'),
			fontSize: 24,
		},
		{
			id: 3,
			title: t('onboarding.slide4.title'),
			body: t('onboarding.slide4.text'),
			fontSize: 24,
		},
		// {
		// 	id: 4,
		// 	title: t('onboarding.slide5.title'),
		// 	body: t('onboarding.slide5.text'),
		// 	fontSize: 24,
		// },
		{
			id: 5,
			title: t('onboarding.slide6.title'),
			body: t('onboarding.slide6.text'),
			fontSize: 24,
		},
		/* {
            id: 6,
            title: t('wellness.onbTitle'),
            body: t('wellness.onbSubTitle'),
            fontSize: 24
        } */
	];

	const mediaData: MediaDataType[] = [
		{
			id: 0,
			imageSource:
				lng == 'es'
					? require('assets/images/onboarding/onb1Es.png')
					: require('assets/images/onboarding/onb1.png'),
			width: screenDimentions.width * 0.7,
		},
		{
			id: 1,
			imageSource:
				lng == 'es'
					? require('assets/images/onboarding/onb2Es.png')
					: require('assets/images/onboarding/onb2.png'),
			width: screenDimentions.width * 0.75,
		},
		{
			id: 2,
			imageSource:
				lng == 'es'
					? require('assets/images/onboarding/onb3Es.png')
					: require('assets/images/onboarding/onb3.png'),
			width: screenDimentions.width * 0.8,
		},
		{
			id: 3,
			imageSource: require('assets/images/onboarding/onb4.png'),
			width: screenDimentions.width * 0.55,
		},
		// {
		// 	id: 4,
		// 	imageSource:
		// 		lng == 'es'
		// 			? require('assets/images/onboarding/onb5Es.png')
		// 			: require('assets/images/onboarding/onb5.png'),
		// 	width: screenDimentions.width * 0.5,
		// },
		{
			id: 5,
			imageSource:
				lng == 'es'
					? require('assets/images/onboarding/onb6Es.png')
					: require('assets/images/onboarding/onb6.png'),
			width: screenDimentions.width * 0.68,
		},
		/* {
            id: 6,
            imageSource: require('assets/images/onboarding/onb7En.png'),
            width: screenDimentions.width * .83
        } */
	];

	const onFinish = async () => {
		await AsyncStorage.setItem(ASYNC_STORAGE.ONBOARDING, ONBOARDING_VALUES.SHOWN);
		reset({ index: 0, routes: [{ name: 'Login' }] });
	};

	return (
		<SafeScreen>
			<OnboardingIntro media={mediaData} bottom={bottomData} onFinish={onFinish} />
		</SafeScreen>
	);
};

export default Onboarding;
