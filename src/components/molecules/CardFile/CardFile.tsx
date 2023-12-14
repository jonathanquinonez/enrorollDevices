import React from 'react';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import componentStyles from './CardFile.styles';
import { CardProps as Props } from './CardFile.types';

import Bolt from 'icons/MentalHealthIcons/EducationalResources/bolt.svg'

import { View, Text, Image } from 'react-native';
import Column from 'src/components/atoms/Column/Column';

import { useTranslation } from 'react-i18next';
import Button from 'src/components/atoms/Button/Button';
import { getFileName } from 'src/screens/Symtoms/utils';

/**
 * Render a CardFile.
 * @since 1.0.0
 */
const CardFile = (props: Props) => {

	const { onPress, data } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const image = () => {
		switch (data?.fileType) {
			case 'jpg':
			case 'png':
			case 'jpeg':
			case 'heic':
				return <Image style={{ width: 101, height: 79 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/img.png')} />
			case 'mp4':
			case 'mpeg':
			case 'mpg':
			case 'wmv':
			case 'heif':
				return <Image style={{ width: 58, height: 78 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/video.png')} />
			case 'pdf':
				return <Image style={{ width: 58, height: 78 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/pdf.png')} />
			case 'mp3':
			case 'wav':
			case 'aac':
				return <Image style={{ width: 58, height: 78 }} source={require('assets/icons/MentalHealthIcons/EducationalResources/media.png')} />
			default:
				return <></>
		}
	}

	return (<Column style={styles.card_container}>
		<View style={{ flexDirection: 'row' }}>
			<View style={styles.columnLeft}>
				{image()}
			</View>
			<View style={styles.columnRight}>
				<Text style={styles.title}>{getFileName(data?.name ?? '')}</Text>
				<View style={{ flexDirection: 'row' }}>
					<Bolt />
					<Text style={styles.label}>{data?.description}</Text>
				</View>
				<Button onPress={onPress} title={t('common.download')} style={{ minHeight: 35.5, marginBottom: 5 }} />
			</View>
		</View>
	</Column >
	);
};

export default CardFile;
