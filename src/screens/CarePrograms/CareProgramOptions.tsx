import React, { useEffect, useMemo, useState } from 'react';
import Menu2Icon from 'icons/Care.svg';
import { userSelectors } from 'adapter/user/userSelectors';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { ScrollView, View } from 'react-native';
import Card from 'src/components/molecules/Card/Card';
import Row from 'src/components/atoms/Row/Row';
import ScheduleCode, { diferenceTimeByZone } from '../GetCareNow/Payment/configAvailability';
import { userActions } from 'adapter/user/userSlice';

export const CareProgramOption = () => {
	const { t } = useTranslation();
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const [isAvailable, setIsAvailable] = useState(true);
	const { previousRoute } = useAppSelector(userSelectors.selectRoute);
	const user = useAppSelector(userSelectors.selectUserInfo);
	const { locationSelected } = useAppSelector(userSelectors.selectIsLoggedIn);

	useEffect(() => {
		const interval = setInterval(() => {
			const originalDate = new Date();
			const converted = originalDate.toISOString();
			const timeConverted = converted.split('T')[1].split(':');
			const newDate: Date = new Date(
				`${converted.split('T')[0]}T${timeConverted[0]}:${timeConverted[1]}:${
					timeConverted[2]
				}`,
			);
			newDate.setHours(
				newDate.getHours() +
					(locationSelected
						? diferenceTimeByZone.find((i) => i.state === locationSelected ?? '')!
								.diference
						: 0),
			);
			const cTime: number = +newDate.toISOString().split('T')[1].split(':')[0];
			if (
				newDate.getDay() !== ScheduleCode.startDay &&
				newDate.getDay() !== ScheduleCode.endDay
			) {
				if (cTime >= ScheduleCode.startTime && cTime < ScheduleCode.endTime) {
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

	return (
		<ScrollView>
			<View style={{ flex: 1, padding: 10, marginBottom: 50 }}>
				<Card
					isCarePrograms
					isAvailable={isAvailable}
					style={{ height: 166, justifyContent: 'center' }}
					icon={<Menu2Icon />}
					title={t('care.chatea')}
					subtitle={t('care.chateSub')}
					onPress={() => {
						//	navigation.navigate('ChatSanitas', { type: 'educator', 'prevRoute': previousRoute });
						dispatch(
							userActions.setStateVewChat({
								queue: 'educator',
								stateView: true,
							}),
						);
					}}
				/>
			</View>
		</ScrollView>
	);
};
