import { ScrollView } from '@nandorojo/anchor';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { Text, View, Image } from 'react-native';
import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import { VitalSignResult } from './Results.types';
import Row from 'src/components/atoms/Row/Row';
import useStyles from 'hooks/useStyles';
import componentStyles from './Results.styles';
import Column from 'src/components/atoms/Column/Column';
import { FontAwesome5 } from '@expo/vector-icons';
import CircularProgress from 'src/components/molecules/CircularProgress/CircularProgress';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	rateBPColor,
	rateBRColor,
	rateBRColorIcon,
	rateDIALColor,
	rateDIALColorIcon,
	rateHRColor,
	rateHRColorIcon,
	rateHRVColor,
	rateHRVColorIcon,
	rateSTRESSColor,
	rateSTRESSColorIcon,
	rateSYSTOColor,
	rateSYSTOColorIcon,
	ratesBMIColor,
	ratesBMIColorIcon,
	ratesHRVRISKColor,
	ratesHRVRISKColorIcon,
	ratesVITALColor,
	returnNumber,
} from './Results.utils';
import Button from 'src/components/atoms/Button/Button';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalResultVital from './Modals/Modal.results';
import ModalDetailVital from './Modals/Modal.details';
import { useTranslation } from 'react-i18next';

import CircleInfo2 from 'icons/circle-info2.svg';
import Logo1 from 'icons/1logo.svg';
import Logo2 from 'icons/2logo.svg';
import Logo3 from 'icons/3logo.svg';
import Logo4 from 'icons/4logo.svg';
import Logo5 from 'icons/5logo.svg';
import Logo6 from 'icons/6logo.svg';

import PulseRateEs from 'icons/PulseRateEs.svg';
import PulseRateEn from 'icons/PulseRateEn.svg';
import BreathingFrequencyEs from 'icons/BreathingFrequencyEs.svg';
import BreathingFrequencyEn from 'icons/BreathingFrequencyEn.svg';
import HeartPressureSandDEs from 'icons/HeartPressureSandDEs.svg';
import HeartPressureSandDEn from 'icons/HeartPressureSandDEn.svg';
import MentalStressLevelEs from 'icons/MentalStressLevelEs.svg';
import MentalStressLevelEn from 'icons/MentalStressLevelEn.svg';
import BodyMassIndexEs from 'icons/BodyMassIndexEs.svg';
import BodyMassIndexEn from 'icons/BodyMassIndexEn.svg';
import FacialAgeEs from 'icons/FacialAgeEs.svg';
import FacialAgeEn from 'icons/FacialAgeEn.svg';
import InstDetailsEn from 'icons/DetailsEn.svg';
import InstDetailsEs from 'icons/DetailsEs.svg';

import CircleQuestion from 'assets/icons/circle-question.svg';
import { useNavigation } from '@react-navigation/native';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { filterByDate } from 'src/screens/Symtoms/utils';


