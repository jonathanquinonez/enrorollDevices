import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Dimensions } from 'react-native';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { Platform } from 'react-native';
import { InfLabels, ButtonOption } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCalendar from '../../../../assets/icons/CalendarDayIcon.svg';
import IconHour from '../../../../assets/icons/ClockIcon.svg';
import IconLocation from '../../../../assets/icons/MapMarkerAlt.svg';
import IconUser from '../../../../assets/icons/UserTagIcon.svg';
import VisitType from '../../../../assets/icons/VisitType.svg';
import { List } from 'src/components/organisms/List/List';
import Paginator from 'src/components/atoms/Paginator/Paginator';
import theme from 'ui-core/utils/theme';
import moment from 'moment';
import EcwService from 'adapter/api/ecwService';
import Row from 'src/components/atoms/Row/Row';
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import i18n from 'i18n/i18n';
import { processText } from 'src/screens/Symtoms/utils';



interface IDataRegistry {
	data: any[];
	totalData: number;
	dates: any;
}

export const RegistryList: React.FC<IDataRegistry> = (props) => {
	const { data, dates, totalData } = props;
	const { t } = useTranslation();
	const [dataList, setDataList] = useState(data);
	const [currPage, setCurrPage] = useState(1);
	const lastPage = Math.ceil(data.length / 5);
	const language = i18n.language;
	const { closeModal, setModal } = useBottomSheet();
	const { birthdate } = useAppSelector(userSelectors.selectUser);
	const page_size = 5
	const title = { marginBottom: 10, color: '#5B5C5B', fontFamily: 'proxima-regular', fontSize: 14 }
	const [download] = EcwService.useFetchDocumentLabVisitSummaryMutation();
	const mapData = (information: any[]) => {
		const processData = information.slice((currPage - 1) * page_size, currPage * page_size);
		setDataList(processData);
	};

	useEffect(() => {
		setCurrPage(1);
		mapData(data);
	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);

	const information: InfLabels[] = [
		{
			id: 1,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.register.date')}`,
			subTitle: '',
			doubleLine: true,
		},

		{
			id: 2,
			iconLabel: <IconHour />,
			title: `${t('myHealth.register.hour')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 3,
			iconLabel: <IconLocation />,
			title: `${t('myHealth.register.location')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 4,
			iconLabel: <IconLocation />,
			title: `${t('myHealth.register.address')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 5,
			iconLabel: <IconUser />,
			title: `${t('myHealth.register.reason')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 6,
			iconLabel: <VisitType />,
			title: `${t('myHealth.register.visitType')}`,
			subTitle: '',
			doubleLine: true,
		},
	];


	const handlerDownload = async (item: any) => {
		try {
			console.log("el item", item)
			const languageRequest = language.split('-');
			const data: any = {
				patientId: item.patientId,
				encounterId: item.encounterId,
				beginDate: dates?.beginDate,
				endDate: dates?.endDate,
				birthDate: birthdate,
				language: languageRequest[0],
			};
			await download(data)
				.unwrap()
				.then((response) => {
					if (Platform.OS === 'android') {
						console.log(item.appointmentProvider.replace(" ", "_"))
						let date = moment(item.appointmentDate).format('MM-DD-YYYY')
						savepdfToFilesystem(response, `${t('myHealth.regis2')} ${item.appointmentProvider} ${date}`);
					} else {
						let date = moment(item.appointmentDate).format('MM_DD_YYYY')
						let nameForVissitIos: string = `${t('myHealth.regisIos')}`
						let appointment = item.appointmentProvider.replaceAll(" ", "_")
						let completeFileName = nameForVissitIos + "_" + appointment + "_" + date

						savepdfToFilesystem(response, completeFileName);
					}

				});
		} catch (error) {
			//openModal();
			console.log('\n error', error);
		}
	};

	const openModal = () => {
		setModal({
			render: () => (
				<>
					{
						<View style={{ height: 280, alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 12,
									color: '#055293',
									fontFamily: 'proxima-regular',
								}}
								maxFontSizeMultiplier={1.3}
							>
								{`${t('myHealth.lab.message')}`}
							</Text>

							<Button
								title={'Ok'}
								style={{ top: 30, width: 150, height: 35, backgroundColor: '#055293', }}
								onPress={() => {
									closeModal();
								}}
							/>
						</View>
					}
				</>
			),
			height: 200,
		});
	};

	const savepdfToFilesystem = async (base64: string, fileName: string) => {
		const fileUri = FileSystem.documentDirectory + processText(fileName) + '.pdf';
		await FileSystem.writeAsStringAsync(fileUri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			FileViewer.open(fileUri, { showOpenWithDialog: true, showAppsSuggestions: true })
				.then(() => {
					// success
					console.log('File is opened');
				})
				.catch((error) => {
					// error
					console.log('Error in file', error);
				});
		});
	};

	const optionButton: ButtonOption = {
		name: `${t('myHealth.lab.download')}`,
		onSubmit: (e: any) => handlerDownload(e),
		textStyle: {
			width: Dimensions.get('window').width,
		},
		variant: 'Contained',
	};

	return (
		<View style={{ flex: 1 }}>
			<Text style={title}>{t('myHealth.register.title')}</Text>
			<List
				totalData={totalData}
				iconWhenNoResults={{ nameImg: 'VisSumm', subtitle: 'VisSumm' }}
				data={dataList}
				button={[optionButton]}
				titleCard={undefined}
				cardLabels={information}
				typeBody='register'
				paginator={<View style={{ marginBottom: 65, marginTop: 15, width: '85%', alignSelf: 'center' }}>
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
				</View>}
			/>
		</View>
	);
};
