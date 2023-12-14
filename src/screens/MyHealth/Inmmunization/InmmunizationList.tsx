import React, { useEffect, useState } from 'react';
import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCalendar from '../../../../assets/icons/CalendarDayIcon.svg';
import Flask from '../../../../assets/icons/FlaskTIcon.svg';
import IconVial from '../../../../assets/icons/VialIcon.svg';
import { useTranslation } from 'react-i18next';
import EcwService from 'adapter/api/ecwService';
import { List } from 'src/components/organisms/List/List';
import IconFolder from '../../../../assets/icons/FolderOpenIcon.svg';
import { View } from 'react-native';
import Paginator from 'src/components/atoms/Paginator/Paginator';

interface IDataInmu {
	totalData: number;
	data: any[]
}


export const InmmunizationList: React.FC<IDataInmu> = (props) => {

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
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.immunizations.date')}`,
			subTitle: '',
			doubleLine: true,
		},

		{
			id: 2,
			iconLabel: <IconVial />,
			title: `${t('myHealth.immunizations.dose')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 3,
			iconLabel: <Flask />,
			title: `${t('myHealth.immunizations.manufacturer')}`,
			subTitle: '',
			doubleLine: true,
		},
	];

	const cardTitle = {
		nameCard: `${t('myHealth.register.register')}`,
		iconCard: <IconFolder style={{ margin: 2 }} />,
	};

	useEffect(() => {

		setCurrPage(1);
		mapData(data);

	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);


	return (
		<View style={{ flex: 1 }}>
			<List
				iconWhenNoResults={{ nameImg: 'Imm', subtitle: 'Imm' }}
				totalData={totalData}
				data={dataList}
				titleCard={cardTitle}
				cardLabels={information}
				typeBody='inmunization'
				paginator={<View style={{ marginVertical: 35, width: '85%', alignSelf: 'center', marginBottom: 65 }}>
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
};
