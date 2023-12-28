import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { EditForm } from './EditForm';

import EcwService from 'adapter/api/ecwService';
import { ActivityIndicator } from 'react-native';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';

export const EditAccountScreen = () => {
	const { t } = useTranslation();
	const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);
	// const personalData = props.route.params.personalData;
	// const listCurrentMarital = props.route.params.listCurrentMarital;
	// const listMaritalStatusEN = props.route.params.listMaritalStatusEN;
	return (
		<RootGeneral
			title={t('personalInformation.title')}
			subtitle={t('personalInformation.subTitle')}
			data={[]}
			isForm
			content={
				<EditForm
					personalData={editAccountdata?.personalData}
					listCurrentMarital={editAccountdata?.listCurrentMarital}
					listMaritalStatusEN={editAccountdata?.listMaritalStatusEN} />
			}
		/>
	);
};
