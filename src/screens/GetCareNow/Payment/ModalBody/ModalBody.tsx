/* eslint-disable linebreak-style */
import React from 'react';
import { Dimensions, Linking, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import appConfig from 'config/index';
import { SafeAreaView } from 'react-native';
import UserBlueTwo from 'icons/UserBlueTwo.svg';
import StateBlue from 'icons/StateBlue.svg';
import CityBlue from 'icons/CityBlue.svg';
import EmailBlue from 'icons/EmailBlue.svg';
import PhoneBlue from 'icons/PhoneBlue.svg';
import ServiceBlue from 'icons/ServiceBlue.svg';
import IconLocation from 'icons/iconLocation.svg';
import Button from 'src/components/atoms/Button/Button';
import { PropsBody, PropsLocation } from './ModalBody.types';
import componentStyles from './ModalBody.styles';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import OkIcon from 'icons/circle-check2.svg';
import DividerLine from 'src/components/atoms/DividerLine/DividerLine';
import Row from 'src/components/atoms/Row/Row';
import { LinearGradient } from 'react-native-svg';
import { userActions } from 'adapter/user/userSlice';

export const Body = ({ ageDataInsurance, modalPaypal, setShowModal }: PropsBody) => {
	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	const navigate = async () => {
		setShowModal(false);
		await Linking.openURL(appConfig.TELADOC_URL);
	};

	const states = (state: string | undefined) => {
		if (state) {
			switch (state) {
				case 'FL':
					return 'Florida';
				case 'TN':
					return 'Tennessee';
				default:
					return '';
			}
		} else {
			return '';
		}
	};

	const financial = (x: string | undefined) => {
		return x ? Number.parseFloat(x).toFixed(2) : 0;
	};

	const services = (service: string | undefined) => {
		if (service) {
			switch (service) {
				case 'videocall':
					return t('getCareNow.video');
				default:
					return '';
			}
		} else {
			return '';
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.title')}
			</Text>

			<View style={{}}>
				<Text style={[styles.subTitle, { color: '#3CA70D' }]} maxFontSizeMultiplier={1.3}>
					{t('payment.modal.subTitle')}
				</Text>
			</View>

			<View style={{ marginTop: '3%' }}>
				<View style={styles.row}>
					<View style={styles.columOne}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<UserBlueTwo />
							&nbsp;&nbsp;{t('payment.modal.name') + ':'}
						</Text>
					</View>

					<View style={styles.columTwo}>
						<Text
							style={[styles.textRow, { textTransform: 'capitalize' }]}
							maxFontSizeMultiplier={1.3}
						>
							{ageDataInsurance?.patientInformation?.firstName}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.columOne}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<UserBlueTwo />
							&nbsp;&nbsp;{t('payment.modal.lastName') + ':'}
						</Text>
					</View>

					<View style={styles.columTwo}>
						<Text
							style={[styles.textRow, { textTransform: 'capitalize' }]}
							maxFontSizeMultiplier={1.3}
						>
							{ageDataInsurance?.patientInformation?.lastName}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.columOne}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<StateBlue />
							&nbsp;&nbsp;{t('payment.modal.state') + ':'}
						</Text>
					</View>

					<View style={styles.columTwo}>
						<Text style={styles.textRow} maxFontSizeMultiplier={1.3}>
							{states(ageDataInsurance?.patientInformation?.state.toUpperCase())}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={styles.columOne}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<CityBlue />
							&nbsp;{t('payment.modal.city') + ':'}
						</Text>
					</View>

					<View style={styles.columTwo}>
						<Text style={styles.textRow} maxFontSizeMultiplier={1.3}>
							{ageDataInsurance?.patientInformation?.city}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={[styles.columOne, { width: '25%' }]}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<EmailBlue />
							&nbsp;&nbsp;{t('payment.modal.email') + ':'}
						</Text>
					</View>

					<View style={[styles.columTwo, { width: '75%', alignContent: 'flex-start' }]}>
						<Text
							style={[styles.textRow, { textAlign: 'left' }]}
							maxFontSizeMultiplier={1.3}
						>
							{ageDataInsurance?.patientInformation?.email}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={[styles.columOne, { width: '50%' }]}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<PhoneBlue />
							&nbsp;{t('payment.modal.phoneNumber') + ':'}
						</Text>
					</View>

					<View style={[styles.columTwo, { width: '50%' }]}>
						<Text style={[styles.textRow]} maxFontSizeMultiplier={1.3}>
							{ageDataInsurance?.patientInformation?.mobile}
						</Text>
					</View>
				</View>

				<View style={styles.row}>
					<View style={[styles.columOne, { width: '40%' }]}>
						<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
							<ServiceBlue />
							&nbsp;&nbsp;{t('payment.modal.service') + ':'}
						</Text>
					</View>

					<View style={[styles.columTwo, { width: '60%' }]}>
						<Text style={[styles.textRow2]} maxFontSizeMultiplier={1.3}>
							{services(ageDataInsurance?.service.toLowerCase())}
						</Text>
					</View>
				</View>

				<View style={{ marginLeft: '-2%', marginTop: '13%' }}>
					<View style={{ flexDirection: 'row' }}>
						<View style={styles.columOne}>
							<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
								&nbsp;&nbsp;{t('payment.modal.cost') + ':'}
							</Text>
						</View>

						<View style={styles.columTwo}>
							<Text style={[styles.textRow2]} maxFontSizeMultiplier={1.3}>
								$
								{ageDataInsurance?.cost
									? financial(ageDataInsurance?.cost.toString())
									: '0.00'}
							</Text>
						</View>
					</View>

					<View style={[styles.row, { marginTop: '3%' }]}>
						<View style={styles.columOne}>
							<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
								&nbsp;&nbsp;{t('payment.modal.quantity') + ':'}
							</Text>
						</View>

						<View style={styles.columTwo}>
							<Text style={[styles.textRow2]} maxFontSizeMultiplier={1.3}>
								{ageDataInsurance?.quantity}
							</Text>
						</View>
					</View>

					<View style={[styles.row, { marginTop: '3%' }]}>
						<View style={styles.columOne}>
							<Text style={styles.icon} maxFontSizeMultiplier={1.3}>
								&nbsp;&nbsp;{t('payment.modal.subTotal') + ':'}
							</Text>
						</View>

						<View style={styles.columTwo}>
							<Text style={[styles.textRow2]} maxFontSizeMultiplier={1.3}>
								$
								{ageDataInsurance?.subtotal
									? financial(ageDataInsurance?.subtotal.toString())
									: '0.00'}
							</Text>
						</View>
					</View>

					<View style={[styles.row, { marginTop: '3%' }]}>
						<View style={styles.columOne}>
							<Text style={styles.textTotal} maxFontSizeMultiplier={1.3}>
								&nbsp;&nbsp;{t('payment.modal.total') + ':'}
							</Text>
						</View>

						<View style={styles.columTwo}>
							<Text
								style={[
									styles.textTotal,
									{
										fontFamily: 'proxima-regular',
										color: '#065394',
									},
								]}
								maxFontSizeMultiplier={1.3}
							>
								$
								{ageDataInsurance?.total
									? financial(ageDataInsurance?.total.toString())
									: '0.00'}
							</Text>
						</View>
					</View>
				</View>

				<View style={{ alignItems: 'center', marginTop: 20, marginBottom: 10 }}>
					<Button
						title={
							ageDataInsurance?.code == 1 && ageDataInsurance?.total == 0
								? t('payment.modal.textBtn')
								: t('payment.modal.textBtnTwo')
						}
						variant="Contained"
						style={{ backgroundColor: '#065394', padding: 10, borderRadius: 22 }}
						textStyle={{
							fontFamily: 'proxima-semibold',
							color: 'white' /*colors.GRAY_DARK*/,
							fontSize: 14,
						}}
						onPress={() => {
							ageDataInsurance?.code == 1 && ageDataInsurance?.total == 0
								? navigate()
								: modalPaypal();
						}}
					/>
				</View>
			</View>
		</View>
	);
};

