import React, { useCallback, useEffect, useState } from 'react';
import { Linking, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import Row from '../../components/atoms/Row/Row';
import Button from 'src/components/atoms/Button/Button';
import { CardList } from 'src/components/molecules/Card/CardList/CardList';
import { ButtonOption, InfLabels } from 'src/components/molecules/Card/CardList/CardList.type';
import { PersonalDataDTO, RegistriesCredentialsDTO } from 'infrastructure/keraltyApi/models/ecw';
import IconPersonDetails from 'icons/PersonalInfoIcons/PersonDetails.svg';
import IconUserEmergency from 'icons/PersonalInfoIcons/userEmergency.svg';

import IconUser from 'icons/PersonalInfoIcons/user.svg';
import IconBirthday from 'icons/PersonalInfoIcons/birthday-cake.svg';
import IconSex from 'icons/PersonalInfoIcons/sex.svg';
import IconMarital from 'icons/PersonalInfoIcons/marital.svg';
import IconMail from 'icons/PersonalInfoIcons/mail.svg';
import IconPhoneRotary from 'icons/PersonalInfoIcons/phone-rotary.svg';
import IconLocationDot from 'icons/PersonalInfoIcons/location-dot.svg';
import IconMapMarkedAlt from 'icons/PersonalInfoIcons/map-marked-alt.svg';
import MobileAlt from 'icons/PersonalInfoIcons/mobile-alt.svg';
import IconCity from 'icons/PersonalInfoIcons/city.svg';
import IconFlagUsa from 'icons/PersonalInfoIcons/flag-usa.svg';
import IconPeopleArrows from 'icons/PersonalInfoIcons/people-arrows.svg';
import IconLanguage from 'icons/PersonalInfoIcons/language.svg';
import IconJob from 'icons/PersonalInfoIcons/suitcase.svg';

import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import EcwService from 'adapter/api/ecwService';
import { userSelectors } from 'adapter/user/userSelectors';
import { UserState } from 'adapter/user/userState';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import ModalDeleteAccount from './ModalDeleteAccount/ModalDeleteAccount';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { ScrollView } from '@nandorojo/anchor';
import UsersService from 'adapter/api/usersService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import { userActions } from 'adapter/user/userSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import useConsents, { getLabelByValue } from 'hooks/useConsents';

export const PersonalInformationList = () => {
	const {
		gendersOptions,
		sexualOrientationOptions,
		ethnicityOptions,
		raceOptions,
		preferedLanguageOptions,
		employmentStatusOptions,
	} = useConsents();

	const { ecwId, authUid } = useAppSelector(userSelectors.selectUser);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

	const userInfo = useAppSelector(userSelectors.selectUser);
	const navigation: any = useNavigation();
	const { t } = useTranslation();
	const [personalData, setPersonalData] = useState<any>(userInfo);
	const [isLoading, setIsLoading] = useState(false);
	const { currentRoute } = useAppSelector(userSelectors.selectRoute);
	const { data: emergencyData, isSuccess: succesEmergency } =
		UsersService.useGetEmergencyContactDataQuery({id: authUid, state: locationSelected });
	const dispatch = useAppDispatch();

	const [listCurrentMarital, setListCurrentStatus] = useState([]);
	const [listMaritalStatusEN, setListMaritalStatusEN] = useState([]);
	const [maritalStatus, setMaritalStatus] = useState('');
	const { setAlertErrorMessage } = useErrorAlert();

	const listGender = [
		{ key: 1, label: t('sex.F'), value: 'F' },
		{ key: 2, label: t('sex.M'), value: 'M' },
		{ key: 3, label: t('sex.D'), value: 'U' },
	];
	const [getMaritalStatus] = EcwService.useMaritalStatusMutation();
	const [getPersonalInfo] = UsersService.useGetPersonalInfoMutation();

	useEffect(() => {
		console.log('Emergency Data updated', emergencyData);
	}, [emergencyData]);

	const getMaritalStatusList = useCallback(async () => {
		try {
			setIsLoading(true);
			const respMarital = await getMaritalStatus(t('general.locale')).unwrap();

			if (respMarital[t('general.locale')]) {
				setListMaritalStatusEN(respMarital?.en);
				setListCurrentStatus(respMarital[t('general.locale')]);
			}
			const resp = await getPersonalInfo({
				authUid: userInfo.authUid,
				state: userInfo.state,
			}).unwrap();

			let maritalStatus = resp.maritalStatus;
			const index = respMarital?.en?.findIndex((v: any) => v == maritalStatus);
			if (index >= 0 && respMarital)
				setMaritalStatus(respMarital[t('general.locale')][index]);
			if (resp) {
				setPersonalData(resp);
			}

			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setAlertErrorMessage(t(`errors.code${error}`));
		}
	}, [getMaritalStatus, getPersonalInfo, userInfo, currentRoute]);

	useEffect(() => {
		if (currentRoute == 'PersonalInformationScreen') getMaritalStatusList();
	}, [currentRoute]);

	const cardTitle = {
		nameCard: `${t('personalInformation.personalDetails')}`,
		iconCard: <IconPersonDetails style={{ margin: 2 }} />,
	};
	const cardTitleEmergency = {
		nameCard: `${t('personalInformation.emergency')}`,
		iconCard: <IconUserEmergency style={{ margin: 2 }} />,
	};

	let PersonalInformation: InfLabels[] = [];
	let EmergencyInformation: InfLabels[] = [];
	let showEmergency = false;

	if (personalData) {
		PersonalInformation = [
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.first')}`,
				subTitle: personalData?.firstName,
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.last')}`,
				subTitle: personalData?.lastName,
				doubleLine: false,
			},
			{
				iconLabel: <IconBirthday style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.date')}`,
				subTitle:
					personalData?.birthdate || personalData?.dateOfBirth
						? moment(personalData?.birthdate ?? personalData?.dateOfBirth).format(
								FORMATS.date,
						  )
						: '',
				doubleLine: false,
			},
			{
				iconLabel: <IconSex style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.gender')}`,
				subTitle: personalData?.sex
					? listGender.find((v) => v.value === personalData?.sex.toUpperCase().charAt(0))
							?.label
					: '',
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.genderIdentity')}`,
				subTitle:
					(personalData?.genderIdentity?.description
						? personalData?.genderIdentity?.description
						: getLabelByValue(gendersOptions, personalData?.genderIdentity?.id)) ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.orientation')}`,
				subTitle:
					(personalData?.sexualOrientation?.description
						? personalData?.sexualOrientation?.description
						: getLabelByValue(
								sexualOrientationOptions,
								personalData?.sexualOrientation?.id,
						  )) ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.ethnicity')}`,
				subTitle:
					(personalData?.ethnicity?.description
						? personalData?.ethnicity?.description
						: getLabelByValue(ethnicityOptions, personalData?.ethnicity?.id)) ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.race')}`,
				subTitle:
					(personalData?.race?.description
						? personalData?.race?.description
						: getLabelByValue(raceOptions, personalData?.race?.id)) ?? '',

				doubleLine: false,
			},
			{
				iconLabel: <IconLanguage style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.language')}`,
				subTitle:
					(personalData?.preferedLanguage?.description
						? personalData?.preferedLanguage?.description
						: getLabelByValue(
								preferedLanguageOptions,
								personalData?.preferedLanguage?.id,
						  )) ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconMarital style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.marital')}`,
				subTitle: maritalStatus,
				doubleLine: false,
			},
			{
				iconLabel: <IconJob style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.statusEmployment')}`,
				subTitle:
					(personalData?.employmentStatus?.description
						? personalData?.employmentStatus?.description
						: getLabelByValue(
								employmentStatusOptions,
								personalData?.employmentStatus?.id,
						  )) ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconMail style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.email')}`,
				subTitle: personalData?.email ?? '',
				doubleLine: false,
			},

			{
				iconLabel: <MobileAlt style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.mobileHome')}`,
				subTitle: personalData?.mobile ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconPhoneRotary style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.homePhone')}`,
				subTitle: personalData?.homePhone ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconLocationDot style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.address')}`,
				subTitle: personalData?.address1 ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconMapMarkedAlt style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.zip')}`,
				subTitle: personalData?.zipCode ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconCity style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.city')}`,
				subTitle: personalData?.city ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconFlagUsa style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.state')}`,
				subTitle: personalData?.state ?? '',
				doubleLine: false,
			},
		];
	}

	if (succesEmergency) {
		EmergencyInformation = [
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.first')}`,
				subTitle: emergencyData?.firstName ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconUser style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.last')}`,
				subTitle: emergencyData?.lastName ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconPeopleArrows style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.relation')}`,
				subTitle: emergencyData?.relation ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconLocationDot style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.address1')}`,
				subTitle: emergencyData?.address1 ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconLocationDot style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.address2')}`,
				subTitle: emergencyData?.address2 ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconCity style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.city')}`,
				subTitle: emergencyData?.city ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconFlagUsa style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.state')}`,
				subTitle: emergencyData?.state ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconMapMarkedAlt style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.zip')}`,
				subTitle: emergencyData?.zipCode ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <MobileAlt style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.mobile')}`,
				subTitle: emergencyData?.cellPhone ?? '',
				doubleLine: false,
			},
			{
				iconLabel: <IconPhoneRotary style={{ marginLeft: 20, marginRight: 10 }} />,
				title: `${t('personalInformation.work')}`,
				subTitle: emergencyData?.workPhone ?? '',
				doubleLine: false,
			},
		];
		showEmergency = true;
	}

	const onSubmitDelete = () => {
		navigation.navigate('DeleteAccount');
	};

	useEffect(() => {
		dispatch(
			userActions.setEditAccountdata({
				personalData,
				listCurrentMarital,
				listMaritalStatusEN,
			}),
		);
	}, [personalData, listCurrentMarital, listMaritalStatusEN]);

	const onSubmitEdit = () => {
		navigation.navigate('EditAccountScreen');
	};

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			{personalData && (
				<CardList key={'per-Data'} titleCard={cardTitle} labels={PersonalInformation} />
			)}
			{emergencyData && personalData ? (
				<CardList
					key={'ecy-Data'}
					titleCard={cardTitleEmergency}
					labels={EmergencyInformation}
				/>
			) : (
				<></>
			)}
			{personalData && !isLoading && (
				<Button
					accessibilityRole="link"
					onPress={() => onSubmitEdit()}
					style={{ marginBottom: 14, justifyContent: 'flex-start' }}
					textStyle={{ fontSize: 14, fontFamily: 'proxima-bold', color: '#0069A7' }}
					title={t('personalInformation.edit')}
					variant="Underline"
				/>
			)}
			<Button
				accessibilityRole="link"
				onPress={() => onSubmitDelete()}
				style={{ marginBottom: 100, justifyContent: 'flex-start' }}
				textStyle={{ fontSize: 14, fontFamily: 'proxima-bold', color: '#B50303' }}
				title={t('personalInformation.delete')}
				variant="Underline"
			/>
		</ScrollView>
	);
};
