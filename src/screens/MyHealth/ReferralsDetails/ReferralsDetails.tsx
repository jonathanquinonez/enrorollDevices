import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as FileSystem from "expo-file-system";
import FileViewer from 'react-native-file-viewer';

import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';

import IconCalendar from 'assets/icons/CalendarDayIcon.svg';
import IconAuto from 'assets/icons/AutoriIcon.svg';

import ProviderIcon from 'assets/icons/ReferralsIcon/Provider_Icon.svg';
import StatusIcon from 'assets/icons/ReferralsIcon/Status_Icon.svg';
import Speciallity from 'assets/icons/ReferralsIcon/Speciallity.svg';
import MedicalIcon from 'assets/icons/ReferralsIcon/Medical_Icon.svg';
import Address from 'assets/icons/ReferralsIcon/Address.svg';
import DiagnosisIcon from 'assets/icons/ReferralsIcon/Diagnosis_Icon.svg';
import PhoneIcon from 'assets/icons/ReferralsIcon/Phone-Icon.svg';
import ReasonIcon from 'assets/icons/ReferralsIcon/Reason_Icon.svg';

import { List } from 'src/components/organisms/List/List';
import { Dimensions, View } from 'react-native';
import EcwService from 'adapter/api/ecwService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { processText } from 'src/screens/Symtoms/utils';


export const ReferralsDetails = () => {
	const { t } = useTranslation();
	const { setAlertErrorMessage } = useErrorAlert();
	const [getReferral_pdf] = EcwService.useGetReferral_pdfMutation();

	const { dataInfoReferralsDetails }: any = useAppSelector(userSelectors.selectIsLoggedIn);
	useEffect(()=>{
		console.log('---->',dataInfoReferralsDetails)
	},[dataInfoReferralsDetails])

	const downloadPdf = useCallback(
		async (referralId: number, patientId: number) => {
			try {
				const data: { referralId: number, patientId: number, language: string } = {
					patientId,
					referralId,
					language: t('general.locale')
				}
				const dataReferalsPdf = await getReferral_pdf(data).unwrap();
				if (dataReferalsPdf)
					savepdfToFilesystem(dataReferalsPdf, `${t('menuLeftHome.subHealth.rf')}${patientId}`);
			} catch (error) {
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[getReferral_pdf],
	);

	const savepdfToFilesystem = async (base64: string, fileName: string) => {
		const fileUri = FileSystem.documentDirectory + processText(fileName) + '.pdf';
		await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 }).then(
			() => {
				FileViewer.open(fileUri, { showOpenWithDialog: true, showAppsSuggestions: true })
					.then(() => {
						// success
						console.log("File is opened")
					})
					.catch(error => {
						// error
						console.log("Error in file", error)
					})
			}
		);
	}


	const information: InfLabels[] = [
		{
			id: 1,
			iconLabel: <StatusIcon />,
			title: `${t('myHealth.referrals.Status')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 2,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.referrals.Issue')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 3,
			iconLabel: <></>, // Title 1
			title: `${t('myHealth.referrals.title1')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 4,
			iconLabel: <ProviderIcon />,
			title: `${t('myHealth.referrals.Provider')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 5,
			iconLabel: <Speciallity />,
			title: `${t('myHealth.referrals.Speciality')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 6,
			iconLabel: <MedicalIcon />,
			title: `${t('myHealth.referrals.MedicalCenter')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 7,
			iconLabel: <Address />,
			title: `${t('myHealth.referrals.Address')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 8,
			iconLabel: <PhoneIcon />,
			title: `${t('myHealth.referrals.Phone')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 9,
			iconLabel: <></>, // Title 2
			title: `${t('myHealth.referrals.title2')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 10,
			iconLabel: <MedicalIcon />,
			title: `${t('myHealth.referrals.MedicalCenter')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 11,
			iconLabel: <IconAuto />,
			title: `${t('myHealth.referrals.IDNumber')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 12,
			iconLabel: <IconAuto />,
			title: `${t('myHealth.referrals.NPI')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 13,
			iconLabel: <></>, // Title 3
			title: `${t('myHealth.referrals.title3')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 14,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.referrals.StartDate')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 15,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.referrals.ValidUntil')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 16,
			iconLabel: <IconAuto />,
			title: `${t('myHealth.referrals.Authorization')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 17,
			iconLabel: <ReasonIcon />,
			title: `${t('myHealth.referrals.Reason')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 18,
			iconLabel: <DiagnosisIcon />,
			title: `${t('myHealth.referrals.Diagnosis')}`,
			subTitle: '',
			doubleLine: true,
		},
	];

	const button = {
		name: `${t('myHealth.referrals.btnPDF')}`,
		onSubmit: (item: any) => downloadPdf(item.referralId, item.patientId),
		textStyle: {
			width: Dimensions.get('window').width
		},
		variant: "Contained"
	}

	return (
		<View style={{ flex: 1 }}>
			{dataInfoReferralsDetails && <List
				totalData={1}
				data={[dataInfoReferralsDetails]}
				button={[button]}
				titleCard={undefined}
				cardLabels={information}
				typeBody='referralsDetails' />}
		</View>
	);
};
