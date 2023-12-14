import React from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import NotificationsSettings from 'src/components/organisms/Notifications/NotificationsSettings/NotificationsSettings';


export const NotificationSettingsScreen = () => {
	const { t } = useTranslation();

	return (
		<RootGeneral
			title={t('notifications.title')}
			subtitle={t('notifications.subTitle')}
			content={<NotificationsSettings/>}
			isForm />
	)
}
