/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import LobbyOrganism from 'src/components/organisms/Smartwatch/LobbyOrganism';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import useSmartwatch from 'src/hooks/Smartwatch/useSmartwatch';
import { Platform } from 'react-native';

const SmartwatchScreen = () => {
	const { t } = useTranslation();
	const { firstName } = useAppSelector(userSelectors.selectUser);
	const { healthValues, healthValuesIOS, isLoading, retrieveData } = useSmartwatch();

	return (
		<RootGeneral
			title={`${t('home.hiUser')}${firstName}!`}
			subtitle={t('smartwatch.lobby.description')}
			content={
				<LobbyOrganism
					healthValues={Platform.OS === 'android' ? healthValues : healthValuesIOS}
					onReload={retrieveData}
					loading={isLoading}
				/>
			}
			hiddenBackButton
		/>
	);
};

export default SmartwatchScreen;
