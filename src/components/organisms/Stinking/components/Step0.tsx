import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { Text } from 'react-native'
//Components
import OnboardingPagination from 'src/components/molecules/OnboardingPagination/OnboardingPagination';
//Types
import { BottomDataType } from 'src/components/molecules/OnboardingPagination/OnboardingPagination.types';

import Icon1 from 'icons/mh/step01.svg';
import Icon2 from 'icons/mh/step02.svg';
import Icon3 from 'icons/mh/step03.svg';
import Icon4 from 'icons/mh/step04.svg';
import Icon5 from 'icons/mh/step05.svg';
import { useTranslation } from 'react-i18next';
import StepperMedia from 'src/components/molecules/StepperMedia/StepperMedia';
import { Step0Props } from './Step.types';

const Step0: React.FC<Step0Props> = (props) => {
	const { onFinish } = props;
	const [position, setPosition] = useState(0);
	const { t } = useTranslation();

	const mediaRef = React.createRef<FlatList>();
	const bottomRef = React.createRef<FlatList>();

	const bottomData: BottomDataType[] = [
		{
			id: 0,
			title: '',
			body: t('stinkingMH.step01'),
			icon: <Icon1 />
		},
		{
			id: 1,
			title: '',
			body:  t('stinkingMH.step02'),
			icon: <Icon2 />
		},
		{
			id: 2,
			title: '',
			body:  t('stinkingMH.step03'),
			icon: <Icon3 />
		},
		{
			id: 3,
			title: '',
			body:  t('stinkingMH.step04'),
			icon: <Icon4 />
		},
		{
			id: 4,
			title: '',
			body: <Text style={{ fontWeight: 'bold', color: '#022F58' }}>{ t('stinkingMH.step05')}</Text>,
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
		const newPosition = bottomData.length - 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};

	return (
		<StepperMedia
            title={t('stinkingMH.steptitle')}
			ref={bottomRef}
			isMentalHealth={true}
			bottomData={bottomData}
			currentPosition={position}
			handlerBack={handlerBack}
			handlerNext={handlerNext}
			handlerSkip={handlerSkip}
			onFinish={onFinish}
            hiddenIndicator={true}
		/>
	);
};

export default Step0;