export const VitalSignResultsBody = (props: any) => {
	const { vitalResults } = useAppSelector(userSelectors.selectVitalResult);
	const [resultData, setResultData] = React.useState<VitalSignResult>();
	const { styles, colors } = useStyles(componentStyles);
	const { closeModal, setModal } = useBottomSheet();
	const navigation: any = useNavigation();
	const { email } = useAppSelector(userSelectors.selectUser);

	const { t } = useTranslation();

	const detailVital = [
		{
			title: t('wellness.modals.Pulserate'),
			children: t('general.locale') == 'es' ? <PulseRateEs /> : <PulseRateEn />
		},
		{
			title: t('wellness.modals.BreathingFrequency'),
			children: t('general.locale') == 'es' ? <BreathingFrequencyEs /> : <BreathingFrequencyEn />
		},
		{
			title: t('wellness.modals.SystolicAndDiastolic'),
			children: t('general.locale') == 'es' ? <HeartPressureSandDEs /> : <HeartPressureSandDEn />
		},
		{
			title: t('wellness.modals.SystolicAndDiastolic'),
			children: t('general.locale') == 'es' ? <HeartPressureSandDEs /> : <HeartPressureSandDEn />
		},
		{
			title: t('wellness.modals.MentalStressLevel'),
			children: t('general.locale') == 'es' ? <MentalStressLevelEs /> : <MentalStressLevelEn />
		},
		{
			title: t('wellness.modals.BodyMassIndex'),
			children: t('general.locale') == 'es' ? <BodyMassIndexEs /> : <BodyMassIndexEn />
		},
		{
			title: t('wellness.modals.FacialAge'),
			children: t('general.locale') == 'es' ? <FacialAgeEs /> : <FacialAgeEn />
		}
	]

	const [todayData, setTodayData] = useState<any[]>([])

	const getDataHistory = async () => {
		let getHistory: any = await AsyncStorage.getItem(`${email}mySanitas`);
		getHistory = JSON.parse(getHistory);
		const [todayD] = filterByDate(getHistory ?? [], new Date())
		setTodayData(todayD ?? [])
	}
	useEffect(() => {
		getDataHistory();
		setModal({
			render: () => (
				<ModalDetailVital
					title={t('wellness.modals.instructionsDetails')}
					children={t('general.locale') == 'es' ? <InstDetailsEs /> : <InstDetailsEs />} />
			)
		});
	}, [])

	const openModal = (index: number) => {
		const detail = detailVital[index]
		setModal({
			render: () => (
				<ModalDetailVital title={detail.title} children={detail.children} />
			), height: 450
		});
	};

	React.useEffect(() => {
		if (vitalResults?.data) {
			setResultData(JSON.parse(Buffer.from(vitalResults?.data, 'base64').toString('ascii')));
		}
	}, [vitalResults]);

	return (
		<ScrollView
			style={{ flex: 1, marginHorizontal: 'auto', width: '100%', alignContent: 'center' }}
		>
			<Row style={[styles.contentRow, { paddingTop: 20 }]}>
				<Column width={2.5}>
					<View style={[styles.spacing, { flexDirection: 'row' }]}>
						<Text style={[styles.title_text, { justifyContent: 'center' }]}>{t('wellness.results.title2')}</Text><CircleInfo2 />
					</View>
					<View style={styles.spacing}>
						<Text style={styles.text_body}>{t('wellness.results.subTitle2')}</Text>
					</View>
					<View style={[styles.mode_row, styles.spacing]}>
						<View style={[styles.obj_success, returnNumber(resultData?.HEALTH_SCORE) > 60 && { backgroundColor: '#008767' }]} />
						<View style={[styles.obj_warning, (returnNumber(resultData?.HEALTH_SCORE) > 40 && returnNumber(resultData?.HEALTH_SCORE) <= 60) ? { backgroundColor: '#E7A304' } : {}]} />
						<View style={[styles.obj_error, returnNumber(resultData?.HEALTH_SCORE) <= 40 && { backgroundColor: '#B50303' }]} />
					</View>
					<View style={[styles.mode_row, { justifyContent: 'space-between', width: 175 }]}>
						<Text style={[styles.text_body, { color: '#008767' }]}>{t('wellness.results.Optimum')}</Text>
						<Text style={[styles.text_body, { color: '#B50303' }]}>{t('wellness.results.Prevention')}</Text>
					</View>
				</Column>
				<Column>
					<View style={styles.view_center}>
						<CircularProgress
							pgColor={ratesVITALColor(resultData?.HEALTH_SCORE)}
							size={90}
							strokeWidth={8}
							text={resultData?.HEALTH_SCORE?.toFixed()}
							progressPercent={resultData?.HEALTH_SCORE?.toFixed()}
						/>
					</View>
				</Column>
			</Row>
			<Button
				variant={'Outlined'}
				title={t('wellness.results.btn1')}
				textStyle={{ fontFamily: 'proxima-bold' }}
				style={{ alignSelf: 'center', backgroundColor: 'transparent', marginTop: 10 }}
				onPress={() => navigation.navigate('WellnessRecordsScreen')}
			/>
			<Text style={{ color: '#212121', fontFamily: 'proxima-regular', fontSize: 14, marginVertical: 10 }}>{t('wellness.results.textInfo')}</Text>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: rateHRColor(resultData?.HR_BPM) },
								]}
							>
								<Logo1 fill={rateHRColorIcon(resultData?.HR_BPM)} />
								<Text style={[styles.card_score, { color: rateHRColorIcon(resultData?.HR_BPM) }]}>
									{resultData?.HR_BPM?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.PulseRate')}</Text>
								<Text>{t('wellness.results.PulseRateSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(0)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: rateBRColor(resultData?.BR_BPM) },
								]}
							>
								<Logo2 fill={rateBRColorIcon(resultData?.BR_BPM)} />
								<Text style={[styles.card_score, { color: rateBRColorIcon(resultData?.BR_BPM) }]}>
									{resultData?.BR_BPM?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.BreathingFrequency')}</Text>
								<Text>{t('wellness.results.BreathingFrequencySub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(1)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: rateHRVColor(resultData?.BP_SYSTOLIC) },
								]}
							>
								<Logo3 fill={rateHRVColorIcon(resultData?.BP_SYSTOLIC)} />
								<Text style={[styles.card_score, { color: rateHRVColorIcon(resultData?.BP_SYSTOLIC) }]}>
									{resultData?.BP_SYSTOLIC?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.SystolicBloodPressure')}</Text>
								<Text>{t('wellness.results.SystolicBloodPressureSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(2)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: rateDIALColor(resultData?.BP_DIASTOLIC) },
								]}
							>
								<Logo3 fill={rateDIALColorIcon(resultData?.BP_DIASTOLIC)} />
								<Text style={[styles.card_score, { color: rateDIALColorIcon(resultData?.BP_DIASTOLIC) }]}>
									{resultData?.BP_DIASTOLIC?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.DiastolicBloodPressure')}</Text>
								<Text>{t('wellness.results.DiastolicBloodPressureSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(3)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: rateSTRESSColor(resultData?.MSI) },
								]}
							>
								<Logo4 fill={rateSTRESSColorIcon(resultData?.MSI)} />
								<Text style={[styles.card_score, { color: rateSTRESSColorIcon(resultData?.MSI) }]}>
									{resultData?.MSI?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.StressLevel')}</Text>
								<Text>{t('wellness.results.StressLevelSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(4)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: ratesBMIColor(resultData?.BMI_CALC) },
								]}
							>
								<Logo5 fill={ratesBMIColorIcon(resultData?.BMI_CALC)} />
								<Text style={[styles.card_score, { color: ratesBMIColorIcon(resultData?.BMI_CALC) }]}>
									{resultData?.MSI?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.BodyMassIndex')}</Text>
								<Text>{t('wellness.results.BodyMassIndexSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(5)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>
			<Row>
				<View>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={1}>
							<View
								style={[
									styles.card_base,
									styles.card_icon,
									{ backgroundColor: 'grey' },
								]}
							>
								<Logo6 fill={ratesHRVRISKColorIcon(resultData?.AGE)} />
								<Text style={[styles.card_score, { color: ratesHRVRISKColorIcon(resultData?.AGE) }]}>
									{resultData?.AGE?.toFixed()}
								</Text>
							</View>
						</Column>
						<Column width={3}>
							<View style={[styles.card_base]}>
								<Text style={styles.card_title}>{t('wellness.results.FacialSkinAge')}</Text>
								<Text>{t('wellness.results.FacialSkinAgeSub')}</Text>
							</View>
						</Column>
						<Column width={1}>
							<View style={[styles.card_base, { justifyContent: 'flex-end' }]}>
								<TouchableOpacity
									style={styles.circle}
									onPress={() => openModal(6)}
								>
									<FontAwesome5 name="plus" color="#FFF" size={15} />
								</TouchableOpacity>
							</View>
						</Column>
					</Row>
				</View>
			</Row>

			<Button
				variant={'Outlined'}
				title={t('wellness.results.btn2')}
				textStyle={{ fontFamily: 'proxima-bold' }}
				style={{ alignSelf: 'center', backgroundColor: 'transparent', marginTop: 10, marginBottom: 20 }}
				onPress={() => setModal({
					render: () => (
						<ModalWarning
							isIconAlert
							title={2 - todayData?.length + ' ' + t('wellness.modals.general')}
							warningText={t('wellness.modals.generalText')}
							textButton={t('common.continue')}
							styleSubtitle={{ color: '#212121', fontSize: 14 }}
							textButtonCancel={t('common.cancel')}
							onPressCancel={closeModal}
							onPress={() => { closeModal(); navigation.goBack() }} />
					)
				})}
			/>

			<Row style={[styles.row_container, { marginBottom: 80 }]}>
				<Text style={styles.info2}>{t('wellness.vitalSign.info2')}</Text>
				<CircleQuestion />
			</Row>
		</ScrollView>
	);
};