export const Body2 = ({ ageDataInsurance, setShowModal, modalPaypal }: PropsBody) => {
	const navigation: any = useNavigation();
	const dispatch = useAppDispatch();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { currentRoute } = useAppSelector(userSelectors.selectRoute);

	const financial = (x: string | undefined) => {
		return x ? Number.parseFloat(x).toFixed(2) : 0;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.titleTwo} maxFontSizeMultiplier={1.3}>
				{ageDataInsurance?.code == 2
					? t('payment.modal.titleInfo')
					: ageDataInsurance?.code == 3
					? t('payment.modal.titleInfo2')
					: t('payment.modal.titleInfo3')}
			</Text>

			<Text style={styles.subTitleTwo} maxFontSizeMultiplier={1.3}>
				{ageDataInsurance?.code == 2
					? t('payment.modal.subTitleInfo')
					: ageDataInsurance?.code == 2
					? t('payment.modal.subTitleInfo2')
					: t('payment.modal.subTitleInfo3')}
			</Text>

			<View style={styles.rowTwo}>
				<View style={{ width: '50%' }}>
					<Text
						style={{ fontSize: 20, color: '#065394', fontFamily: 'proxima-semibold' }}
						maxFontSizeMultiplier={1.3}
					>
						{t('payment.modal.total') + ':'}
					</Text>
				</View>

				<View style={{ width: '50%' }}>
					<Text style={styles.valueTwo} maxFontSizeMultiplier={1.3}>{`$${
						financial(ageDataInsurance?.total.toString()) ?? ''
					}`}</Text>
				</View>
			</View>

			<View style={{ alignItems: 'center', marginTop: '10%' }}>
				<View style={{ marginTop: '5%' }}>
					<Button
						title={t('payment.modal.textBtnTwo')}
						variant="Contained"
						style={{ backgroundColor: '#065394', padding: 15, borderRadius: 30 }}
						textStyle={{
							fontFamily: 'proxima-semibold',
							color: 'white' /*colors.GRAY_DARK*/,
							fontSize: 14,
						}}
						onPress={() => modalPaypal()}
					/>
				</View>

				<View style={{ marginTop: '6%' }}>
					<Button
						title={t('payment.modal.textBtnThree')}
						variant="Contained"
						style={styles.btn}
						textStyle={{
							fontFamily: 'proxima-semibold',
							color: '#065394' /*colors.GRAY_DARK*/,
							fontSize: 14,
							borderBottomColor: '#065394',
						}}
						onPress={() => {
							setShowModal(false);
							navigation.navigate('MyInsurance', {});
						}}
					/>
				</View>

				<View style={{ marginTop: '7%' }}>
					<Text
						style={{
							fontSize: 16,
							textAlign: 'center',
							color: '#065394',
							fontFamily: 'proxima-regular',
						}}
						maxFontSizeMultiplier={1.3}
					>
						{t('payment.modal.textDescription')}&nbsp;
						<Text
							style={{ fontWeight: '600', textDecorationLine: 'underline' }}
							onPress={() => {
								setShowModal(false);
								//  navigation.navigate('ChatSanitas', { type: 'supportUser', 'prevRoute': currentRoute })
								dispatch(
									userActions.setStateVewChat({
										queue: 'support',
										stateView: true,
									}),
								);
							}}
							maxFontSizeMultiplier={1.3}
						>
							{t('payment.modal.textSupport')}
						</Text>
					</Text>
				</View>

				<View style={{ marginTop: '13%' }}>
					<Button
						title={t('payment.modal.textBtnFour')}
						variant="Underline"
						style={{ backgroundColor: '#fff' }}
						textStyle={{
							fontSize: 14,
							fontFamily: 'proxima-bold',
							color: '#065394' /*colors.GRAY_DARK*/,
						}}
						onPress={() => setShowModal(false)}
					/>
				</View>
				{ageDataInsurance?.code == 4 && (
					<View style={{ marginTop: 20 }}>
						<Text
							style={[styles.subTitleTwo, { fontSize: 14 }]}
							maxFontSizeMultiplier={1.3}
						>
							{t('payment.modal.infoPCP')}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export const Body8 = ({ ageDataInsurance, setShowModal, modalPaypal }: PropsBody) => {
	const navigation: any = useNavigation();
	const dispatch = useAppDispatch();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { currentRoute } = useAppSelector(userSelectors.selectRoute);

	return (
		<View style={styles.container}>
			<Text style={styles.titleTwo} maxFontSizeMultiplier={1.3}>
				{ageDataInsurance == 8
					? t('payment.modal.titleInfo')
					: ageDataInsurance == 9
					? t('payment.modal.titleInfo2')
					: ageDataInsurance == 10
					? t('payment.modal.titleInfo3')
					: t('payment.modal.titleInfo3')}
			</Text>

			<Text style={styles.subTitleTwo} maxFontSizeMultiplier={1.3}>
				{ageDataInsurance == 8
					? t('payment.modal.validateCoverage')
					: ageDataInsurance == 9
					? t('payment.modal.subTitleInfo2Inac')
					: ageDataInsurance == 10
					? t('payment.modal.pcpSanitasDes')
					: t('payment.modal.pcpSanitasDes')}
			</Text>

			<View style={{ alignItems: 'center', marginTop: '8%' }}>
				<View style={{}}>
					<Button
						title={t('payment.modal.textBtnThree')}
						variant="Contained"
						style={{ backgroundColor: '#065394', padding: 10, borderRadius: 22 }}
						textStyle={{
							fontFamily: 'proxima-semibold',
							color: 'white',
							fontSize: 14,
							borderBottomColor: '#065394',
						}}
						onPress={() => {
							setShowModal(false);
							navigation.navigate('MyInsurance', {});
						}}
					/>
				</View>

				<View style={{ marginTop: '7%' }}>
					<Text
						style={{
							fontSize: 16,
							textAlign: 'center',
							color: '#065394',
							fontFamily: 'proxima-regular',
						}}
						maxFontSizeMultiplier={1.3}
					>
						{t('payment.modal.textDescription')}&nbsp;
						<Text
							style={{ fontFamily: 'proxima-bold', textDecorationLine: 'underline' }}
							onPress={() => {
								setShowModal(false);
								//navigation.navigate('ChatSanitas', { type: 'supportUser', 'prevRoute': currentRoute })
								dispatch(
									userActions.setStateVewChat({
										queue: 'support',
										stateView: true,
									}),
								);
							}}
							maxFontSizeMultiplier={1.3}
						>
							{t('payment.modal.textSupport')}
						</Text>
					</Text>
				</View>

				<View style={{ marginTop: '11%' }}>
					<Button
						title={t('payment.modal.textBtnFour')}
						variant="Underline"
						style={{ backgroundColor: '#fff' }}
						textStyle={{
							fontSize: 14,
							fontFamily: 'proxima-bold',
							color: '#065394' /*colors.GRAY_DARK*/,
						}}
						onPress={() => setShowModal(false)}
					/>
				</View>
				{ageDataInsurance == 10 && (
					<View style={{ marginTop: '4%' }}>
						<Text style={styles.subTitleTwo} maxFontSizeMultiplier={1.3}>
							{t('payment.modal.infoPCP')}
						</Text>
					</View>
				)}
			</View>
		</View>
	);
};

export const BodyLocation = (props: PropsLocation) => {
	const { setShowModal, onPress } = props;
	const navigation: any = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	const { currentRoute } = useAppSelector(userSelectors.selectRoute);

	return (
		<SafeAreaView style={{ width: Dimensions.get('window').width }}>
			<View style={{ alignItems: 'center', marginTop: '7%' }}>
				<IconLocation />
			</View>
			<View style={{ alignItems: 'center', marginTop: '7%' }}>
				<Text style={styles.titleLocation} maxFontSizeMultiplier={1.3}>
					{t('menuLeftHome.findLocation.title')}
				</Text>
			</View>
			<View style={{ alignItems: 'center', marginTop: '7%' }}>
				<Text style={styles.subtitleLocation} maxFontSizeMultiplier={1.3}>
					{t('menuLeftHome.findLocation.body1Modal')}
				</Text>
				<Text style={styles.subtitleLocation} maxFontSizeMultiplier={1.3}>
					{t('menuLeftHome.findLocation.body2Modal')}
				</Text>
			</View>
			<View
				style={{
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					marginTop: '7%',
					marginBottom: 25,
				}}
			>
				<Button
					title={t('deleteAccount.continue')}
					variant="Contained"
					style={{ backgroundColor: '#0069A7', borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14, padding: 17 }}
					onPress={() => {
						onPress();
					}}
				/>
				<View style={{ marginTop: '2%' }}>
					<Text
						style={{
							fontFamily: 'proxima-bold',
							color: '#065394',
							textDecorationLine: 'underline',
							marginTop: 10,
						}}
						onPress={() => {
							setShowModal(false);
						}}
						maxFontSizeMultiplier={1.3}
					>
						{t('common.cancel')}
					</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export const Body3 = ({ setShowModal, modalPaypal }: PropsBody) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={styles.titleThree} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.titleInfoFour')}
			</Text>
			<Text style={styles.subTitleThree} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.subTitleInfoFour')}
			</Text>

			<View style={{ marginTop: '15%', alignItems: 'center' }}>
				<Button
					title={t('payment.modal.textBtnFive')}
					variant="Contained"
					style={{ backgroundColor: '#065394', borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14, padding: 17 }}
					onPress={() => setShowModal(false)}
				/>
			</View>
		</View>
	);
};

export const Body4 = ({ modalPaypal, newPaypal }: PropsBody & { newPaypal: () => void }) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={[styles.titleThree, { fontWeight: '400' }]} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.titleInfoFour')}
			</Text>
			<Text style={styles.subTitleFour} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.subTitleInfoContinue')}
			</Text>

			<View style={{ marginTop: '9%' }}>
				<View style={{}}>
					<Button
						title={t('payment.modal.textBtnSix')}
						variant="Contained"
						style={{
							backgroundColor: '#065394',
							paddingVertical: 15,
							borderRadius: 30,
							marginHorizontal: 10,
						}}
						textStyle={{ color: 'white', fontSize: 13, fontFamily: 'proxima-bold' }}
						onPress={() => modalPaypal()}
					/>
				</View>

				<View style={{ marginTop: '6%' }}>
					<Button
						title={t('payment.modal.textBtnSeven')}
						variant="Contained"
						style={styles.btn}
						textStyle={{
							color: '#065394',
							fontSize: 13,
							borderBottomColor: '#065394',
							fontFamily: 'proxima-bold',
						}}
						onPress={() => newPaypal()}
					/>
				</View>
			</View>
		</View>
	);
};

export const Body5 = ({ setShowModal, ageDataInsurance }: PropsBody) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text
				style={[styles.titleThree, { fontFamily: 'proxima-bold', paddingHorizontal: 10 }]}
				maxFontSizeMultiplier={1.3}
			>
				{ageDataInsurance?.code == 6
					? t('payment.modal.title1')
					: t('payment.modal.title2')}
			</Text>
			<Text
				style={[styles.subTitleFour, { marginTop: '0%', paddingTop: 10, fontSize: 18 }]}
				maxFontSizeMultiplier={1.3}
			>
				{ageDataInsurance?.code == 6 ? t('payment.modal.subt1') : t('payment.modal.subt2')}
			</Text>

			<View style={{ marginTop: '9%', alignItems: 'center' }}>
				<Button
					title={t('payment.modal.textBtnFive')}
					variant="Contained"
					style={{ backgroundColor: '#065394', padding: 15, borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14 }}
					onPress={() => setShowModal(false)}
				/>
			</View>
		</View>
	);
};

