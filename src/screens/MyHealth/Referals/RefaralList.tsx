import React from 'react';
import { useTranslation } from 'react-i18next';
import { InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import IconCalendar from 'assets/icons/CalendarDayIcon.svg';
import IconUser from 'assets/icons/UserTagIcon.svg';
import IconCalendarCheck from 'assets/icons/CalendarCheckIcon.svg';
import IconHead from 'assets/icons/HeadMedicalIcon.svg';
import IconAuto from 'assets/icons/AutoriIcon.svg';

// import ProviderIcon from 'assets/icons/ReferralsIcon/Provider_Icon.svg';
import ProviderIcon from 'assets/icons/ReferralsIcon/Provider_Icon.svg';
import SuffixIcon from 'assets/icons/ReferralsIcon/Suffix_Icon.svg';
import MedicalIcon from 'assets/icons/ReferralsIcon/Medical_Icon.svg';
import StatusIcon from 'assets/icons/ReferralsIcon/Status_Icon.svg';
import Speciallity from 'assets/icons/ReferralsIcon/Speciallity.svg';

import { List } from 'src/components/organisms/List/List';
import { Dimensions, View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import Paginator from 'src/components/atoms/Paginator/Paginator';
import { useNavigation } from '@react-navigation/native';
import { userActions } from 'adapter/user/userSlice';
import { useAppDispatch } from 'adapter/hooks';

interface IDataReferals {
	data: any[];
	totalData: number;
}

export const RefaralList: React.FC<IDataReferals> = (props) => {
	const { data, totalData } = props;
	const { t } = useTranslation();
	const [dataList, setDataList] = useState(data);
	const [currPage, setCurrPage] = useState(1);
	const lastPage = Math.ceil(data.length / 5);
	const page_size = 5;
	const dispatch = useAppDispatch();

	const { navigate } = useNavigation();


	const mapData = (information: any[]) => {

		const processData = information.slice((currPage - 1) * page_size, currPage * page_size);
		setDataList(processData);
	};

	const information: InfLabels[] = [
		{
			id: 1,
			iconLabel: <ProviderIcon />,
			title: `${t('myHealth.referrals.Provider')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 2,
			iconLabel: <Speciallity />,
			title: `${t('myHealth.referrals.Speciality')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 3,
			iconLabel: <MedicalIcon />,
			title: `${t('myHealth.referrals.MedicalCenter')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 4,
			iconLabel: <StatusIcon />,
			title: `${t('myHealth.referrals.Status')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 5,
			iconLabel: <IconAuto />,
			title: `${t('myHealth.referrals.Authorization')}`,
			subTitle: '',
			doubleLine: true,
		},
		{
			id: 6,
			iconLabel: <IconCalendar />,
			title: `${t('myHealth.referrals.Issue')}`,
			subTitle: '',
			doubleLine: true,
		}
	];

	useEffect(() => {
		setCurrPage(1);
		mapData(data);
	}, [data]);

	useEffect(() => {
		mapData(data);
	}, [currPage]);

	const button = {
		name: `${t('myHealth.referrals.btn')}`,
		onSubmit: (item: any) => {
			dispatch(userActions.setDataInfoReferralsDetails(item));
			navigate('ReferralsDetailsScreen')
		},
		textStyle: {
			width: Dimensions.get('window').width,
			color: '#055293',
			fontFamily: 'proxima-regular',
		},
		variant: "Underline"
	}

	return (
		<View style={{ flex: 1 }}>
			<List
				iconWhenNoResults={{ nameImg: 'Ref', subtitle: 'Ref' }}
				totalData={totalData}
				data={dataList}
				button={[button]}
				titleCard={undefined}
				cardLabels={information}
				typeBody='referals'
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
				</View>} />
		</View>
	);
};
