import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { FormFHS } from './FormFHS';


export const IndexFHSScreen = () => {
	const { t } = useTranslation();	
	return (
		<RootGeneral
			title={t('myHealth.screenIWantToBeCalledBack.titleIWantToBeCalledBack')}
			subtitle={t('myHealth.screenIWantToBeCalledBack.subTitleIWantToBeCalledBack')}
			data={[]}
			isForm
			content={ <FormFHS />}
		/>
	);
};
