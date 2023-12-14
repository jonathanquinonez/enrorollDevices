import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { t } from 'i18next';
import moment, { Moment } from 'moment';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import componentStyles from './DateRangeFilter.styles';
import useStyles from 'hooks/useStyles';
import {RegistryDateRangeFilterProps as Props,RegistryFilterProps} from './DateRangeFilter.types';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import { DatePickerController } from 'src/components/atoms/DatePicker/DatePicker';
import Button from 'src/components/atoms/Button/Button';
import { FormSchema } from './DateRangeFilter.helper'

const RegistryDateRangeFilter: React.FC<Props> = (props) => {
	const { onCancel, onSubmit, title, from: fromDefault, to: toDefault } = props;
	const { styles, colors } = useStyles(componentStyles);
	const [from, setFrom] = useState<Moment | undefined>(moment());
	const [to, setTo] = useState<Moment | undefined>(moment());

	const handleOnSubmit = (dates: RegistryFilterProps) => {
		const { from: fromDate, to: toDate } = dates;
		if (onSubmit) {
			onSubmit(fromDate, toDate);
		}
	};

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(FormSchema),
		defaultValues: {
			from: fromDefault,
			to: toDefault,
		},
	});

	return (
		<View style={styles.container}>
			<Text accessibilityRole='header' style={styles.title} maxFontSizeMultiplier={1.3}>{title}</Text>
			<DividerLine style={{marginVertical: 15}}/>
			<DatePickerController
				name="from"
				labelStyle={{ color: '#002E58' }}
				control={control}
				label={t('common.from')}
				style={styles.datePicker}
				onDone={(val) => setFrom(val.date)}
				pikerStyle={{ width: Dimensions.get('window').width * 0.89 }}
				error={errors?.from}
			/>
			<DatePickerController
				name="to"
				labelStyle={{ color: '#002E58' }}
				control={control}
				label={t('common.to')}
				maxDate={to}
				onDone={(val) => setTo(val.date)}
				pikerStyle={{ width: Dimensions.get('window').width * 0.89 }}
				error={errors?.to}
			/>
			<View style={styles.buttonContainer}>
				<Button
					accessibilityRole='button'
					accesibilityLabel={t('accessibility.cancelFilter')}
					title={t('common.cancel')}
					variant="Text"
					textStyle={styles.cancelButton}
					onPress={onCancel}
				/>
				<Button
					accessibilityRole='button'
					accesibilityLabel={t('accessibility.acceptFilter')}
					textStyle={styles.filterButton}
					title={t('common.filter')}
					onPress={handleSubmit((data) => handleOnSubmit(data as RegistryFilterProps))}
				/>
			</View>
		</View>
	);
};

export default RegistryDateRangeFilter;
