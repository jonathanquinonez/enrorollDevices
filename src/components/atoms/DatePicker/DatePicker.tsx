/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextStyle, StyleProp, Platform, Appearance } from 'react-native';
import moment, { Moment } from 'moment';
import 'moment/locale/es';
// Components
import Button from '../Button/Button';
import Day from './Day/Day';
import Header from './Header/Header';
import YearPicker from './YearPicker/YearPicker';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { DatePickerControllerProps, DatePickerProps as Props } from './DatePicker.types';
import componentStyles from './DatePicker.styles';
// Images
import CalendarInputIcon from 'icons/CalendarInputIcon.svg';
import ClockIcon from 'icons/ClockIcon.svg';
import { useTranslation } from 'react-i18next';
import { Controller } from 'react-hook-form';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

/**
 * Render a datePicker2.
 * @since 1.0.0
 */
const DatePicker2: React.FC<Props> = (props) => {
	const { startDate, endDate, onChange, onDone, minDate, maxDate, range, mode, initValueMayus } = props;
	const { presetButtons, value, initialValue, label, style, error, isControlled, labelStyle, editable = true } = props;

	//Mode Dark
	const colorScheme = Appearance.getColorScheme();

	// Hooks
	const { styles, colors } = useStyles(componentStyles);
	// Component states
	const { t, i18n } = useTranslation();

	//calendar language
	const lng: string = i18n.language.slice(0, 2);
	if (lng != 'es') moment.locale('en');

	const [modalVisible, setModalVisible] = useState(false);
	const [weeks, setWeeks] = useState<React.ReactElement[]>([]);
	const [selecting, setSelecting] = useState(false);
	const [dayHeaders, setDayHeaders] = useState<React.ReactElement[]>([]);
	const [showYearPicker, setShowYearPicker] = useState(false);
	const [showYearPickerType, setShowYearPickerType] = useState<'Years' | 'Months'>('Months');
	const [displayedDate, setDisplayedDate] = useState(initialValue || moment());
	const [date, setDate] = useState(initialValue);

	const setCurrentDate = (event: DateTimePickerEvent, date: Date | undefined | string) => {
		const { type, nativeEvent: { timestamp } } = event;
		if (type == 'set') handleDoneButton(moment(date))
	};

	/**
	 * checks if the day should be selected
	 * @since 1.0.0
	 */
	const selected = useCallback(
		(pDate: any, pStartDate: any, pEndDate: any, __date: any) =>
			(pStartDate && pEndDate && pDate.isBetween(pStartDate, pEndDate, null, '[]')) ||
			(pStartDate && pDate.isSame(pStartDate, 'day')) ||
			(__date && pDate.isSame(__date, 'day')),
		[],
	);

	/**
	 * Checks if the day should be disabled
	 * @since 1.0.0
	 */
	const disabled = useCallback(
		(pDate: any, pMinDate: any, pMaxDate: any) =>
			(pMinDate && pDate.isBefore(pMinDate, 'day')) ||
			(pMaxDate && pDate.isAfter(pMaxDate, 'day')),
		[],
	);

	/**
	 * Sets the current selected date to the one pressed on the Day component
	 * and sets the range of dates if required
	 * @since
	 */
	const select = useCallback(
		(day: number, type?: 'prev' | 'next') => {
			let currentDate = moment(displayedDate);
			if (type === 'prev') {
				currentDate = moment(displayedDate.clone().subtract(1, 'month'));
				setDisplayedDate(currentDate);
			} else if (type === 'next') {
				currentDate = moment(displayedDate.clone().add(1, 'month'));
				setDisplayedDate(currentDate);
			}
			currentDate.set('date', day);
			if (range) {
				if (selecting) {
					if (currentDate.isBefore(startDate, 'day')) {
						setSelecting(true);
						setDate(undefined);
						if (!onChange) return;
						onChange({
							date: undefined,
							startDate: currentDate,
							endDate: undefined,
							displayedDate: displayedDate.clone(),
						});
					} else {
						setSelecting(!selecting);
						setDate(undefined);
						if (!onChange) return;
						onChange({
							date: undefined,
							startDate,
							endDate: currentDate,
							displayedDate: displayedDate.clone(),
						});
					}
				} else {
					setSelecting(!selecting);
					setDate(undefined);
					if (!onChange) return;
					onChange({
						date: undefined,
						endDate: undefined,
						startDate: currentDate,
						displayedDate: displayedDate.clone(),
					});
				}
			} else {
				setDate(currentDate.clone());
				if (!onChange) return;
				onChange({
					date: currentDate,
					startDate: undefined,
					endDate: undefined,
					displayedDate: displayedDate.clone(),
				});
			}
		},
		[moment, displayedDate, onChange, range, selecting, startDate],
	);

	/**
	 * Call the onDone method and closes the modal
	 * @since 1.0.0
	 */
	const handleDoneButton = (date: moment.Moment) => {
		setModalVisible(false);
		if (!onDone) return;
		onDone({
			date: date,
			startDate: undefined,
			endDate: undefined,
			displayedDate: date,
		});
	};

	/**
	 * Gets the input value
	 * @since 1.0.0
	 * @returns Date formatted to show in the input.
	 */
	const getInputValue = () => {
		if (value && mode === 'time') {
			return value.format('h:mm a')
		}
		if (!value && mode === 'time') {
			return `${t('accessibility.time')}`
		}
		if (value && mode !== 'time') {
			return value.format('MM/DD/YYYY');
		}
		if (date && !isControlled && mode !== 'time') {
			return date.format('MM/DD/YYYY');
		}
		if (initValueMayus) {
			return `${t('accessibility.date')}`;
		}

		return `${t('accessibility.date')}`;
	};

	/**
	 * Opens the date picker and sets the date
	 * @since 1.0.0
	 */
	const openModal = () => {
		if (value) {
			setDate(value);
		}
		setModalVisible(true);
	};

	useEffect(() => {
		const populateHeaders = () => {
			const headerListDays = [];
			for (let i = 0; i <= 6; i += 1) {
				const day = moment(displayedDate).weekday(i).format('dddd').substr(0, 1);
				headerListDays.push(<Header key={`dayHeader-${i}`} day={day} />);
			}
			return headerListDays;
		};

		const populateWeeks = () => {
			const weekList = [];
			let weekComponents: React.ReactElement[] = [];
			const previousCurrentMonth = displayedDate.clone().subtract(1, 'month');
			const nextCurrentMonth = displayedDate.clone().add(1, 'month');
			const daysPreviousMonth = previousCurrentMonth.daysInMonth();
			const daysInMonth = displayedDate.daysInMonth();
			const startOfMonth = moment(displayedDate).set('date', 1);
			const offset = startOfMonth.weekday();
			weekComponents = weekComponents.concat(
				Array.from({ length: offset }, (x, i) => {
					const itemDate = moment(previousCurrentMonth).set(
						'date',
						daysPreviousMonth - (offset - i - 1),
					);
					const itemSelected = selected(itemDate, startDate, endDate, date);
					const itemDisabled = disabled(itemDate, minDate, maxDate);
					return (
						<Day
							key={`empty-${i}`}
							selected={itemSelected}
							disabled={itemDisabled}
							index={daysPreviousMonth - (offset - i - 1)}
							select={(day) => select(day, 'prev')}
							textStyle={styles.outOfMonth}
						/>
					);
				}),
			);
			for (let i = 1; i <= daysInMonth; i += 1) {
				const itemDate = moment(displayedDate).set('date', i);
				const itemSelected = selected(itemDate, startDate, endDate, date);
				const itemDisabled = disabled(itemDate, minDate, maxDate);
				weekComponents.push(
					<Day
						key={`day-${i}`}
						index={i}
						selected={itemSelected}
						disabled={itemDisabled}
						select={select}
					/>,
				);
				if ((i + offset) % 7 === 0 || i === daysInMonth) {
					if (weekComponents.length < 7) {
						weekComponents = weekComponents.concat(
							Array.from({ length: 7 - weekComponents.length }, (x, index) => {
								const itemDateNext = moment(nextCurrentMonth).set(
									'date',
									daysPreviousMonth - (offset - i - 1),
								);
								const itemSelectedNext = selected(
									itemDateNext,
									startDate,
									endDate,
									date,
								);
								const itemDisabledNext = disabled(itemDateNext, minDate, maxDate);
								return (
									<Day
										key={`empty-${index}`}
										selected={itemSelectedNext}
										disabled={itemDisabledNext}
										index={index + 1}
										select={(day) => select(day, 'next')}
										textStyle={styles.outOfMonth}
									/>
								);
							}),
						);
					}
					weekList.push(
						<View key={`weeks-${i}`} style={styles.week}>
							{weekComponents}
						</View>,
					);
					weekComponents = [];
				}
			}
			return weekList;
		};

		const populate = () => {
			const daysForHeaders = populateHeaders();
			const weeksHeaders = populateWeeks();
			setDayHeaders(daysForHeaders);
			setWeeks(weeksHeaders);
		};
		populate();
	}, [

		startDate,
		endDate,
		date,
		value,
		moment,
		displayedDate,
		selected,
		disabled,
		minDate,
		maxDate,
		select,
	]);

	useEffect(() => {
		if (value) {
			setDate(value);
		}
	}, [value]);

	return (
		<>
			<View style={[styles.content, style]}>
				{label && <Text style={[styles.label, labelStyle]} maxFontSizeMultiplier={1.3}>{label}</Text>}
				<TouchableOpacity style={styles.inputContainer} onPress={() => openModal()}>
					{mode === "time" ?
						<ClockIcon fill={colors.GRAY_DARK_2} />
						:
						<CalendarInputIcon fill={colors.GRAY_DARK_2} />
					}
					<Text style={styles.textInput} maxFontSizeMultiplier={1.3}>{getInputValue()}</Text>
				</TouchableOpacity>
				{error &&
					<View style={[{ marginBottom: 10, alignSelf: 'flex-start' }]}>
						<Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} numberOfLines={1}>{t(`errors.${error.message}`)}</Text>
					</View>
				}
			</View>

			{
				Platform.OS === 'ios' ?
					<DateTimePickerModal
						date={value && mode !== "time" ?
							new Date(moment(value).format('MM/DD/YYYY'))
							: value && mode === "time" ?
								new Date(value)
								:
								new Date()
						}
						isVisible={modalVisible && editable}
						mode={mode !== 'time' ? 'date' : 'time'}
						onConfirm={(date) => {
							if (mode !== "time") {
								handleDoneButton(moment(moment(date).format('YYYY-MM-DD')))
							} else {
								handleDoneButton(moment(date))
							}
							setModalVisible(!modalVisible)
						}}
						onCancel={() => {
							setModalVisible(!modalVisible)
						}}
						cancelTextIOS={t('common.cancel')}
						confirmTextIOS={t('common.done')}
					/>
					: <DatePicker
						modal
						title={null}
						theme='light'
						textColor={'gray'}
						style={{ borderLeftColor: 'red' }}
						locale={lng == 'es' ? 'es_ES' : 'en_US'}
						mode={mode !== 'time' ? 'date' : 'time'}
						open={modalVisible && editable}
						date={value && mode !== "time" ?
							new Date(moment(value).format('MM/DD/YYYY'))
							: value && mode === "time" ?
								new Date(value)
								:
								new Date()
						}
						minimumDate={minDate}
						onConfirm={(date) => {
							if (mode !== "time") {
								handleDoneButton(moment(moment(date).format('YYYY-MM-DD')))
							} else {
								handleDoneButton(moment(date))
							}
							setModalVisible(!modalVisible)
						}}
						onCancel={() => {
							setModalVisible(!modalVisible)
						}}
						cancelText={t('common.cancel')}
						confirmText={t('common.done')}
					/>
			}
		</>
	);
};

export const DatePickerController = (props: DatePickerControllerProps) => {
	const { pikerStyle = { width: Platform.OS === 'ios' ? '90%' : '85%' }, maxDate, control, valueDate, name, onDone, initValueMayus, minDate, ...rest } = props;
	return (
		<Controller
			control={control}
			name={name}
			render={({ field: { onChange, value } }) => (

				<DatePicker2

					{...rest}
					mode={name}
					isControlled
					initValueMayus
					maxDate={maxDate}
					minDate={minDate}
					style={pikerStyle}
					onDone={(val) => {
						const { date } = val;
						onChange(date);
						if (onDone) onDone(val);
					}}
					value={valueDate ? valueDate : value}
				/>
			)}
		/>
	);
};

export default DatePicker2;
