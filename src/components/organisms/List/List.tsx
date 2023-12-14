import React, { useMemo } from 'react';
import { View, Linking, Text } from 'react-native';
import Row from 'src/components/atoms/Row/Row';
import { CardList } from 'src/components/molecules/Card/CardList/CardList';
import NoResults from 'src/components/molecules/NoResults/NoResults';
import { ListProps } from './List.types';
import { mappingCardList } from './List.utils';
import IconFlask from 'icons/flaskIcon.svg';
import IconFolder from 'icons/SyringeD.svg';
import XRay from 'icons/x-ray.svg';
import Capsules from 'icons/Capsules.svg';
import IconHeart from 'icons/Heart.svg';
import { FlashList } from '@shopify/flash-list';
import IconCheck from 'icons/ShieldCheckIcon.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import appConfig from 'config/index';
import i18n from 'i18n/i18n';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import IconFile from 'assets/icons/FileMedicalIcon.svg';
import theme from 'ui-core/utils/theme';
import IconFileOpen from 'icons/folder-open.svg';
import moment from 'moment';
import { isIphone } from 'src/utils/devices';
import { userActions } from 'adapter/user/userSlice';
import { CardListUpcoming } from 'src/components/molecules/Card/CardListUpcoming/CardListUpcoming';

export const List: React.FC<ListProps> = (props) => {
	const {
		data,
		titleCard,
		cardLabels,
		typeBody,
		button,
		totalData,
		iconWhenNoResults,
		paginator,
	} = props;
	const { navigate } = useNavigation();
	const { t } = useTranslation();
	const lang = t('general.locale') == 'es' ? 'es' : 'en';
	moment.locale(lang);
	const { isFilter } = useAppSelector(userSelectors.selectIsFilter);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	const dispatch = useAppDispatch();

	const titleCard2 = (information: any) => {
		return {
			nameCard: information.itemName,
			iconCard:
				information.type == 'LAB' ? (
					<IconFlask style={{ marginRight: 3 }} />
				) : (
					<XRay style={{ marginRight: 3 }} />
				),
		};
	};

	const cardTitle3 = (information: any) => {
		return {
			nameCard: information.medicationName,
			iconCard: <Capsules style={{ marginRight: 3 }} />,
		};
	};

	const registerTitles = (information: any) => {
		return {
			nameCard: information.appointmentProvider,
			iconCard: <IconFileOpen style={{ marginRight: 2 }} />,
		};
	};

	const titleInsurance = (name: string) => {
		return {
			nameCard: name,
			iconCard: <IconCheck style={{ margin: 2 }} />,
		};
	};

	const referalsTitle = (name: string) => {
		return {
			nameCard: name,
			iconCard: <IconFile style={{ margin: 2 }} />,
		};
	};

	const generalTittle = (module: string, item: any) => {
		switch (module) {
			case 'upcoming':
				return titleCardUpcoming(item?.visitType);
			case 'referals':
				return referalsTitle(item.speciality);
			case 'referralsDetails':
				return referalsTitle(item.speciality);
			case 'insurance':
				return titleInsurance(item?.insuranceName);
			case 'register':
				return registerTitles(item);
			default:
				return titleCard2(item);
		}
	};

	const generalTittle2 = (module: string, item: any) => {
		switch (module) {
			case 'medication':
				return cardTitle3(item);
			case 'inmunization':
				return titleCardimmunizations(item?.vaccineName);
			case 'register':
				return registerTitles(item);
			default:
				return titleCard;
		}
	};

	const onSubmitBoton = () => {
		Linking.canOpenURL('floridablueapp://')
			.then((supported) => {
				if (!supported) {
					if (isIphone()) {
						Linking.openURL(appConfig['FB_INSURANCE_URL_IOS']);
					} else {
						Linking.openURL(appConfig['FB_INSURANCE_URL_ANDROID']);
					}
				} else {
					return Linking.openURL('floridablueapp://');
				}
			})
			.catch((err) => console.error('An error occurred', err));
	};

	const validateIsPrimary = (item: any) => {
		const action = {
			patientId: item?.patientId,
			isFB: item?.isFb,
			isPrimary: item?.isPrimary,
			state: item?.status,
			isSc: item?.isSc,
			isTn: item?.isTn,
			insuranceId: item?.insuranceId,
			insuranceName: item?.insuranceName,
		};
		dispatch(userActions.setDataInformationInsurance(action));
	};

	const buttonInsurance = (item: any) => {
		if (item.isFb) {
			return [
				{
					name: `${t('myInsurance.update')}`,
					onSubmit: () => {
						validateIsPrimary(item);
						navigate('UpdateMyInsurance');
					},
					textStyle: { width: 400 },
				},
				{
					name: `${t('myInsurance.go')}`,
					onSubmit: () => onSubmitBoton(),
					textStyle: { width: 400 },
					variant: 'Outlined',
				},
			];
		} else {
			return [
				{
					name: `${t('myInsurance.update')}`,
					onSubmit: () => {
						validateIsPrimary(item);
						navigate('UpdateMyInsurance');
					},
					textStyle: { width: 400 },
				},
			];
		}
	};

	const renderItemUpcoming = ({ item, index }: { item: any; index: number }) => {
		return (
			<Row
				key={`dataRef-${index}`}
				style={data.length == index + 1 ? { marginBottom: 30 } : {}}
			>
				<CardListUpcoming
					key={index}
					index={index}
					minutes={new Date().getMinutes()}
					titleCard={generalTittle(typeBody, item)}
					labels={mappingCardList(typeBody, cardLabels, item, lang, locationSelected)}
					button={button ?? []}
					itemObject={item}
					showUrl={item.url}
				/>
				<>{data.length == index + 1 ? paginator : <></>}</>
			</Row>
		);
	};

	const renderItem = ({ item, index }: { item: any; index: number }) => {
		return (
			<Row
				key={`dataRef-${index}`}
				style={data.length == index + 1 ? { marginBottom: 30 } : {}}
			>
				{(button && typeBody !== 'upcoming') ||
				(button && typeBody === 'insurance') ||
				typeBody === 'referals' ||
				(button && typeBody === 'upcoming' && item.status === 'ACCEPTED') ? (
					<CardList
						key={index}
						typeBody={typeBody}
						titleCard={generalTittle(typeBody, item)}
						labels={mappingCardList(typeBody, cardLabels, item, lang, locationSelected)}
						button={typeBody === 'insurance' ? buttonInsurance(item) : button}
						itemObject={item}
						showUrl={item.url}
					/>
				) : (
					<CardList
						titleCard={
							typeBody === 'upcoming' || typeBody === 'previus'
								? titleCardUpcoming(item?.visitType)
								: generalTittle2(typeBody, item)
						}
						labels={mappingCardList(typeBody, cardLabels, item, lang)}
						itemObject={item}
						showUrl={item.url}
						typeBody={typeBody}
					/>
				)}
				<>{data.length == index + 1 ? paginator : <></>}</>
			</Row>
		);
	};

	const emptyElement = () => {
		const defaultData = { nameImg: 'NoResult', subtitle: '' };
		return (
			<View>
				{totalData == 0 && !isFilter ? (
					<NoResults iconWhenNoResults={iconWhenNoResults ?? defaultData} />
				) : (
					<NoResults iconWhenNoResults={defaultData} />
				)}
			</View>
		);
	};

	const titleCardUpcoming = (name: string) => {
		return {
			nameCard: name,
			iconCard: <IconHeart style={{ margin: 2 }} />,
		};
	};

	const titleCardimmunizations = (name: string) => {
		return {
			nameCard: name,
			iconCard: <IconFolder style={{ margin: 2 }} />,
		};
	};

	return (
		<View style={{ flex: 1, flexDirection: 'row' }}>
			<Row>
				{data.length != 0 ? (
					<FlashList
						data={data}
						renderItem={typeBody === 'upcoming' ? renderItemUpcoming : renderItem}
						estimatedItemSize={450}
					/>
				) : (
					<View style={{ justifyContent: 'center', alignItems: 'center' }}>
						{emptyElement()}
					</View>
				)}
			</Row>
		</View>
	);
};
