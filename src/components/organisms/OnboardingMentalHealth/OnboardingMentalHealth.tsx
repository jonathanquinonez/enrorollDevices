import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import useStyles from 'hooks/useStyles';
import { Text } from 'react-native'
//Components
import OnboardingPagination from 'src/components/molecules/OnboardingPagination/OnboardingPagination';
//Types
import { OnboardingMentalHealthProps } from './OnboardingMentalHealth.types';
//Styles
import componentStyles from './OnboardingMentalHealth.styles';
import { BottomDataType } from 'src/components/molecules/OnboardingPagination/OnboardingPagination.types';

import Icon1 from 'icons/MentalHealthIcons/Onboarding/1.svg';
import Icon2 from 'icons/MentalHealthIcons/Onboarding/2.svg';
import Icon3 from 'icons/MentalHealthIcons/Onboarding/3.svg';
import Icon4 from 'icons/MentalHealthIcons/Onboarding/4.svg';
import Icon5 from 'icons/MentalHealthIcons/Onboarding/5.svg';
import { useTranslation } from 'react-i18next';

const OnboardingMentalHealth: React.FC<OnboardingMentalHealthProps> = (props: OnboardingMentalHealthProps) => {
	const { onFinish } = props;
	const { styles, colors } = useStyles(componentStyles);
	const [position, setPosition] = useState(0);
	const { t } = useTranslation();

	const mediaRef = React.createRef<FlatList>();
	const bottomRef = React.createRef<FlatList>();

	const bottomData: BottomDataType[] = [
		{
			id: 0,
			title: '',
			body: t('onboardingMH.sub0'),
			icon: <Icon1 />
		},
		{
			id: 1,
			title: t('onboardingMH.title1'),
			body: t('onboardingMH.sub1'),
			icon: <Icon2 />
		},
		{
			id: 2,
			title: t('onboardingMH.title2'),
			body: t('onboardingMH.sub2'),
			icon: <Icon3 />
		},
		{
			id: 3,
			title: t('onboardingMH.title3'),
			body: t('onboardingMH.sub3'),
			icon: <Icon4 />
		},
		{
			id: 4,
			title: '',
			body: <Text>{t('onboardingMH.sub4.1')} <Text style={{ fontWeight: 'bold' }}>{t('onboardingMH.sub4.2')}</Text> {t('onboardingMH.sub4.3')}</Text>,
			icon: <Icon5 />
		}
	];

	const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
		ref.current?.scrollToIndex({
			animated: true,
			index: position,
		});
	};
	const handlerNext = () => {
		const newPosition = position + 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};
	const handlerBack = () => {
		const newPosition = position - 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};
	const handlerSkip = () => {
		const newPosition = 2 - 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};

	return (
		<OnboardingPagination
			ref={bottomRef}
			isMentalHealth={true}
			bottomData={bottomData}
			currentPosition={position}
			handlerBack={handlerBack}
			handlerNext={handlerNext}
			handlerSkip={handlerSkip}
			onFinish={onFinish}
			backButtonText={t("common.back")}
		/>
	);
};

export default OnboardingMentalHealth;
