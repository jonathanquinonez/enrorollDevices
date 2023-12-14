import React from 'react';
import IconText from 'src/components/atoms/IconText/IconText';
import { IHealthItemProps } from './HealthItem.types';
import { TouchableWithoutFeedback, View } from 'react-native';
import componentStyles from './HealthItem.styles';
import useStyles from 'hooks/useStyles';
import ItemCounter from 'src/components/atoms/Smartwatch/Lobby/Counter/ItemCounter';
import Arrow from 'assets/icons/ArrowLeft.svg';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const HealthItem = ({ item }: IHealthItemProps) => {
	const { icon, label, unit, date, counter, graphicCategory, graphicType } = item;
	const { styles } = useStyles(componentStyles);
	const navigation = useNavigation<any>();
	const { t } = useTranslation();

	return (
		<TouchableWithoutFeedback
			onPress={() =>
				navigation.navigate('HealthDetail', {
					category: graphicCategory,
					graphic: graphicType,
					data: item,
				})
			}
		>
			<View style={styles.container}>
				<View style={styles.subContainer}>
					<IconText
						sectionTitle={t(label)}
						textStyle={{
							fontWeight: '700',
							fontFamily: 'proxima-bold',
							marginLeft: 16,
						}}
						sectionIcon={<item.icon width={20} height={20} />}
					/>
					<ItemCounter counter={counter} unit={t(unit)} date={t(date)} />
				</View>
				<View style={styles.arrow}>
					<Arrow width={24} height={24} />
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default HealthItem;
