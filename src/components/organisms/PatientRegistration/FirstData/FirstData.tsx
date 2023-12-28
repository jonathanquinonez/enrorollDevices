import React, { useCallback, useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import componentStyles from './FirstData.styles';
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import Self from './Self/Self';
import LegalGuardian from './LegalGuardian/LegalGuardian';
import { FirstProps } from './FirstData.types';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import EcwService from 'adapter/api/ecwService';
import { PharmaciesList } from 'domain/entities/pharmaciesList';

const FirstData: React.FC<FirstProps> = (props) => {
	const { handlerNext, setFirstData } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const [value, setValue] = useState<boolean>(true);
	const { setAlertErrorMessage } = useErrorAlert();
	const [pharmaciesByZipCode] = EcwService.usePharmaciesByZipCodeMutation();
	const [listOfPharmacies, setListOfPharmacies] = useState<string[]>([]);

	const changeValue = (id: number) => {
		setValue(id == 1 ? true : false);
	};

	const handlerData = useCallback(
		async (value: string) => {
			try {
				if (value.length == 5) {
					const response: PharmaciesList[] | never[] = await pharmaciesByZipCode(
						value,
					).unwrap();
					setListOfPharmacies(response.length ? response.map((res) => res.name) : []);
				} else {
					setListOfPharmacies([]);
				}
			} catch (error) {
				setAlertErrorMessage('Error: ' + error);
			}
		},
		[pharmaciesByZipCode],
	);

	return (
		<View style={styles.container}>
			<View style={{ width: '90%', alignItems: 'flex-start' }}>
				<Text
					style={{
						alignSelf: 'flex-start',
						fontSize: 14,
						color: colors.BLUEDC1,
						fontFamily: 'proxima-bold',
						marginTop: 5,
						marginBottom: -5,
						marginLeft: -1,
					}}
				>
					{t('consents.requiredFields')}
				</Text>
				<Text style={styles.titleRadioButtons} maxFontSizeMultiplier={1.3}>
					{t('patientRegistration.stepTitleA')}
				</Text>
				<View style={styles.radioGroup}>
					<RadioButton
						accessibilityRole="radio"
						isSelected={value}
						onPress={() => changeValue(1)}
						textStyle={styles.text}
						style={styles.radioButton}
						title={t('createAccount.patientRelationship.patientSelf')}
					/>
					<RadioButton
						accessibilityRole="radio"
						isSelected={!value}
						onPress={() => changeValue(2)}
						textStyle={styles.text}
						style={(styles.radioButton, { marginLeft: 15 })}
						title={t('patientRegistration.legal')}
					/>
				</View>
			</View>
			<View
				style={{
					display: value ? 'none' : undefined,
					alignItems: 'center',
				}}
			>
				<LegalGuardian
					listOfPharmacies={listOfPharmacies}
					getListOfPharmacies={handlerData}
					handlerNext={handlerNext}
					setFirstData={(values) => setFirstData({ ...values, self: value })}
					selfValue={value}
				/>
			</View>
			<View
				style={{
					display: !value ? 'none' : undefined,
					alignItems: 'center',
				}}
			>
				<Self
					listOfPharmacies={listOfPharmacies}
					getListOfPharmacies={handlerData}
					handlerNext={handlerNext}
					setFirstData={(values) => setFirstData({ ...values, self: value })}
					selfValue={value}
				/>
			</View>
		</View>
	);
};

export default FirstData;