export const Body6 = ({ setShowModal }: PropsBody) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={{ alignItems: 'center' }}>
				<IconWarning />
			</View>

			<Text style={[styles.titleThree, { marginTop: '5%' }]} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.titleInfoSix')}
			</Text>
			<Text
				style={{ textAlign: 'center', fontSize: 16, color: '#055293', marginTop: '6%' }}
				maxFontSizeMultiplier={1.3}
			>
				{t('payment.modal.subTitleInfoSix')}
				<Text style={{ fontWeight: '600' }} maxFontSizeMultiplier={1.3}>
					{' ' + t('payment.modal.textSupport')}
				</Text>
			</Text>

			<View style={{ marginTop: '9%', alignItems: 'center' }}>
				<Button
					title={t('payment.modal.textBtnFive')}
					variant="Contained"
					style={{ backgroundColor: '#065394', padding: 15, borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14 }}
					onPress={() => setShowModal(false)}
				/>
			</View>
		</View>
	);
};

export const BodyCancelTransaction = ({ setShowModal }: PropsBody) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<View style={{ alignItems: 'center' }}>
				<OkIcon />
			</View>

			<Text style={styles.titleSuccesTransaction} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.succesfulTransaction')}
			</Text>

			<View style={{ marginTop: '9%', alignItems: 'center' }}>
				<Button
					title={t('payment.modal.textBtnFive')}
					variant="Contained"
					style={{ backgroundColor: '#065394', padding: 15, borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14 }}
					onPress={() => setShowModal(false)}
				/>
			</View>
		</View>
	);
};

