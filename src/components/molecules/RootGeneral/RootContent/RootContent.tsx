import React, { useState, useEffect } from 'react';
import GoBackIcon from 'icons/goBackBtn.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { View, ScrollView, Text, Dimensions } from 'react-native';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Button from 'src/components/atoms/Button/Button';
import Column from 'src/components/atoms/Column/Column';
import { useNavigation } from '@react-navigation/native';
import componentStyle from './RootContent.style';
import useStyles from 'hooks/useStyles';
import { IRootContent } from './RootContent.type';
import FilterIcon from '../../../../../assets/icons/FilterIcon.svg';
import MoreOptionIcon from '../../../../../assets/icons/MoreOptionIcon.svg';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import DateRangeFilter from 'src/components/organisms/DateRangeFilter/DateRangeFilter';
import { Moment } from 'moment';
import Row from 'src/components/atoms/Row/Row';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FilterInfoBtn from 'src/components/atoms/FilterInfoBtn/FilterInfoBtn';
import Input from 'src/components/atoms/Input/Input';
import { extraScrollHeigth } from 'src/utils/devices';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userActions } from 'adapter/user/userSlice';
import { userSelectors } from 'adapter/user/userSelectors';

/**
 * View de List de Cards o View list information Root Body
 * @returns
 */

export const RootContent = (props: IRootContent) => {
	const keepDates = true;
	const { currentRoute, previousRoute } = useAppSelector(userSelectors.selectRoute);
	const [range, setRange] = useState<[Moment, Moment] | undefined>(undefined);
	const { t } = useTranslation();
	const navigation: any = useNavigation();
	const {
		component,
		isButton = false,
		filterComponent,
		filterBySearch,
		moreOptionComponent,
		title,
		data,
		showData,
		isForm,
		onPressGoBack,
		hiddenBackButton
	} = props;
	const { styles, colors } = useStyles(componentStyle);
	const { closeModal, setModal } = useBottomSheet();
	const [tempData, setTempData] = useState<any>()
	const [searchValue, setSearchValue] = useState<string>('')
	const dispatch = useAppDispatch();
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);


	useEffect(() => {
		if (filterBySearch) filterBySearch(searchValue)
		dispatch(userActions.setIsFilter(searchValue ? true : false))
	}, [searchValue])

	let fromDate = range && range[0];
	let toDate = range && range[1];
	if (!keepDates) {
		fromDate = undefined;
		toDate = undefined;
	}

	useEffect(() => {
		if (isButton) {
			openModal(true);
		}
	}, [isButton]);

	const openModal = (isFilter: boolean) => {
		setModal({
			render: () => (
				<>
					{!!filterComponent && isFilter && (
						<DateRangeFilter
							onSubmit={(from, to) => {
								filterComponent(from, to);
								setTempData({ from, to });
								dispatch(userActions.setIsFilter(from ? true : false));
								closeModal()
							}}
							onCancel={closeModal}
							title={title ?? t('option.filter')}
							from={fromDate}
							to={toDate}

						/>
					)}
					{!!moreOptionComponent && !isFilter && moreOptionComponent}
				</>
			),
			blockModal: !isFilter ? false : true
		});
	};

	const extraScrollHeight = extraScrollHeigth();

	const filterInfoBtnAction = () => { filterComponent(null, null), setTempData(undefined), dispatch(userActions.setIsFilter(false)) }
	const ShowTotalData = () => (<>{showData?.length ? <Text style={[styles.text, { marginTop: filterBySearch ? 0 : 2 }]}>{`${t('common.show')} ${showData?.length} ${t('common.results')}`}</Text> : <></>}</>);

	const handleNavegate = () => {
		if (previousRoute == "ChatSanitas" && currentRoute == "GetCareScreen" || currentRoute == "GeneralNotificationsScreen") {
			navigation.navigate('Home');
		} else if (currentRoute == "EntryScreen") {
			onPressGoBack()
		} else if (currentRoute == "NotificationSettingsScreen") {
			navigation.navigate('GeneralNotificationsScreen');
		} else {
			navigation.goBack()
		}
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				style={styles.lineGradient}
				colors={['#00B4E3', '#61B73A']}
				start={[0, 1]}
				end={[1, 0]}
			/>
			<View style={{
				width: Dimensions.get('window').width * 0.9,
				position: 'absolute',
				zIndex: 2,
				alignItems: 'flex-end',
				right: 25,
				marginTop: 5
			}}>
				{!hiddenBackButton && <IconButton
					style={{ height: 60, width: 60, backgroundColor: 'transparent', marginTop: -25 }}
					onPress={() => handleNavegate()}
					accessibilityLabel={t('accesibility.arrowBack')}
					icon={<GoBackIcon />} />}
			</View>
			<Column>
				{filterBySearch && <View style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 10,
					marginBottom: -10
				}}>
					<Input
						label={t('myHealth.medication.title')}
						filterBySearch
						placeholder={t('common.search')}
						name={t('common.search')}
						isActiveSearch={searchValue.length ? true : false}
						labelStyle={{ fontSize: 14 }}
						onChangeText={setSearchValue}
						value={searchValue}
						clearSearch={() => setSearchValue('')}
					/>
				</View>}
				{filterComponent || moreOptionComponent ? (
					<View
						style={{
							flexDirection: 'row',
							margin: 10,
							marginTop: 20,
							justifyContent: 'space-between',
							marginBottom: (tempData) ? 40 : 10
						}}
					>
						<Button
							accesibilityLabel={t('accessibility.filter')}
							accesibilityHint={t('accessibility.btnFilter')}
							onPress={() => /* data?.length == 0 ? {} : */ openModal(true)}
							title={t('option.filter')}
							variant={'Underline'}
							textStyle={{
								color: '#2E7300',
								paddingLeft: 7,
								textDecorationLine: 'none',
								paddingVertical: 5
							}}
							icon={<FilterIcon />}
						/>

						{moreOptionComponent ? (
							<Button
								accesibilityLabel={t('accessibility.btnMoreOptions')}
								onPress={() => openModal(false)}
								title={t('option.more')}
								variant={'Underline'}
								textStyle={{
									color: '#2E7300',
									textDecorationLine: 'none',
									paddingLeft: 7,
									paddingRight: 0,
									paddingVertical: 5
								}}
								icon={<MoreOptionIcon />}
							/>
						) : (
							<></>
						)}
						{filterComponent ?
							<>
								{showData && data && showData.length <= data?.length ?
									<FilterInfoBtn
										tempData={tempData}
										onPress={filterInfoBtnAction} >
										<View style={{ marginBottom: 5, justifyContent: 'center', width: Dimensions.get('window').width * 0.4 }}>
											<ShowTotalData />
										</View>
									</FilterInfoBtn>
									: <></>}
							</> : <></>
						}
						{tempData || moreOptionComponent ? <></> : <ShowTotalData />}
					</View>
				) : (
					<></>
				)}


				{isForm ? <View style={{ marginTop: 0 }}>{component}</View> : <KeyboardAwareScrollView
					keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
					extraScrollHeight={extraScrollHeight}
					contentContainerStyle={
						showData?.length != 0 ? { marginTop: 10, flex: 1 } : { paddingTop: 10, flex: 1 }
					}
					enableOnAndroid={true}
				>
					{component}
				</KeyboardAwareScrollView>}
			</Column>
		</View>
	);
};