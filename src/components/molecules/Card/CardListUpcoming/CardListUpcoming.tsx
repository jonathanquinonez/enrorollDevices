import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Labels } from 'src/components/atoms/Label/Labels';
import Row from 'src/components/atoms/Row/Row';
import Button from 'src/components/atoms/Button/Button';
import {
	ButtonActivation,
	CardList as Props,
	calculateTimeDifference,
	isCurrentDate,
	visitTypes,
} from './CardListUpcoming.type';
import componentStyles from './CardListUpcoming.styles';
import useStyles from 'hooks/useStyles';
import { windowDimentions } from 'ui-core/utils/globalStyles';
import { useTranslation } from 'react-i18next';
import IconCalendar from 'icons/CalendarDayIcon.svg';
import IconUser from 'icons/UserTagIcon.svg';
import IconCalendarCheck from 'icons/DocIcon.svg';

import IconLocation from 'icons/MapMarkerAlt.svg';
import IconClock from 'icons/ClockIcon.svg';
import IconBuilding from 'icons/Building.svg';
import IconStatus from 'icons/ClipboardUserAlt.svg';
import IconConfirm from 'icons/Confirm.svg';
import IconSucces from 'icons/Success.svg';
import Clip from 'icons/Clip.svg';
import moment from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { Platform } from 'react-native';


