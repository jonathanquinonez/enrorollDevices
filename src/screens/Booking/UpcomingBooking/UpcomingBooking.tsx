import AppoimentService from 'adapter/api/appoimentService';
import EcwService from 'adapter/api/ecwService';
import { useAppSelector, useAppDispatch } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import useTokenizeVim from 'hooks/useTokenizeVim';
import i18n from 'i18n/i18n';
import { CancelUpAppoimentDto } from 'infrastructure/keraltyApi/models/ecw';
import moment from 'moment';
import { Moment } from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import FORMATS from 'ui-core/utils/formats';
import { capitalize } from 'ui-core/utils/helpers/format';
import { PreviusBookingList } from './UpcomingBookingList';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import { userActions } from 'adapter/user/userSlice';


export const UpcomingBookingScreen = () => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const { ecwId, state } = useAppSelector(userSelectors.selectUser);
	const [upcomingRequest] = EcwService.useFetchUpApptmsMutation();
	const [cancel] = EcwService.useFetchCancelAppoimentMutation();
	const [cancelAppoiment] = AppoimentService.useFetchCancelAppoimentMutation();
	const [showData, setShowData] = useState<any[]>([]);
	const [isSucces, setIsSucces] = useState<boolean>(false);
	const [data, setData] = useState<any[]>([]);
	const { setAlertErrorMessage } = useErrorAlert();
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const { closeModal, setModal } = useBottomSheet();
	const { reloadUpcomingAppointments } = useAppSelector(userSelectors.selectRoute);
	//const { cancelAppoiment } = useTokenizeVim();
	const { isBeWell } = useAppSelector(userSelectors.selectIsBeWell);

	const handlerData = useCallback(async () => {
		try {
			if (ecwId) {
				const dataReferals: any[] = await upcomingRequest({ecw: ecwId, isBeWell, state}).unwrap();
				let newData = [...dataReferals].sort((a: any, b: any) =>
					moment(capitalize(moment(b.date).locale(lang).format('dddd, MMMM D, YYYY'))).diff(capitalize(moment(a.date).locale(lang).format('dddd, MMMM D, YYYY'))),
				);
				newData = [...newData].map((item: any) => {
					return item.status === 'ACCEPTED'
						? { ...item, newStatus: t('appoiment.schedule') }
						: item.status === 'ARCHIVED'
							? { ...item, newStatus: t('appoiment.archive') }
							: { ...item, newStatus: '' };
				});
				setShowData(newData);
				setData(newData);                
			}
		} catch (error) {
			if (error != '999') setAlertErrorMessage('Error: ' + error);
		}
	}, [upcomingRequest, ecwId]); 


	useEffect(()=>{
		if( reloadUpcomingAppointments === true ){		
		  dispatch(userActions.setReloadUpcomingAppointments( false ))   
		  handlerData();
		}
	},[ reloadUpcomingAppointments ]) 	


	const cancelAppoimentMe = async (idAppoiment: string) => {
		closeModal();

		try {
			let data: CancelUpAppoimentDto = {
				identifier: [
					{
						type: 'APPOINTMENT_ID',
						value: idAppoiment,
					},
				],
				communication: {
					language: lang === 'en' ? lang : 'sp',
				},
			};
			await cancelAppoiment(data)
				.unwrap()
				.then((response) => {
					if (
						response.identifier[0].value === idAppoiment &&
						response.response.code === 'OK'
					) {
						let showDataUpdate = showData.map((item: any) => {
							return item.encounterId === idAppoiment ? { ...item, status: 'ARCHIVED', newStatus: t('appoiment.archive') } : item;
						});
						setData(showDataUpdate);
						setShowData(showDataUpdate);
						setIsSucces(true);
						handlerData()
					}
				});
		} catch (error) {
			setModal({
				render: () => (
					<ModalWarning
						isIconAlert
						title={t('appoiment.titleErrorCancel')}
						warningText={t('appoiment.subErrorCancel')}
						textButton={t(`common.close`)}
						variantBtn='Underline'
						styleTitle={{  fontSize: 20, fontFamily: 'proxima-bold', color: '#002E58' }}
						styleSubtitle={{  fontSize: 18, fontFamily: 'proxima-regular', color: '#002E58' }}
						styleTextBtn={{ fontSize: 16, color: '#0071A3', fontFamily: 'proxima-bold' }}
						onPress={() => { closeModal() }}
					/>
				), height: 320, blockModal: false
			});
		}
	};

	useEffect(() => {
		handlerData();
	}, []);

	/**
	 * Filters the list of registries.
	 * @since 1.0.0
	 * @param from Start date.
	 * @param to End date
	 */
	const handleFilterChange = useCallback(
		(from: Moment, to: Moment) => {
			if (!data) return;
			if (!from) return setShowData(data);
			const fromDate = from.startOf('day');
			const toDate = to.endOf('day');
			const filteredData = data.filter((ref: any) => {
				const currentDate = moment(ref.date, FORMATS.date);
				return currentDate.isBetween(fromDate, toDate, undefined, '[]');
			});
			return setShowData(filteredData);
		},
		[data],
	);

	return (
		<RootGeneral
			data={data}
			showData={showData}
			title={t('appoiment.UpcomingTitle')}
			subtitle={t('appoiment.UpcomingSubtitle')}
			content={
				<PreviusBookingList
					totalData={data.length}
					isCancel={isSucces}
					data={showData}
					cancel={(ev: string) => cancelAppoimentMe(ev)}
					cleanState={(state) => setIsSucces(state)}
				/>
			}
			filterComponent={data.length > 0 ? handleFilterChange :  null}
		/>
	);
};
