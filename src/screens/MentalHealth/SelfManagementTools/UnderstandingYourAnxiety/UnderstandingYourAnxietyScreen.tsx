import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { UnderstandingYourAnxietyList } from './UnderstandingYourAnxietyList';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import getAnxietyService from 'adapter/api/anxietyService';


export const UnderstandingYourAnxietyScreen = () => {
	const { t } = useTranslation();
	const [getYourAnxiety] = getAnxietyService.useGetYourAnxietyMutation();
	const [getAnxietyParams] = getAnxietyService.useGetAnxietyParamsMutation();
	const [data, setData] = useState<any>([])
	const [thinking, setThinking] = useState<any>([])
	const userInformation = useAppSelector(userSelectors.selectUser);
	const { setAlertErrorMessage } = useErrorAlert();
	const { previousRoute } = useAppSelector(userSelectors.selectRoute);


	const getAll = useCallback(async () => {
		try {
			const obj = { 'authUi': userInformation.authUid, 'state': userInformation.state }
			const thinking = await getAnxietyParams("Thinking").unwrap();
			const resp = await getYourAnxiety(obj).unwrap();
			setThinking(thinking)
			if (resp) {
				setData(resp)
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}, [getYourAnxiety])

	useEffect(() => {
		getAll()
	}, [])

	useEffect(() => {
		if (previousRoute == 'EntryScreen') getAll();
	}, [previousRoute])

	return (
		<RootGeneral
			isForm
			title={t('myHealth.screenUnderstandingYourAnxiety.titleUnderstandingYourAnxiety')}
			subtitle={t('myHealth.screenUnderstandingYourAnxiety.subTitleUnderstandingYourAnxiety')}
			data={data}
			showData={data}
			content={<UnderstandingYourAnxietyList data={data} thinking={thinking} />}
			filterComponent={false}
		// isButton
		/>
	)
}