export const BodyNotApplicable = ({ setShowModal, ageDataInsurance, modalPaypal }: PropsBody) => {
	const navigation = useNavigation();
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();

	return (
		<View style={styles.container}>
			<Text style={styles.titleNotApplicable} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.titleNotApplicable')}
			</Text>
			<Text style={styles.subTextNotApplicable} maxFontSizeMultiplier={1.3}>
				{t('payment.modal.subTextNotApplicable1')}
			</Text>
			<Text
				style={[styles.subTextNotApplicable, { lineHeight: 19, fontWeight: '500' }]}
				maxFontSizeMultiplier={1.3}
			>
				{t('payment.modal.subTextNotApplicable2')}
			</Text>
			<View style={{ marginTop: '9%', alignItems: 'center' }}>
				<Button
					title={t('payment.modal.textBtnNotApplicable')}
					variant="Contained"
					style={{ backgroundColor: '#065394', padding: 15, borderRadius: 30 }}
					textStyle={{ color: 'white' /*colors.GRAY_DARK*/, fontSize: 14 }}
					onPress={() => modalPaypal()}
				/>
			</View>
			<View style={{ marginTop: '10%' }}>
				<Button
					title={t('payment.modal.textBtnFour')}
					variant="Underline"
					style={{ backgroundColor: '#fff' }}
					textStyle={{
						fontSize: 14,
						fontFamily: 'proxima-bold',
						color: '#065394' /*colors.GRAY_DARK*/,
					}}
					onPress={() => setShowModal(false)}
				/>
			</View>
		</View>
	);
};
