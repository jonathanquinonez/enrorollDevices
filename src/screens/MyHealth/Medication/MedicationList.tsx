import React, { useEffect, useState } from 'react';
import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCalendar from 'icons/CalendarDayIcon.svg';
import Flask from 'icons/FlaskTIcon.svg';
import IconVial from 'icons/VialIcon.svg';
import { useTranslation } from 'react-i18next';
import EcwService from 'adapter/api/ecwService';
import { List } from 'src/components/organisms/List/List';
import IconFolder from 'icons/FolderOpenIcon.svg';
import { ScrollView, View } from 'react-native';
import Paginator from 'src/components/atoms/Paginator/Paginator';
import IconHour from 'icons/ClockIcon.svg';
import IconDose from 'icons/iconDose.svg';
import Icona2 from 'icons/icona2.svg';
import Icona3 from 'icons/icona3.svg';

interface IDataInmu {
	totalData: number;
	data: any[];
}


export const MedicationList: React.FC<IDataInmu> = (props) => {

	const { data, totalData } = props;

	const { t } = useTranslation();
	const [dataList, setDataList] = useState(data);
	const [currPage, setCurrPage] = useState(1);
	const lastPage = Math.ceil(data.length / 5);
	const page_size = 5

	const mapData = (information: any[]) => {
		const processData = information.slice((currPage - 1) * page_size, currPage * page_size);
		setDataList(processData);
	};

	const information: InfLabels[] = [
		{
			id: 1,
			iconLabel: <IconDose />,
			title: `${t('myHealth.medication.dose')}`,
			subTitle: '',
			doubleLine: true,
		},

		{
			id: 2,
			iconLabel: <Icona2 />,
			title: `${t('myHealth.medication.direction')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 3,
			iconLabel: <IconHour />,
			title: `${t('myHealth.medication.frequency')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 4,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.medication.startDate')}`,
			subTitle: '',
			doubleLine: true,
		},

		{
			id: 5,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.medication.endDate')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 6,
			iconLabel: <Icona3 />,
			title: `${t('myHealth.medication.prescribedBy')}`,
			subTitle: '',
			doubleLine: true,
		},
	];

	/* const cardTitle = {
		nameCard: `${t('myHealth.register.register')}`,
		iconCard: <IconFolder style={{ margin: 2 }} />,
	}; */

	useEffect(() => {

		setCurrPage(1);
		mapData(data);

	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);


	return (
		<ScrollView style={{marginBottom: 140}}>
			<List
				data={dataList}
				totalData={totalData}
				titleCard={undefined}
				iconWhenNoResults={{ nameImg: 'CurrMedic', subtitle: 'CurrMedic' }}
				cardLabels={information}
				typeBody='medication'
				paginator={<View style={{ marginBottom: 65, marginTop: 10, width: '85%', alignSelf: 'center' }}>
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
		</ScrollView>
	);
};
