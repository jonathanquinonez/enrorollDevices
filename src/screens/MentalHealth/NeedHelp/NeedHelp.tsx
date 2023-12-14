import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { NeedHelpBody } from 'src/components/organisms/NeedHelp/NeedHelp.body';
/**
 * View options MyHealth
 * @returns
 */
export const NeedHelpScreen = (props: any) => {
	const { t } = useTranslation();
    const actionPayload = props.route.params.payload;

	return (
		<RootGeneral
			title={t(actionPayload.optionTitle)}
			subtitle={t('needhelpMH.screenSubtitle')}
			content={<NeedHelpBody phone={actionPayload.phone} phoneText={actionPayload.phoneText} website={actionPayload.website} />}
			isButton={false}
		/>
	);
};
