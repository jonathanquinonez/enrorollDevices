import React from 'react';
import InfoSquare from 'icons/InfoSquare.svg';
import Menu1Icon from 'icons/Appoiment1.svg';
import Menu2Icon from 'icons/Appoiment2.svg';
import Menu3Icon from 'icons/Appoiment3.svg';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { ScrollView, View, Text, Dimensions, Image } from 'react-native';
import Card from 'src/components/molecules/Card/Card';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import { userSelectors } from 'adapter/user/userSelectors';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { UserIcon } from 'assets/icons/Smartwatch';
export const WellnessOptions = () => {
	const { t } = useTranslation();
	const navigation: any = useNavigation();
	const { closeModal, setModal } = useBottomSheet();

	const handlerVitalSign = async () => {
		setModal({
			render: () => (
				<ModalWarning
					isIconAlert
					title={t('anura.modalA.title')}
					styleTitle={{ color: '#002F87' }}
					title2={t('anura.modalA.title2')}
					styleTitle2={{ color: '#212121', fontSize: 14, fontFamily: 'proxima-bold' }}
					warningText={t('anura.modalA.text')}
					styleSubtitle={{
						color: '#212121',
						fontFamily: 'proxima-regular',
						fontSize: 14,
						justifyContent: 'flex-start',
						textAlign: 'left',
					}}
					textButton={'Continue'}
					textButtonCancel="Close"
					onPressCancel={() => closeModal()}
					onPress={() => {
						closeModal();
						navigation.navigate('VitalSignScreen');
					}}
				/>
			),
			height: 600,
			blockModal: true,
		});
	};

	return (
		<ScrollView>
			<View style={{ paddingTop: 40, paddingHorizontal: 10, marginBottom: 100 }}>
				{/* <Card
					key={'card-1'}
					icon={
						<Image
							style={{ width: 46, height: 48, marginBottom: 10 }}
							source={require('assets/icons/MentalHealthIcons/Check.png')}
						/>
					}
					title={t('home.check')}
					subtitle={t('wellness.subCheck')}
					onPress={() => navigation.navigate('SymtomsView', { action: 'SYPTOMS' })}
				/>
				<View style={{ marginVertical: 5 }} /> */}
				{/* <Card
					key={'card-2'}
					icon={
						<Image
							style={{ width: 53, height: 52, marginBottom: 10 }}
							source={require('assets/icons/MentalHealthIcons/CheckVitalIcon.png')}
						/>
					}
					title={t('menuLeftHome.vitalSign')}
					subtitle={t('wellness.vitalSignsSub')}
					onPress={handlerVitalSign}
				/>
				{/* <View style={{ marginVertical: 5 }} />
				/> */}
				{/* <View style={{ marginVertical: 5 }} />
				<Card
					key={'card-3'}
					icon={
						<Image
							style={{ width: 37, height: 43, marginBottom: 10 }}
							source={require('assets/icons/Smartwatch/child.png')}
						/>
					}
					title={t('library.smartwatch')}
					subtitle={t('smartwatch.wellness.description')}
					onPress={() => navigation.navigate('Smartwatch')}
				/> */}

				<View style={{ marginVertical: 5 }} />
				<Card
					key={'card-4'}
					icon={
						<Image
							style={{ width: 37, height: 43, marginBottom: 10 }}
							source={require('assets/icons/MentalHealthIcons/libHealthIcon.png')}
						/>
					}
					title={t('library.health')}
					subtitle={t('wellness.healthLib')}
					onPress={() => navigation.navigate('HealthLibrary')}
				/>
			</View>
		</ScrollView>
	);
};
