import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import DetailOrganism from '../../../components/organisms/Smartwatch/Detail/DetailOrganism';
import { useRoute } from '@react-navigation/native';
import {
	GraphicCategory,
	GraphicTypes,
} from 'src/components/organisms/Smartwatch/Detail/DetailOrganism.types';
import { IResponseValue } from 'src/components/organisms/Smartwatch/LobbyOrganis.types';

export const DetailScreen = () => {
	const { t } = useTranslation();
	const { firstName } = useAppSelector(userSelectors.selectUser);
	const [data, setData] = useState<number[]>([]);
	const route = useRoute<any>();

	useEffect(() => {
		if (route.params) {
			structureData(route.params.data.fullWeek);
		}
	}, [route.params]);

	const structureData = (dataParams: IResponseValue[]) => {
		const newData: number[] = [0, 0, 0, 0, 0, 0, 0];
		dataParams.map((item, index) => {
			newData[index] = typeof item.value === 'string' ? parseFloat(item.value) : item.value;
			return null;
		});
		setData(newData);
	};

	return (
		<RootGeneral
			title={`${t(`smartwatch.titles.${route.params.category.toLowerCase()}`)}`}
			subtitle={t(`Lorem  ipsum dolor sit amet, consectetur adipiscing elit`)}
			content={
				<DetailOrganism
					item={route.params.data}
					data={data}
					categoy={route.params.category}
					graphicType={route.params.graphic}
					showProgressCharts={route.params.category === GraphicCategory.SLEEP}
				/>
			}
		/>
	);
};
