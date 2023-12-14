import React from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';

import { ReferralsDetails } from './ReferralsDetails';


export const ReferralsDetailsScreen = () => {
	const { t } = useTranslation();

	return (
		<RootGeneral
			title={t('myHealth.ref')}
			subtitle={t('myHealth.textRefeD')}
			data={[]}
			showData={[]}
			content={<ReferralsDetails/>}
		/>
	);
};
