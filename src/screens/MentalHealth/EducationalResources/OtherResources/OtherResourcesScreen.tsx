import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { OtherResourcesList } from './OtherResourcesList';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import MentalHealthService from 'adapter/api/mentalHealthService';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import { processText } from 'src/screens/Symtoms/utils';

interface Data {
	description: string;
	uuid: string;
	name: string;
	fileType: 'jpg' | 'png' | 'jpeg' | 'heic'
	| 'pdf'
	| 'mp4' | 'mpeg' | 'mpg' | 'heif'
	| 'mp3' | 'wmv' | 'wav' | 'aac'
}

export const OtherResourcesScreen = () => {
	const { t } = useTranslation();
	const { setAlertErrorMessage } = useErrorAlert();
	const userInfo = useAppSelector(userSelectors.selectUser);
	const [data, setData] = useState<[] | Data[]>([])
	const [getAllBaseInfo] = MentalHealthService.useGetAllBaseInfoMutation();
	const [get_file] = MentalHealthService.useGetFileMutation();

	const removeExtension = (fileName: string): string => {
		// Get the index of the last occurrence of the "." character
		const lastDotIndex = fileName.lastIndexOf(".");
		// If the index is less than 1, it means there is no extension
		if (lastDotIndex < 1) {
			return fileName;
		}
		// Return a substring from the start of the string up to the index of the last dot
		return fileName.substring(0, lastDotIndex);
	}

	const allBaseInfo = useCallback(async () => {
		try {
			const resp: any = await getAllBaseInfo().unwrap()
			setData(resp)
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}, [getAllBaseInfo])

	const saveFilesystem = async (base64: string, fileName: string, type: string) => {
		const fileUri = FileSystem.documentDirectory + processText(fileName) + `.${type}`;
		await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 }).then(
			() => {
				FileViewer.open(fileUri, { showOpenWithDialog: true, showAppsSuggestions: true })
					.then(() => {
						// success
					})
					.catch(error => {
						// error
					})
			}
		);
	}

	const getFile = useCallback(async (uuid: string, name: string, type: string) => {
		try {
			await get_file({ uuid }).unwrap().then((response) => {
				saveFilesystem(response, `${removeExtension(name)}`, type)
			});
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}, [get_file])

	useEffect(() => {
		allBaseInfo();
	}, [])

	return (
		<RootGeneral
			title={t('educationalResoulce.titleCard2')}
			subtitle={t('educationalResoulce.subTitle')}

			content={<OtherResourcesList data={data} totalData={data.length} onPress={getFile} />}
		/>
	);
};