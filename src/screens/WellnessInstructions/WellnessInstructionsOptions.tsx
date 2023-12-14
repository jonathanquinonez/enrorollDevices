import React, { useRef, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Text, Dimensions, Image, FlatList } from 'react-native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import OnboardingPagination from 'src/components/molecules/OnboardingPagination/OnboardingPagination';
import Icon1 from 'icons/text1.svg';
import Icon2 from 'icons/text2.svg';
import Icon3 from 'icons/text3.svg';
import Icon4 from 'icons/text4.svg';
import Icon5 from 'icons/text5.svg';
import Icon6 from 'icons/text6.svg';

import Icon1En from 'icons/text1En.svg';
import Icon2En from 'icons/text2En.svg';
import Icon3En from 'icons/text3En.svg';
import Icon4En from 'icons/text4En.svg';
import Icon5En from 'icons/text5En.svg';
import Icon6En from 'icons/text6En.svg';
import Button from 'src/components/atoms/Button/Button';

export const WellnessInstructionsOptions = () => {
	const [position, setPosition] = useState(0);
	const { t } = useTranslation();
	const navigation = useNavigation();


	const mediaRef = React.createRef<FlatList>();
	const bottomRef = React.createRef<FlatList>();

	const bottomData: any[] = [
		{
			id: 0,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon1 /> : <Icon1En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/1.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
		{
			id: 1,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon2 /> : <Icon2En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/2.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
		{
			id: 2,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon3 /> : <Icon3En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/3.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
		{
			id: 3,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon4 /> : <Icon4En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/4.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
		{
			id: 4,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon5 /> : <Icon5En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/5.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
		{
			id: 5,
			title: '',
			body: <View style={{ marginTop: 15, alignSelf: 'center' }}>{t('general.locale') == 'es' ? <Icon6 /> : <Icon6En />}</View>,
			icon: <Image source={require(`assets/images/onboardingAnura/6.png`)} style={{ alignSelf: 'center', marginTop: 15 }} />
		},
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
		<ScrollView>
			<OnboardingPagination
				onbType2
				ref={bottomRef}
				isMentalHealth={true}
				bottomData={bottomData}
				currentPosition={position}
				handlerBack={handlerBack}
				handlerNext={handlerNext}
				handlerSkip={handlerSkip}
				onFinish={() => { }}
				backButtonText={t("common.back")}
			/>
			<Button
				style={{ marginBottom: 80, width: 150, alignSelf: 'center', marginTop: 10 }}
				title={position == 5 ? t('wellness.instructions.btn') : t('common.next')} onPress={position == 5 ? () => navigation.goBack() : handlerNext} />
		</ScrollView>
	);
};
