import React, { useEffect, useState } from 'react';
import { ButtonOption, InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCenterMedical from '../../../../assets/icons/MedicalCenterIcon.svg';
import IconCalendar from '../../../../assets/icons/CalendarDayIcon.svg';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import EcwService from 'adapter/api/ecwService';
import { DocumentLabDownloadDTO } from 'infrastructure/keraltyApi/models/ecw';
import { DocumentLabDownload } from 'domain/entities/documentLab';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import i18n from 'i18n/i18n';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Row from 'src/components/atoms/Row/Row';
import { Dimensions, Platform, Text, View } from 'react-native';
import Button from 'src/components/atoms/Button/Button';
import { List } from 'src/components/organisms/List/List';
import Paginator from 'src/components/atoms/Paginator/Paginator';
import { processText } from 'src/screens/Symtoms/utils';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';

interface IDataLab {
	totalData: number;
	data: any[];
}

export const LabList: React.FC<IDataLab> = (props) => {
	const { data, totalData } = props;
	const { t } = useTranslation();
	const [download] = EcwService.useFetchDocumentLabMutation();
	const { birthdate } = useAppSelector(userSelectors.selectUser);
	const { closeModal, setModal } = useBottomSheet();
	const language = i18n.language;

	const [dataList, setDataList] = useState(data);
	const [currPage, setCurrPage] = useState(1);
	const lastPage = Math.ceil(data.length / 5);
	const page_size = 5;

	const mapData = (information: any[]) => {
		const processData = information.slice((currPage - 1) * page_size, currPage * page_size);
		setDataList(processData);
	};

	const information: InfLabels[] = [
		{
			id: 1,
			iconLabel: <IconCenterMedical />,
			title: `${t('myHealth.lab.medicalCenter')}`,
			subTitle: 'Suntitle 1',
			doubleLine: true,
		},

		{
			id: 2,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.lab.order')}`,
			subTitle: 'Suntitle 2',
			doubleLine: true,
		},
	];

	useEffect(() => {
		setCurrPage(1);
		mapData(data);
	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);

	const openModal = () => {
		setModal({
			render: () => (
				<ModalWarning
					onPress={closeModal}
					warningText={`${t('myHealth.lab.message')}`} />
			)
		});
	};

	const handlerDownload = async (item: any) => {
		try {
			const languageRequest = language.split('-');
			const data: any = {
				patientId: item.patientId,
				reportId: item.reportId,
				dob: birthdate,
				facilityInfo: item.facilityInfo,
				providerInfo: item.providerInfo,
				itemName: item.itemName,
				clinicalCenter: item.clinicalCenter,
				notes: item.notes,
				language: languageRequest[0],
			};
			await download(data)
				.unwrap()
				.then((response) => {
					if (Platform.OS === 'android') {
						let date = moment(item.orderDate).format('MM-DD-YYYY')
						let newName: string = item.itemName.replace("/", "-")
						if (item.type == "DI") {
							savepdfToFilesystem(response, `${t('myHealth.diagnostic')} ${newName} ${date}`);
						} else {
							savepdfToFilesystem(response, `${t('myHealth.laboratory')} ${newName} ${date}`);
						}
					} else {
						let date = moment(item.orderDate).format('MM_DD_YYYY')
						let nameforDiagnosticIos: string = `${t('myHealth.diagnosticIos')}`
						let nameForLaboratoryIos: string = `${t('myHealth.laboratory')}`
						let nameItem: string = item.itemName.replaceAll(" ", "_");
						nameItem = nameItem.replaceAll("/", "_")
						if (item.type == "DI") {
							let finalDI: string = nameforDiagnosticIos + "_" + nameItem + "_" + date;
							savepdfToFilesystem(response, finalDI);
						} else {
							let finalLab: string = nameForLaboratoryIos + "_" + nameItem + "_" + date;
							savepdfToFilesystem(response, finalLab);
						}

					}


				});
		} catch (error) {
			openModal();
		}
	};

	const savepdfToFilesystem = async (base64: string, fileName: string) => {
		const fileUri = FileSystem.documentDirectory + processText(fileName) + '.pdf';
		await FileSystem.writeAsStringAsync(fileUri, base64, {
			encoding: FileSystem.EncodingType.Base64,
		}).then(() => {
			FileViewer.open(fileUri, { showOpenWithDialog: true, showAppsSuggestions: true })
				.then(() => {
					// success
				})
				.catch((error) => {
					// error
				});
		});
	};

	const optionButton: ButtonOption = {
		name: `${t('myHealth.lab.download')}`,
		onSubmit: (e: any) => handlerDownload(e),
		variant: 'Contained',
	};

	useEffect(() => {
		if (data.length) {
			mapData(data);
		} else {
			mapData([]);
		}
	}, [data, currPage]);

	return (
		<View style={{ flex: 1 }}>
			<List
				iconWhenNoResults={{ nameImg: 'Labs', subtitle: 'Labs' }}
				totalData={totalData}
				data={dataList}
				cardLabels={information}
				typeBody="labs"
				button={[optionButton]}
				titleCard={undefined}
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
				</View>}
			/>
		</View>
	);
};
