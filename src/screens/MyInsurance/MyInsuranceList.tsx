import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ButtonOption, InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';

import IconClipBoard from '../../../assets/icons/ClipboardUserAlt.svg';
import IconUser from '../../../assets/icons/User3.svg';
import IconPeople from '../../../assets/icons/People.svg';
import CalendarInputIcon from '../../../assets/icons/CalendarInputIcon.svg';
import EcwService from 'adapter/api/ecwService';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { List } from 'src/components/organisms/List/List';
import { loaderActions } from 'adapter/loader/loaderSlice';
import { View } from 'react-native';
import AuthService from 'adapter/api/authService';


export const MyInsuranceList = () => {
	const { t } = useTranslation();
	const userInformation = useAppSelector(userSelectors.selectUser);
	const [fetchInformationInsurance] = AuthService.useFetchInformationInsuranceMutation();
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

	const { currentRoute } = useAppSelector(userSelectors.selectRoute);
	const dispatch = useAppDispatch();

	const [resultInformation, setresultInformation] = useState<any>();
	const [information, setinformation] = useState([
		{
			id: 0,
			iconLabel: <IconUser style={{ margin: 10 }} />,
			title: `${t('myInsurance.nameInsurance')}`,
			subTitle: '',
			doubleLine: false,
		},
		{
			id: 1,
			iconLabel: <IconPeople style={{ margin: 8 }} />,
			title: `${t('myInsurance.patient')}`,
			subTitle: '',
			doubleLine: false,
		},
		{
			id: 2,
			iconLabel: <IconClipBoard style={{ margin: 10 }} />,
			title: `${t('myInsurance.suscriber')}`,
			subTitle: '',
			doubleLine: false,
		},
		{
			id: 3,
			iconLabel: <IconClipBoard style={{ margin: 10 }} />,
			title: `${t('myInsurance.group')}`,
			subTitle: '',
			doubleLine: false,
		},
		{
			id: 4,
			iconLabel: <IconClipBoard style={{ margin: 10 }} />,
			title: `${t('myInsurance.status')}`,
			subTitle: '',
			doubleLine: false,
		},
		{
			id: 5,
			iconLabel: <IconUser style={{ margin: 10 }} />,
			title: `${t('patientRegistration.firstNameHolder')}`,
			subTitle: '',
			doubleLine: false,
		}
		,
		{
			id: 6,
			iconLabel: <IconUser style={{ margin: 10 }} />,
			title: `${t('patientRegistration.lastNameHolder')}`,
			subTitle: '',
			doubleLine: false,
		}
		,
		{
			id: 7,
			iconLabel: <CalendarInputIcon fill={'#757575'} style={{ margin: 10}} />,
			title: `${t('patientRegistration.dateBirthHolder')}`,
			subTitle: '',
			doubleLine: false,
		}
	])

	const handlerData = useCallback(async () => {
		try {
			const resp = await fetchInformationInsurance({
				authUid: userInformation.authUid,
				state: userInformation.state,
			}).unwrap();
			let resultInfo =
				resp &&
				[...resp].map((item: any) => {
					return item?.status || item.status.length === 0
						? { ...item, newStatus: `${t('myInsurance.active')}` }
						: { ...item, newStatus: `${t('myInsurance.inactive')}` };
				});

			dispatch(loaderActions.setLoading(false));
			setresultInformation(resultInfo);		
				
		} catch (error) {
			dispatch(loaderActions.setLoading(false));
		}
	}, [fetchInformationInsurance, userInformation, locationSelected, information])

	

	useEffect(() => {
		if (currentRoute == 'MyInsurance') {
			dispatch(loaderActions.setLoading(true));
			setTimeout(() => {
				handlerData()
			}, 1000)
		};
	}, [currentRoute]);

	const button: ButtonOption[] = [
		{
			name: '',
			onSubmit: () => { },
		},
	];
	


	  
	return (
		<>
			{resultInformation && (
				<>
					<View style={{ marginTop: 22 }} />
					<List
						data={resultInformation}
						cardLabels={information}
						typeBody={'insurance'}
						titleCard={''}
						button={button}
					/>
					<View style={{ marginBottom: 60 }}/>
				</>
			)}
		</>
	);
};
