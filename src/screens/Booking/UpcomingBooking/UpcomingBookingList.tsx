import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { ButtonOption, InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';

import IconConfirm from '../../../../assets/icons/Confirm.svg';
import IconSucces from '../../../../assets/icons/Success.svg';
import Paginator from 'src/components/atoms/Paginator/Paginator';
import { Linking, View } from 'react-native';
import { List } from 'src/components/organisms/List/List';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import GeneralMessage from 'src/components/organisms/Message/GeneralMessage'

import ModalWarningType2 from 'src/components/molecules/ModalWarningType2/ModalWarningType2';
import { useNavigation } from '@react-navigation/native';
import { calculateTimeDifference } from 'src/components/molecules/Card/CardListUpcoming/CardListUpcoming.type';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';



interface IDataUpcoming {
	totalData: number;
	data: any[]
	cancel: (event: string) => void
	isCancel: boolean,
	cleanState: (state: boolean) => void
}

export const PreviusBookingList: React.FC<IDataUpcoming> = (props) => {

	const { data, cancel, isCancel, cleanState, totalData } = props;
	const { t } = useTranslation();
	const [currPage, setCurrPage] = useState(1);
	const [dataList, setDataList] = useState(data);
	const { closeModal, setModal } = useBottomSheet();
	const navigation: any = useNavigation();
	const { isBeWell } = useAppSelector(userSelectors.selectIsBeWell);

	const lastPage = Math.ceil(data.length / 5);
	const page_size = 5

	const mapData = (information: any[]) => {
		const processData = information.slice((currPage - 1) * page_size, currPage * page_size);
		setDataList(processData);
	};


	const openModal = (e: any) => {
		setModal({
			render: () => (
				<GeneralMessage
					icon={<IconConfirm />}
					message={`${t('appoiment.confirm')}`}
					title1={`${t('appoiment.buttonNo')}`}
					submit1={() => closeModal()}
					title2={`${t('appoiment.buttonYes')}`}
					submit2={() => cancel(e.encounterId)}
					textStyles={{ fontSize: 18, color: '#055293' }}
				/>
			),
			height: 280,
			blockModal: true
		});
	};

	useEffect(() => {
		if (isCancel) {
			setModal({
				render: () => (
					<GeneralMessage
						icon={<IconSucces />}
						message={`${t('appoiment.succes')}`}
						title1={`${t('appoiment.buttonOk')}`}
						submit1={() => { closeModal(), cleanState(false) }}
						isConfirm
					/>
				),
				height: 280,
				blockModal: true
			});
		}
	}, [isCancel])

	useEffect(() => {
		setCurrPage(1);
		mapData(data);
	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);

	const handleOpenLink = (data: any) => {
		const time = calculateTimeDifference(data?.startTime, data?.date);
		if (time <= 15 && time >= -15) {
			if (data.url) Linking.openURL(data?.url)
		} else alertExceededTimeLimit()
	}


	const alertExceededTimeLimit = () => setModal({
		render: () => (
			<ModalWarningType2
				isIconAlert
				warningText={t(`appoiment.sorry`)}
				textButton={t('appoiment.reschedule')}
				styleBtnA={{ width: 'auto' }}
				styleBtn={{ marginBottom: 25 }}
				textButtonCancel={t('common.close')}
				variantBtn='Underline'
				styleTextBtn={{ color: '#004B7F', fontFamily: 'proxima-bold', fontSize: 16 }}
				onPressCancel={() => { closeModal(); }}
				onPress={() => { closeModal(); isBeWell ? modalNote() : navigation.navigate('VimView'); }}
			/>
		), height: 370, blockModal: false
	})

	const modalNote = () => setModal({
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
	})

	const goToAppointment: ButtonOption = {
		name: t('appoiment.urlText'),
		onSubmit: (e) => handleOpenLink(e),
		styleButton: { marginBottom: -8 },
		textStyle: { fontFamily: 'proxima-bold', fontSize: 16, width: 300 },
	};
	const disableCancelButton: ButtonOption = {
		name: t('appoiment.noCancel'),
		onSubmit: (e) => { },
		styleButton: { backgroundColor: '#FFF' },
		textStyle: { fontFamily: 'proxima-bold', fontSize: 16, width: 300, color: '#8B8B8B' },
		variant: 'Text',
		disabled: true
	};
	const cancelButton: ButtonOption = {
		name: t('appoiment.cancel'),
		onSubmit: (e) => { openModal(e) },
		textStyle: { fontFamily: 'proxima-bold', fontSize: 16, width: 300, color: '#0069A7' },
		variant: 'Underline',
	};

	return (
		<View style={{ flex: 1 }}>
			<List
				iconWhenNoResults={{ nameImg: 'UpcoAppo', subtitle: 'UpcoAppo' }}
				totalData={totalData}
				data={dataList}
				titleCard={''}
				cardLabels={[]}
				typeBody='upcoming'
				button={[goToAppointment, cancelButton, disableCancelButton]}
				paginator={<View style={{ marginTop: 10, marginBottom: 65, width: '85%', alignSelf: 'center' }}>
					{data.length >= 5 ? (
						<Paginator
							currentPage={currPage}
							itemsPerPage={5}
							lastPage={lastPage}
							select={(page) => setCurrPage(page)}
							totalItems={data.length}
						/>
					) : (
						<></>
					)}
				</View>} />
		</View>
	);
}
