import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, Platform } from 'react-native';
import componentStyles from './UnderstandingYourAnxiety.style';
import useStyles from 'hooks/useStyles';
import Button from 'src/components/atoms/Button/Button';
import moment from 'moment';
import Row from 'src/components/atoms/Row/Row';
import CardDate from 'src/components/molecules/CardDate/CardDate';
import Plus from 'icons/MentalHealthIcons/SelfManagementTools/plus.svg';
import EmptyLabs from 'icons/MentalHealthIcons/SelfManagementTools/Empty_labs.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';


interface IDataUnderstandingYourAnxiety {
	data: object;
	thinking: any[];
}

export const UnderstandingYourAnxietyList: React.FC<IDataUnderstandingYourAnxiety> = (props) => {
	const { data, thinking } = props;
	const [ageData, setData] = useState<any>([])
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const navigation: any = useNavigation();

	const findTitleThinking = (uuid: string, lenguage: 'es' | 'en') => {
		try {
			const leeter = lenguage == 'es' ? 'Es' : 'En'
			const searchResult = thinking?.find((e) => e?.uuid == uuid)?.[`content${leeter}`]
			return searchResult ? searchResult : uuid
		} catch (error) {
			return uuid
		}
	}

	useEffect(() => {
		if (data) {
			setData(data.anxietyRegistersDtoList);
		}
	}, [data]);


	const renderItem = ({ item, index }: { item: any; index: number }) => {
		return (
			<Row key={`ua-${index}`} style={[ageData.length == (index + 1) && { marginBottom: 290 }, index == 0 && { marginTop: 35 }]}>
				<CardDate
					data={{ date: item.dateTime, label: findTitleThinking(item.thinking, t('general.locale')) }}
					onPress={() => navigation.navigate('ListAnxiety', { data: item, thinking })}
				/>
			</Row>
		);
	};

	return (
		<View style={{ height: '114%' }}>
			{ageData?.length > 0 ? <FlashList data={ageData} renderItem={renderItem} estimatedItemSize={3} /> :
				<View style={styles.void}>
					<EmptyLabs />
					<Text style={styles.voidText}>{t('myHealth.screenUnderstandingYourAnxiety.titleEmpty')}</Text>
				</View>
			}
			<LinearGradient
				colors={['transparent', Platform.OS === 'ios' ? '' : 'rgba(241,241,241, 0.95)']}
				locations={[0, 0.3]}
				style={styles.linearGradient}>
				<View style={{ width: 215, alignSelf: 'center' }}>
					<Button
						title={t('myHealth.screenUnderstandingYourAnxiety.btnCreate')}
						icon={<Plus />}
						textStyle={{ paddingLeft: 9 }}
						style={{ paddingLeft: 23 }}
						onPress={() => navigation.navigate('EntryScreen')}
					/>
				</View>
			</LinearGradient>
		</View>
	);
};
