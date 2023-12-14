/* eslint-disable @typescript-eslint/no-empty-function */
import useStyles from 'hooks/useStyles';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import componentStyles from './LobbyOrganism.styles';
import HealthItem from 'src/components/molecules/Smartwatch/Item/HealthItem';
import { initialStateData } from './LobbyOrganism.constants';

import { IHealthItemType, IProps } from './LobbyOrganis.types';

const LobbyOrganism = ({ healthValues, onReload = () => {}, loading = false }: IProps) => {
	const { styles } = useStyles(componentStyles);
	const [data, setData] = useState<IHealthItemType[]>(initialStateData);

	useEffect(() => {
		if (healthValues) {
			const newData = data.map((item) => {
				const newValue =
					healthValues[item.id].length > 0 ? healthValues[item.id][0].value : 0;
				if (newValue !== undefined) {
					return {
						...item,
						counter: typeof newValue === 'number' ? newValue.toString() : newValue,
						fullWeek: healthValues[item.id],
					};
				}
				return item;
			});
			setData(newData);
		}
	}, [healthValues]);

	return (
		<ScrollView
			refreshControl={<RefreshControl refreshing={loading} onRefresh={onReload} />}
			contentContainerStyle={styles.container}
		>
			{data.map((item, index) => (
				<HealthItem key={index} item={item} />
			))}
		</ScrollView>
	);
};

export default LobbyOrganism;