export const CardListUpcoming: React.FC<Props> = (props) => {
	const { button, labels, styleContainer, titleCard, itemObject, showUrl, index } = props;
	const { nameCard, iconCard } = titleCard;
	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();

	const [generalText, setgeneralText] = useState(<></>);
	const [goToAppointment, setgoToAppointment] = useState<any>(undefined);
	const [cancelButton, setcancelButton] = useState<any>(undefined);
	const [disableCancelButton, setdisableCancelButton] = useState<any>(undefined);
	const timeAvailable = (
		<Text style={styles.textAbailable} maxFontSizeMultiplier={1.3}>
			{t('appoiment.timeAvailable')}
		</Text>
	);

	const timeStart = calculateTimeDifference(itemObject.startTime, itemObject?.date);
	const [currentTime, setCurrentTime] = useState<number>(timeStart);

	const startTime = moment(itemObject.date).format(FORMATS.date2);
	const date = itemObject.startTime;
	const utcDate = `${startTime}T${date}:00Z`;
	const newDate: Date = new Date(utcDate);
	const capitalize = (word: string) => {
		return word[0].toUpperCase() + word.slice(1);
	};

	const information = [
		{
			id: 1, //Date
			iconLabel: <IconCalendar />,
			title: `${t('appoiment.dateP')}`, // Date
			subTitle: capitalize(
				moment(newDate).format(
					t('general.locale') == 'es' ? 'DD MMMM, YYYY' : 'MMMM D, YYYY',
				),
			),
			doubleLine: true,
		},
		{
			id: 2, //Time
			iconLabel: <IconClock />,
			title: `${t('appoiment.time')}`,
			subTitle: moment(newDate, 'hh:mm:ss').format('hh:mm A'),
			doubleLine: true,
		},
		{
			id: 3, //Name
			iconLabel: <IconLocation />,
			title: `${t('appoiment.locationP')}`, //Location locationP
			subTitle: itemObject.name,
			doubleLine: true,
		},
		{
			id: 4,
			iconLabel: <IconCalendarCheck />, //Provider
			title: `${t('appoiment.providerU')}`,
			subTitle: `${itemObject?.ufName ?? ''} ${itemObject?.ulName ?? ''}`,
			doubleLine: true,
		},
		{
			id: 6,
			iconLabel: <IconStatus />, //State
			title: `${t('appoiment.statusU')}`,
			subTitle: itemObject.newStatus,
			doubleLine: true,
		},
	];

	const buttonActivation = (value: ButtonActivation) => {
		setgeneralText(value.general_text);
		setgoToAppointment(value.go_to_appointment);
		setcancelButton(value.cancel_button);
		setdisableCancelButton(value.disable_cancelButton);
	};

	useEffect(() => {
		const time = calculateTimeDifference(itemObject.startTime, itemObject?.date);
		const isDay = isCurrentDate(itemObject.startTime, itemObject?.date);
		switch (true) {
			case !isDay || time > 15:
				buttonActivation({
					general_text: timeAvailable,
					go_to_appointment: undefined,
					cancel_button: button[1],
					disable_cancelButton: undefined,
				});
				break;
			case time <= 15 && time >= -15:
				buttonActivation({
					general_text: <></>,
					go_to_appointment: button[0],
					cancel_button: button[1],
					disable_cancelButton: undefined,
				});
				break;
			case time < -15:
				buttonActivation({
					general_text: <></>,
					go_to_appointment: button[0],
					cancel_button: undefined,
					disable_cancelButton: button[2],
				});
				break;
		}
		const segundosRestantes = 60 - new Date().getSeconds();
		const intervalId = setInterval(() => {
			setCurrentTime(currentTime - 1);
		}, segundosRestantes * 1000); // Update every 1 minute
		return () => clearInterval(intervalId);
	}, [currentTime, itemObject]);

	return (
		<View style={{ flex: 1 }}>
			<Row style={styles.row}>
				<View style={{ marginLeft: 70, paddingVertical: 20 }}>
					<View style={[styles.container, styleContainer]}>
						{React.cloneElement(iconCard)}
						<Text style={styles.title}> {nameCard}</Text>
					</View>
					<View
						style={{
							marginTop: -15,
							justifyContent: 'center',
							width: windowDimentions.width * 0.95,
						}}
					>
						{information?.map((item, i) => (
							<View
								style={[
									{
										width: '90%',
										flexDirection: 'row',
										alignItems: 'flex-start',
										padding: 4,
									},
								]}
							>
								{item.title ? (
									<>
										<View
											style={{ width: '100%', flexDirection: 'row', flex: 1 }}
										>
											<View style={[styles.viewElement, {}]}>
												{React.cloneElement(item.iconLabel)}
											</View>

											<View
												style={{
													flexDirection: 'row',
													marginTop: Platform.OS === 'ios' ? 5 : 4,
													flex: 1,
													height: 15,
												}}
											>
												<Text
													style={[
														styles.title1,
													]}
													maxFontSizeMultiplier={1.3}
												>
													{item.title ? item.title + ':' : ''}
												</Text>

												<Text
													numberOfLines={4}
													style={[
														styles.subTitle1,
														{
															marginTop: Platform.OS === 'ios' ? -1.5 : 0,
														},
													]}
													maxFontSizeMultiplier={1.3}
												>
													{item.subTitle}
												</Text>
											</View>
										</View>
									</>
								) : (
									<>
										<View style={{ width: '100%', flexDirection: 'row' }}>
											<View style={styles.viewElement}>
												{React.cloneElement(item.iconLabel)}
											</View>
											<Text
												numberOfLines={4}
												style={styles.subTitle1}
												maxFontSizeMultiplier={1.3}
											>
												{item.subTitle}
											</Text>
										</View>
									</>
								)}
							</View>
						))}
					</View>
					{itemObject?.status == 'ACCEPTED' &&
						visitTypes.includes(itemObject?.visitType.toLowerCase()) &&
						generalText}
					{itemObject?.status == 'ACCEPTED' &&
						visitTypes.includes(itemObject?.visitType.toLowerCase()) &&
						goToAppointment && (
							<View style={styles.view}>
								<Button
									title={goToAppointment?.name}
									icon={
										goToAppointment?.isNeedIcon ? goToAppointment?.icon : <></>
									}
									onPress={() => {
										goToAppointment?.onSubmit(itemObject);
									}}
									textStyle={[goToAppointment?.textStyle]}
									style={[styles.button, goToAppointment?.styleButton]}
									// variant={goToAppointment?.variant}
								/>
							</View>
						)}
					{itemObject?.status == 'ACCEPTED' && cancelButton && (
						<View style={styles.view}>
							<Button
								title={cancelButton?.name}
								icon={cancelButton?.isNeedIcon ? cancelButton?.icon : <></>}
								onPress={() => {
									cancelButton?.onSubmit(itemObject);
								}}
								textStyle={[cancelButton?.textStyle]}
								style={[styles.button, cancelButton?.styleButton]}
								variant={'Underline'}
							/>
						</View>
					)}
					{itemObject?.status == 'ACCEPTED' && disableCancelButton && (
						<View style={styles.view}>
							<Button
								disabled
								title={disableCancelButton?.name}
								icon={
									disableCancelButton?.isNeedIcon ? (
										disableCancelButton?.icon
									) : (
										<></>
									)
								}
								onPress={() => {}}
								textStyle={[disableCancelButton?.textStyle, { color: '#757575' }]}
								style={[styles.button, disableCancelButton?.styleButton]}
								variant={'Text'}
							/>
						</View>
					)}
				</View>
			</Row>
		</View>
	);
};
