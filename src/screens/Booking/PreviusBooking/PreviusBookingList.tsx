import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCalendar from 'icons/CalendarDayIcon.svg';
import MapMarker from 'icons/map-marker-alt.svg';
import IconUser from 'icons/UserTagIcon.svg';
import IconClock from 'icons/ClockIcon.svg'
import { View } from 'react-native';
import { List } from 'src/components/organisms/List/List';
import Paginator from 'src/components/atoms/Paginator/Paginator';

interface IDataPrevius {
	totalData: number;
	data: any[]
}

export const PreviusBookingList: React.FC<IDataPrevius> = (props) => {

	const { data, totalData } = props;
	const { t } = useTranslation();
	const [currPage, setCurrPage] = useState(1);
	const [dataList, setDataList] = useState(data);
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
			title: `${t('appoiment.dateP')}`, // Date
			subTitle: '',
			doubleLine: true
		},
		{
			id: 4,
			iconLabel: <IconClock />,
			title: `${t('appoiment.time')}`, //Provider
			subTitle: '',
			doubleLine: true
		},
		{
			id: 2,
			iconLabel: <IconUser />,
			title: `${t('appoiment.providerP')}`, //Provider
			subTitle: '',
			doubleLine: true
		},
		{
			id: 3,
			iconLabel: <MapMarker />,
			title: `${t('appoiment.locationP')}`,//Location locationP
			subTitle: '',
			doubleLine: true
		}
	];

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
				totalData={totalData}
				iconWhenNoResults={{ nameImg: 'PreAppo', subtitle: 'PreAppo' }}
				data={dataList}
				titleCard={''}
				cardLabels={information}
				typeBody='previus'
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
				</View>}
			/>
		</View>
	);
}
