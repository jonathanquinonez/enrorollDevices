import React from 'react';

import InfoSquare from 'icons/InfoSquare.svg';
import Menu1Icon from 'icons/Appoiment1.svg';
import Menu2Icon from 'icons/Appoiment2.svg';
import Menu3Icon from 'icons/Appoiment3.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Text, Dimensions } from 'react-native';
import Card from 'src/components/molecules/Card/Card';
import Row from 'src/components/atoms/Row/Row';
import { userActions } from 'adapter/user/userSlice';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import { userSelectors } from 'adapter/user/userSelectors';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
export const BookingOptions = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { isBeWell } = useAppSelector(userSelectors.selectIsBeWell);
	const { closeModal, setModal } = useBottomSheet();

	const validateBewell = () => {
		if (isBeWell) {
			setModal({
				render: () => (
					<ModalWarning
						isIconAlert
						warningText={t('appoiment.subTitleModal')}
						styleSubtitle={{ color: '000', fontSize: 14, fontFamily: 'proxima-regular', marginTop: 10, marginBottom: 40 }}
						title={t('appoiment.titleModal')}
						textButton={t('common.continue')}
						onPress={() => { closeModal(); navigation.navigate('VimView'); }}
					/>
				), blockModal: false
			});
		} else navigation.navigate('VimView');
	}

	return (
		<ScrollView>
			{isBeWell ? <View style={{
				alignSelf: 'center',
				alignItems: 'center',
				marginTop: 20
			}}>
				<View style={{
					width: Dimensions.get('window').width * 0.85,
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row'
				}}>
					<IconButton
						accessibilityLabel={t('accessibility.image')}
						accessibilityRole="image"
						icon={<InfoSquare />}
						style={{backgroundColor:'transparent'}}
						disabled />
					<Text style={{
						width: Dimensions.get('window').width * 0.75,
						fontFamily: 'proxima-regular',
						fontSize: 14,
						color: '#212121',
						paddingLeft: 15
					}} maxFontSizeMultiplier={1.3}>{t('appointmentMH.note')}</Text>
				</View>
			</View> : <></>}
			<View style={{ paddingTop: 40, paddingHorizontal: 10, marginBottom: 100 }}>
				<Card key={'card-1'}
					icon={<Menu1Icon />}
					title={t('appoiment.menuTitle1')}
					subtitle={t(isBeWell ? 'appoiment.bewellOption' : 'appoiment.menuSub1')}
					onPress={() => validateBewell()}
				/>
				<View style={{ marginVertical: 5 }} />
				<Card key={'card-2'}
					icon={<Menu2Icon />}
					title={t('appoiment.menuTitle2')}
					subtitle={t('appoiment.menuSub2')}
					onPress={() => {
						navigation.navigate('UpcomingBookingScreen')
					}}
				/>
				<View style={{ marginVertical: 5 }} />
				<Card key={'card-3'}
					icon={<Menu3Icon />}
					title={t('appoiment.menuTitle3')}
					subtitle={t('appoiment.menuSub3')}
					onPress={() => {
						navigation.navigate('PreviusBookingScreen')
					}}
				/>
			</View>
		</ScrollView>
	);
};
