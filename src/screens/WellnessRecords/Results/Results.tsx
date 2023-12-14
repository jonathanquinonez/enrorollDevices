import { ScrollView } from '@nandorojo/anchor';
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { Text, View, Image } from 'react-native';
import { Buffer } from 'buffer';
import React from 'react';
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
import { useTranslation } from 'react-i18next';

import CircleInfo2 from 'icons/circle-info2.svg';
import Logo1 from 'icons/1logo.svg';
import Logo2 from 'icons/2logo.svg';
import Logo3 from 'icons/3logo.svg';
import Logo4 from 'icons/4logo.svg';
import Logo5 from 'icons/5logo.svg';
import Logo6 from 'icons/6logo.svg';

import CircleQuestion from 'assets/icons/circle-question.svg';
import { useNavigation } from '@react-navigation/native';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import moment from 'moment';
import { ordinalText } from 'src/utils/devices';


export const WellnessRecordsResultsBody = (props: any) => {
	const { vitalResults } = useAppSelector(userSelectors.selectVitalResult);
	const [resultData, setResultData] = React.useState<VitalSignResult>();
	const [date, setDate] = React.useState<Date>(new Date());
	const { styles, colors } = useStyles(componentStyles);

	const { t } = useTranslation();

	React.useEffect(() => {
		if (vitalResults?.data) {
			setResultData(JSON.parse(Buffer.from(vitalResults.data, 'base64').toString('ascii')));
		}
		if (vitalResults?.date) setDate(new Date(vitalResults.date))
	}, [vitalResults]);

	return (
		<ScrollView
			style={{ flex: 1, marginHorizontal: 'auto', width: '100%', alignContent: 'center' }}
		>
			<Text style={styles.titleDate}>{`${moment(date).format("MMMM D").charAt(0).toUpperCase() + moment(date).format("MMMM D").slice(1)}${t('general.locale') == 'en' ? ordinalText(parseInt(moment(date).format("D"))) : ''}, ${moment(date).format("YYYY")}`}</Text>
			<Row style={[styles.contentRow, { paddingTop: 20 }]}>
				<Column width={2}>
					<View style={styles.spacing}>
						<Text style={[styles.title_text, { justifyContent: 'center' }]}>{t('wellness.results.title2')}<CircleInfo2 /></Text>
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


			<Text style={{ color: '#212121', fontFamily: 'proxima-regular', fontSize: 14, marginTop: 10, marginBottom: 20 }}>{t('wellness.results.textInfo')}</Text>
			<Row style={styles.contentRow}>
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
				<View style={{ marginHorizontal: 5 }} />
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
			</Row>
			<Row style={styles.contentRow}>
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
				<View style={{ marginHorizontal: 5 }} />
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
			</Row>
			<Row style={styles.contentRow}>
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
				<View style={{ marginHorizontal: 5 }} />
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
			</Row>
			<Row style={styles.contentRow}>
				<Column width={2}>
					<Row style={[styles.contentRow, { backgroundColor: '#fff', borderRadius: 10 }]}>
						<Column width={2}>
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
							</View>
						</Column>
					</Row>
				</Column>
				<View style={{ marginHorizontal: 5 }} />
				<Column width={2}>
					<></>
				</Column>
			</Row>

			<Row style={[styles.row_container, { marginBottom: 80 }]}>
				<Text style={styles.info2}>{t('wellness.vitalSign.info2')}</Text>
				<CircleQuestion />
			</Row>
		</ScrollView>
	);
};
