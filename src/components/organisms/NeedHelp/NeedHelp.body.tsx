import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View, Text, Linking } from 'react-native';
import Card from 'src/components/molecules/Card/Card';
import Row from 'src/components/atoms/Row/Row';
import Column from 'src/components/atoms/Column/Column';
import { NeedHelpBodyProps } from './NeedHelp.types';
import useStyles from 'hooks/useStyles';
import componentStyles from './NeedHelp.styles';
import Icon from 'src/components/atoms/Icon/Icon';
import Button from 'src/components/atoms/Button/Button';

export const NeedHelpBody = (props: NeedHelpBodyProps) => {
	const { phone, phoneText, website } = props;
	const { t } = useTranslation();
	const navigation = useNavigation();
	const { styles } = useStyles(componentStyles);

	const handlerLink = async (link: string, isMobile: boolean) => {
		const url = isMobile ? `tel:${link}` : `https://${link}`
		await Linking.openURL(url);
	}

	return (
		<ScrollView>
			<View style={{ flex: 1, padding: 5, marginTop: 30 }}>
				<Row>
					<Text style={{ fontSize: 14, textAlign: 'left', lineHeight: 17, fontFamily: "proxima-regular" }}>
						{t('needhelpMH.screenBody1')}
						<Text style={{ fontFamily: 'proxima-bold' }}>
							{t('needhelpMH.screenBody2')}
						</Text>
						{t('needhelpMH.screenBody3')}
						<Text style={{ fontFamily: 'proxima-bold' }}>
							{t('needhelpMH.screenBody4')}
						</Text>
						{t('needhelpMH.screenBody5')}
					</Text>
				</Row>
				<Row>
					<View style={[styles.card, styles.shadow]}>
						<Column style={{ marginVertical: 15 }}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									paddingHorizontal: 15
								}}
							>
								<Icon
									name="phone-alt"
									color="#2E7300"
									size={25}
									style={{ marginRight: 10 }}
								/>
								<Text style={styles.phoneText}>{t(phoneText)}</Text>
							</View>
							<Button
								title={phone}
								variant="Contained"
								style={styles.cardbtn}
								onPress={() => handlerLink(phone, true)}
							/>
							<View style={{
								paddingHorizontal: 15
							}}>
								<Text style={styles.websiteText}>{t('needhelpMH.screenWebsite')}</Text>
								<Text accessibilityRole='link' onPress={() => handlerLink(website, false)} style={[styles.website, {textAlign: 'center'}]}>{website}</Text>
							</View>
						</Column>
					</View>
				</Row>
			</View>
		</ScrollView>
	);
};
