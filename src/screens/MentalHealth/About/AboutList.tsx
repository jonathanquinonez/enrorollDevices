import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView } from 'react-native';
import Button from 'src/components/atoms/Button/Button';

export const AboutList: React.FC<{ onPress: any }> = (props) => {
	const { onPress } = props;
	const { t } = useTranslation();

	return (
		<ScrollView style={{ flex: 1, marginBottom: 60 }}>
			<Button
				accessibilityRole='link'
				onPress={onPress}
				textStyle={{ paddingHorizontal: 0, fontFamily: 'proxima-bold', fontSize: 16, marginVertical: 20 }}
				style={{ justifyContent: 'flex-start' }}
				title={t('about.revisit')}
				variant='Underline' />
			<Text accessibilityRole='header' style={{ fontFamily: 'proxima-bold', fontSize: 20, color: '#002E58', marginBottom: 18 }}>{t('about.text.0')}</Text>
			<Text style={{ fontFamily: 'proxima-regular', color: '#212121', marginBottom: 30 }}>{t('about.text.1')}<Text style={{ fontWeight: 'bold' }}>{t('about.text.2')}</Text>{t('about.text.3')}</Text>
			<Text style={{ fontFamily: 'proxima-regular', color: '#212121', marginBottom: 30 }}>{t('about.text.4')}</Text>
		</ScrollView>
	);
};
