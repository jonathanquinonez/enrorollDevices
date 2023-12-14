import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import ChatDoctorRegistry from './ChatDoctorRegistry';
/**
 * View options MyHealth
 * @returns
 */
export const ChatDoctorScreen = () => {
	const { t } = useTranslation();
	return (
		<RootGeneral
			title={t('getCareNow.ChatDoctor.title')}
			subtitle={t('getCareNow.ChatDoctor.subTitle')}
			content={<ChatDoctorRegistry />}
			isButton={false}
		/>
	);
};
