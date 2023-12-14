import React from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import GeneralNotifications from 'src/components/organisms/Notifications/GeneralNotifications/GeneralNotifications';

export const GeneralNotificationsScreen = () => {
	const { t } = useTranslation();

	return (
		<RootGeneral
			title={t('notifications.title')}
			subtitle={t('notifications.subTitle')}
			content={<GeneralNotifications/>}
			isForm />
	)
}
