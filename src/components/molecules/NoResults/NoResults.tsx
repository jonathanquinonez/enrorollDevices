import React from 'react';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { NoResultsProps as Props } from './NoResults.types';

import componentStyles from './NoResults.styles';
import { View, Text, Image } from 'react-native';
//Images
import NoResultsIcon from 'icons/NoResults.svg';
import Column from 'src/components/atoms/Column/Column';
import { useTranslation } from 'react-i18next';

/**
 * Render a NoResults.
 * @since 1.0.0
 */
const NoResults = (props: Props) => {
	const { iconWhenNoResults: inf } = props;

	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();

	const GetImg = () => {
		switch (inf.nameImg) {
			case 'CurrMedic':
				return (
					<Image
						source={require(`assets/images/CurrMedic.png`)}
						style={[styles.logo_image, { marginTop: 30 }]}
					/>
				);
			case 'Labs':
				return (
					<Image
						source={require(`assets/images/Labs.png`)}
						style={[styles.logo_image, { marginTop: '-8%' }]}
					/>
				);
			case 'VisSumm':
				return (
					<Image
						source={require(`assets/images/VisSumm.png`)}
						style={[styles.logo_image, { marginTop: '-8%' }]}
					/>
				);
			case 'Ref':
				return (
					<Image
						source={require(`assets/images/Ref.png`)}
						style={[styles.logo_image, { marginTop: '-8%' }]}
					/>
				);
			case 'Imm':
				return (
					<Image
						source={require(`assets/images/Imm.png`)}
						style={[styles.logo_image, { marginTop: '-8%' }]}
					/>
				);
			case 'PreAppo':
				return (
					<Image
						source={require(`assets/images/PreAppo.png`)}
						style={[
							styles.logo_image,
							{ marginTop: '-8%', resizeMode: 'contain', width: 150, height: 144 },
						]}
					/>
				);
			case 'UpcoAppo':
				return (
					<Image
						source={require(`assets/images/UpcoAppo.png`)}
						style={[
							styles.logo_image,
							{ marginTop: '-8%', resizeMode: 'contain', width: 150, height: 144 },
						]}
					/>
				);
			default:
				return (
					<>
						<Image
							source={require(`assets/images/NoResult.png`)}
							style={[
								styles.logo_image,
								{
									marginTop: -50,
									width: 150,
									height: 127,
									resizeMode: 'contain',
								},
							]}
						/>
						<Text style={styles.title} maxFontSizeMultiplier={1.3}>
							{t('noResults.title')}
						</Text>
						<Text style={styles.subTitle} maxFontSizeMultiplier={1.3}>
							{t('noResults.subTitle')}
						</Text>
					</>
				);
		}
	};

	return (
		<Column style={styles.container}>
			<GetImg />
			{inf.subtitle != 'NoResult' && inf.subtitle ? (
				<Text style={styles.subTitle} maxFontSizeMultiplier={1.2}>
					{t(`iconWhenNoResults.${inf.subtitle}`)}
				</Text>
			) : (
				<></>
			)}
		</Column>
	);
};

export default NoResults;
