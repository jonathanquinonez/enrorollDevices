import React, { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Text, Dimensions, Image } from 'react-native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import componentStyles from './WellnessRecords.styles';
import CardResults from 'src/components/molecules/CardResults/CardResults';

import IconFindError from 'assets/icons/iconFindError.svg';
import useStyles from 'hooks/useStyles';
import CircleQuestion from 'assets/icons/circle-question.svg';
import Row from 'src/components/atoms/Row/Row';
import { userActions } from 'adapter/user/userSlice';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import { filterByDate } from '../Symtoms/utils';

export const WellnessRecordsOptions = () => {
	const { t } = useTranslation();
	const navigation: any = useNavigation();
	const { closeModal, setModal } = useBottomSheet();
	const dispatch = useAppDispatch();
	const { email } = useAppSelector(userSelectors.selectUser);

	const { styles, colors } = useStyles(componentStyles);
	const [todayData, setTodayData] = useState<any[]>([])
	const [otherData, setOtherData] = useState<any[]>([])

	const getDataHistory = async () => {
		let getHistory: any = await AsyncStorage.getItem(`${email}mySanitas`);
		getHistory = JSON.parse(getHistory);
		const [todayD, otherD] = filterByDate(getHistory ?? [], new Date())
		setTodayData(todayD ?? [])
		setOtherData(otherD ?? [])
	}
	useEffect(() => {
		getDataHistory()
	}, [])

	const renderItem = ({ item, index }: { item: any; index: number }) => {
		return (
			<Row key={`ua-${index}`}>
				<CardResults date={item?.date} onPress={() => {
					dispatch(userActions.setVitalResult(item));
					navigation.navigate('WellnessRecordsResults');
				}} />
			</Row>
		);
	};

	return (
		<ScrollView>
			{todayData?.length ? <View style={{ marginVertical: 20 }}>
				<Text style={styles.textTitle}>{t('wellness.records.TodayReadings')}</Text>
				<FlashList data={todayData} renderItem={renderItem} estimatedItemSize={100} showsVerticalScrollIndicator={false} />
			</View> : <></>}
			{/* otherData */}
			{(otherData?.length && todayData?.length) ? <DividerLine style={{ width: '90%', alignSelf: 'center' }} /> : <></>}
			{otherData?.length ? <View style={{ marginTop: 20, marginBottom: 30 }}>
				<Text style={styles.textTitle}>{t('wellness.records.Previous')}</Text>
				<FlashList data={otherData} renderItem={renderItem} estimatedItemSize={100} showsVerticalScrollIndicator={false} />
			</View> : <></>}
			{(!otherData?.length && !todayData?.length) ? <View style={styles.voidGeneral}>
				<IconFindError />
				<Text style={{
					fontFamily: 'proxima-regular',
					fontSize: 18,
					color: '#5B5C5B'
				}}>{t('wellness.records.void')}</Text>
			</View> : <></>}
			<View style={[styles.row_container, { marginBottom: 80 }]}>
				<Text style={styles.info2}>{t('wellness.vitalSign.info2')}</Text>
				<CircleQuestion />
			</View>
		</ScrollView>
	);
};
