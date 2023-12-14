import React from 'react';
import { View, Text } from 'react-native';
import { colorsLight } from 'config/theme';
import useStyles from 'hooks/useStyles';
import componentStyles from './AverageItem.styles';
import ItemCounter from 'src/components/atoms/Smartwatch/Lobby/Counter/ItemCounter';
import { useTranslation } from 'react-i18next';
import { IAverageProps } from './AverageItem.types';

const AverageComponent = (props: IAverageProps) => {
	const { counter, unit, date } = props;
	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View>
			<Text style={styles.average}>{t('charts.average')}</Text>
			<ItemCounter
				counter={counter}
				unit={unit}
				date={date}
				counterColor={colorsLight.GREEND1F}
				labelColor={colorsLight.GREEND1F}
				dateColor={colorsLight.BLUE2F7}
			/>
		</View>
	);
};

export default AverageComponent;
