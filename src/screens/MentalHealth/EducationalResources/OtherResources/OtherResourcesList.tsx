import React from 'react';
import { useTranslation } from 'react-i18next';
import { FlashList } from '@shopify/flash-list';
import Row from 'src/components/atoms/Row/Row';

import { Text, View, StyleSheet } from 'react-native';
import CardFile from 'src/components/molecules/CardFile/CardFile';

interface Props {
	data: Data[] | [];
	totalData: number;
	onPress: (uuid: string, name: string, type: string) => void;
}

interface Data {
	description: string;
	uuid: string;
	name: string;
	fileType:
		| 'jpg'
		| 'png'
		| 'jpeg'
		| 'heic'
		| 'pdf'
		| 'mp4'
		| 'mpeg'
		| 'mpg'
		| 'heif'
		| 'mp3'
		| 'wmv'
		| 'wav'
		| 'aac';
}

export const OtherResourcesList: React.FC<Props> = (props) => {
	const { data, totalData, onPress } = props;
	const { t } = useTranslation();

	const renderItem = ({ item, index }: { item: Data; index: number }) => {
		return (
			<Row
				key={`dataOtherR-${index}`}
				style={data.length == index + 1 ? { marginBottom: 80 } : {}}
			>
				<CardFile
					data={item}
					onPress={() => onPress(item?.uuid ?? '', item.name, item.fileType)}
				/>
			</Row>
		);
	};

	return (
		<View style={{ flex: 1 }}>
			<Text style={styles.title}>{`${t('educationalResoulce.titleCard2Secundary')}`}</Text>
			<FlashList
				data={data}
				renderItem={renderItem}
				estimatedItemSize={100}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		fontSize: 17,
		lineHeight: 24,
		fontFamily: 'proxima-regular',
		fontWeight: '600',
		color: '#002E58',
		marginBottom: 20,
	},
});
