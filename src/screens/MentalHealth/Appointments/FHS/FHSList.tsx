import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Image, Linking } from 'react-native';
import Row from 'src/components/atoms/Row/Row';
import Card from 'src/components/molecules/Card/Card';
import { useNavigation } from '@react-navigation/native';
import ScheduleCode, { diferenceTimeByZone } from 'src/screens/GetCareNow/Payment/configAvailability';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';

export const FHSList: React.FC = (props) => {
	const navigation = useNavigation();
	const { t } = useTranslation();
	const [isAvailable, setIsAvailable] = useState(true)

	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);
	useEffect(() => {
		const interval = setInterval(() => {
			const originalDate = new Date();
			const converted = originalDate.toISOString();
			const timeConverted = converted.split('T')[1].split(':');
			const newDate: Date = new Date(`${converted.split('T')[0]}T${timeConverted[0]}:${timeConverted[1]}:${timeConverted[2]}`
			);
			newDate.setHours(newDate.getHours() + (locationSelected ? diferenceTimeByZone.find((i) => i.state === locationSelected ?? '')!.diference : 0));
			const cTime: number = +newDate.toISOString().split('T')[1].split(':')[0];
			if (newDate.getDay() !== ScheduleCode.startDay && newDate.getDay() !== ScheduleCode.endDay) {
				if (cTime >= ScheduleCode.startTime && cTime < ScheduleCode.endTimeFHS) {
					setIsAvailable(true);
				} else {
					setIsAvailable(false);
				}
			} else {
				setIsAvailable(false);
			}
		}, 60000); // Intervalo de 1 minuto en milisegundos

		return () => {
			clearInterval(interval); // Limpiar el intervalo cuando el componente se desmonte
		};
	}, [locationSelected]);

	const calltoSchedule = () => {
		Linking.openURL(`tel: 786-420-5924`)
	}

	const handleNextPage = () => {
		navigation.navigate("IndexFHSScreen");
	}

	return (
		<ScrollView>
			<View style={{ flex: 1, padding: 10, marginTop: 30 }}>
				<Row style={{ flexDirection: 'column' }}>
					<View style={{ marginVertical: 5 }} />
					<Card
						isCarePrograms={true}
						isAvailable={isAvailable}
						icon={<Image style={{ width: 46, height: 43, marginBottom: 15, marginTop: 14 }} source={require('assets/icons/MentalHealthIcons/Appointments/3.png')} />}
						title={t("myHealth.screenFloridaHealthcare.titleCardOne")}
						styleTitle={{ fontSize: 18 }}
						styleSub={{ fontSize: 12 }}
						subtitle={t("myHealth.screenFloridaHealthcare.subTitleCardOne")}
						onPress={isAvailable ? calltoSchedule : () => { null }}
					/>
					<View style={{ marginVertical: 5 }} />
					<Card icon={<Image style={{ width: 46, height: 46, marginBottom: 15 }} source={require('assets/icons/MentalHealthIcons/Appointments/4.png')} />}
						title={t("myHealth.screenFloridaHealthcare.titleCardTwo")}
						styleTitle={{ fontSize: 18 }}
						styleSub={{ fontSize: 12 }}
						subtitle={t("myHealth.screenFloridaHealthcare.subTitleCardTwo")}
						onPress={() => handleNextPage()}
					/>
					<View style={{ marginVertical: 5, marginBottom: 60 }} />
				</Row>
			</View>
		</ScrollView >
	);
};
