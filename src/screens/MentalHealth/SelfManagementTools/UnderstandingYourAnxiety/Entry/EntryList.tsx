import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment, { utc } from 'moment';
import FORMATS from 'ui-core/utils/formats';
import { View, Text, Dimensions, TouchableOpacity, TextInput, Platform } from 'react-native';
import Button from 'src/components/atoms/Button/Button';
import ProgressBar from 'src/components/atoms/ProgressBar/ProgressBar';
import componentStyles from './Entry.style';
import useStyles from 'hooks/useStyles';
import ThoughtBubble from 'icons/MentalHealthIcons/SelfManagementTools/thought-bubble.svg';
import ThoughtActions from 'icons/MentalHealthIcons/SelfManagementTools/actions.svg';
import ThoughtFeelings from 'icons/MentalHealthIcons/SelfManagementTools/feelings.svg';
import ThoughtPhysical from 'icons/MentalHealthIcons/SelfManagementTools/physical.svg';
import Tcc from 'icons/MentalHealthIcons/SelfManagementTools/tcc.svg';
import Grafic from 'icons/MentalHealthIcons/SelfManagementTools/grafic.svg';
import GraficEn from 'icons/MentalHealthIcons/SelfManagementTools/graficEn.svg';
import TrophyStar from 'icons/MentalHealthIcons/SelfManagementTools/trophyStar.svg';
import { useNavigation } from '@react-navigation/native';
import { EntryProps, RectangleProps, RenderStartProps } from './Entry.types';
import { LinearGradient } from 'expo-linear-gradient';
import { extraScrollHeigth } from 'src/utils/devices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';
import ModalWarning from 'src/components/molecules/ModalWarning/ModalWarning';
import IconWarning from 'icons/IconWarning.svg';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { userSelectors } from 'adapter/user/userSelectors';
import { useAppSelector } from 'adapter/hooks';
import getAnxietyService from 'adapter/api/anxietyService';


export const EntryList: React.FC<EntryProps> = (props) => {
	const { onPress, currentPosition, setPosition, idSelected, setIdSelected, setStepTwo, changeStepTwo } = props;
	const { t } = useTranslation();
	const { styles } = useStyles(componentStyles);
	const [ageData, setData] = useState<any>([])
	const [ageDataPhysical, setDataPhysical] = useState<any>([])
	const [ageDataFeelings, setDataFeelings] = useState<any>([]);
	const [ageSelectOptionF, setSelectOptionF] = useState<any>([]);
	const [ageSelectOptionP, setSelectOptionP] = useState<any>([]);
	const [agePositionType, setPositionType] = useState<string>("");
	const [ageTextInputT, setTextInputT] = useState<string>("");
	const [ageTextInputA, setTextInputA] = useState<string>("");
	const [ageSubTitle, setSubSubTitle] = useState<string>("");
	const [ageTitle, setTitle] = useState<string>(t('general.locale') === "en" ? "Thinking" : "Pensamiento");
	const [ageEndStep, setEndStep] = useState<boolean>(false);
	const { closeModal, setModal } = useBottomSheet();
	const [getData] = getAnxietyService.useGetAnxietyParamsMutation();
	const [sendData] = getAnxietyService.useSendAnxietyParamsMutation();
	const { setAlertErrorMessage } = useErrorAlert();
	const userInformation = useAppSelector(userSelectors.selectUser);
	const { dataInformationInsurance } = useAppSelector(userSelectors.selectIsLoggedIn);


	const getAnxiety = async (type: string) => {
		try {
			const resp = await getData(type).unwrap();
			if (resp) {
				ageTitle === "Actions" || ageTitle === "Acciones" ?
					setDataFeelings(resp)
					: ageTitle === "Feelings" || ageTitle === "Sentimientos" ?
						setDataPhysical(resp)
						: setData(resp)
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}

	useEffect(() => {
		if (setStepTwo) {
			changeStepTwo("Thinking", true)
			setTitle(t('general.locale') === "en" ? "Thinking" : "Pensamiento");
			setPositionType("Thinking");
			setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.titlePlease'))
		}
	}, [setStepTwo])

	useEffect(() => {
		switch (currentPosition) {
			case 1:
				if (ageData.length === 0) {
					getAnxiety("Thinking");
				}
				setTitle(t('general.locale') === "en" ? "Thinking" : "Pensamiento")
				setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.titlePlease'))
				break;
			case 2:
				if (agePositionType === "Actions" || agePositionType === "Acciones") {
					setTitle(t('general.locale') === "en" ? "Actions" : "Acciones")
					setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.titleSituation'))
					changeStepTwo("Actions", true)
				}
				break;
			case 3:
				setTitle(t('general.locale') === "en" ? "Feelings" : "Sentimientos");
				setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.subTitleTextAreaThree'))
				break;
		}
	}, [currentPosition])

	const findTitleThinking = (uuid: string | number, lenguage: 'es' | 'en') => {
		try {
			const leeter = lenguage == 'es' ? 'Es' : 'En'
			const searchResult = ageData?.find((e: any) => e?.uuid == uuid)?.[`content${leeter}`]
			return searchResult ? searchResult : uuid
		} catch (error) {
			return uuid
		}
	}

	const handleSubmit = async () => {
		let getPhysical = "";
		let getFeeling = "";
		ageSelectOptionF.map((v: any) => { return getPhysical += v });
		ageSelectOptionP.map((v: any) => { return getFeeling += v });
		const data = {
			"uuid": '',
			"date": null,
			"authUid": userInformation.authUid,
			"thinking": findTitleThinking(idSelected, t('general.locale')),
			"moreAbout": ageTextInputT,
			"actions": ageTextInputA,
			"feeling": getFeeling,
			"physicalSymptoms": getPhysical,
			"patientId": userInformation?.ecwId ?? dataInformationInsurance?.paientId
		}

		try {
			const resp = await sendData(data).unwrap();
			if (resp) {
				changeStepTwo(" ", false)
				setPosition(5);
				setTitle(t('myHealth.screenUnderstandingYourAnxiety.titleViewCards'));
			}
		} catch (error) {
			setAlertErrorMessage(t(`errors.code${error}`))
		}
	}

	const handleEnd = () => {
		setEndStep(true);
		setTitle(t('myHealth.screenUnderstandingYourAnxiety.titleViewTwo'))
	}

	const handleShowAlert = (title: string) => {
		setModal({
			render: () => (
				<ModalWarning
					icon={<IconWarning />}
					warningText={title}
					onPress={() => { closeModal() }}
				/>
			), height: 320, blockModal: false
		});
	}

	const handleNext = (valInput: string) => {
		if (currentPosition === 1 && idSelected === 0) {
			handleShowAlert(t('myHealth.screenUnderstandingYourAnxiety.alertSelectThinkin'))
		} else if ((currentPosition === 2 && valInput !== "") && (valInput.length >= 10 && valInput.length <= 500)) {
			setPositionType(ageTitle)
			let getVal = t('general.locale') === "en" ? "Actions" : "Acciones"

			if (ageTitle === getVal || agePositionType === getVal) {
				changeStepTwo("Feelings", true)
				ageSelectOptionF.length === 0 ? getAnxiety("Feeling") : null
				setTitle(t('general.locale') === "en" ? "Feelings" : "Sentimientos");
				setPosition(3)
			} else {
				changeStepTwo("Actions", true)
				setTitle(t('general.locale') === "en" ? "Actions" : "Acciones")
				setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.titleSituation'))
			}
		} else if (currentPosition === 2) {
			handleShowAlert(ageTitle === "Thinking" || ageTitle === "Pensamiento" ?
				t('myHealth.screenUnderstandingYourAnxiety.alertThinkin')
				:
				t('myHealth.screenUnderstandingYourAnxiety.alertActions')
			)
		} else if (currentPosition === 3) {
			setPosition(4);
			ageSelectOptionP.length === 0 ? getAnxiety("Physical Symptoms") : null
			setTitle(t('general.locale') === "en" ? "Physical symptoms" : "Síntomas físicos");
			setSubSubTitle(t('myHealth.screenUnderstandingYourAnxiety.subTitlePhysical'))
		} else {
			setPosition(2)
		}
	}

	const handleChangeInput = (item: string) => {
		if (ageTitle === "Thinking" || ageTitle === "Pensamiento") {
			setTextInputT(item);
		} else {
			setTextInputA(item);
		}
	}

	const handleSelectOption = (option: string, i: number) => {
		const setVal = (option === "Feelings" || option === "Sentimientos") ? ageDataFeelings : ageDataPhysical

		let copy = setVal.map((val: any) => {
			if (val.order === i) {
				let getV = t('general.locale') === "en" ? val.contentEn : val.contentEs;

				if (val.status) {
					option === "Feelings" || option === "Sentimientos" ?
						setSelectOptionF((oldArray: any) => [...oldArray, getV + '|'])
						:
						setSelectOptionP((oldArray: any) => [...oldArray, getV + '|'])
				} else {
					option === "Feelings" || option === "Sentimientos" ?
						setSelectOptionF([
							...ageSelectOptionF.slice(0, ageSelectOptionF.indexOf(getV + '|')),
							...ageSelectOptionF.slice(ageSelectOptionF.indexOf(getV + '|') + 1, ageSelectOptionF.length)
						])
						:
						setSelectOptionP([
							...ageSelectOptionP.slice(0, ageSelectOptionP.indexOf(getV + '|')),
							...ageSelectOptionP.slice(ageSelectOptionP.indexOf(getV + '|') + 1, ageSelectOptionP.length)
						])
				}

				return {
					...val,
					status: !val.status
				};
			}
			return val;
		});

		if (option === "Feelings" || option === "Sentimientos") {
			setDataFeelings(copy)
		} else {
			setDataPhysical(copy)
		}
	}

	const extraScrollHeight = extraScrollHeigth();
	return (
		<View>
			{ageData.length > 0 ?
				<View style={{ marginTop: 20 }}>
					{ageEndStep === false ?
						<View>
							<ProgressBar position={currentPosition} />
							<LinearGradient
								colors={['rgba(241,241,241, 1)', Platform.OS === 'ios' ? '' : 'transparent']}
								locations={[0, 0.7]}
								style={styles.gradientTop}
							/>
							<KeyboardAwareScrollView
								enableAutomaticScroll
								keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
								extraScrollHeight={extraScrollHeight}
								enableOnAndroid={true}
								contentContainerStyle={{ flexGrow: 1 }}
							>
								<View style={styles.contentTitleGeneral}>
									{(ageTitle === "Actions" || ageTitle === "Acciones") || (ageTitle === "Feelings" || ageTitle === "Sentimientos") ?
										ageData.map((item: any, i: number) =>
											<Rectangle key={`list${i}`}
												id={item.uuid}
												width={Dimensions.get('window').width * 0.8}
												idSelected={idSelected}
												position={currentPosition}
												text={t('general.locale') === "en" ? item.contentEn : item.contentEs}
												onPress={(id) => {
													setIdSelected(id);
													setPosition(2)
												}}
											/>
										)
										: null
									}

									{currentPosition == 4 ?
										ageData.map((item: any, i: number) =>
											<Rectangle key={`list${i}`}
												id={item.uuid}
												width={Dimensions.get('window').width * 0.8}
												idSelected={idSelected}
												position={currentPosition}
												text={t('general.locale') === "en" ? item.contentEn : item.contentEs}
												onPress={(id) => {
													setIdSelected(id);
													setPosition(4)
												}}
											/>
										)
										: null
									}

									<View style={ageTitle == "Actions" || ageTitle === "Acciones" ? styles.directionRowActions : styles.directionRow}>
										{ageTitle === "Thinking" || ageTitle === "Pensamiento" ? <ThoughtBubble />
											: ageTitle === "Actions" || ageTitle === "Acciones" ? <ThoughtActions />
												: (ageTitle === "Feelings" || ageTitle === "Sentimientos") && ageDataFeelings.length > 0 ? <ThoughtFeelings />
													: (ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos") && ageDataPhysical.length > 0 ? <ThoughtPhysical />
														: currentPosition === 5 ? <Tcc /> : null
										}
										<Text style={ageTitle === "Thinking" || ageTitle === "Pensamiento" ? styles.title
											: (ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos") && ageDataPhysical.length === 0 ? styles.displayNone
												: (ageTitle === "Feelings" || ageTitle === "Sentimientos") && ageDataFeelings.length === 0 ? styles.displayNone : styles.titleTwo
										}
										>
											{ageTitle}
										</Text>
									</View>
								</View>

								{currentPosition == 1 && <Text accessibilityRole='header' style={[styles.subTitle, styles.styleTextInput]}>{t('myHealth.screenUnderstandingYourAnxiety.subTitleViewBtns')}</Text>}

								{ageTitle === "Thinking" || ageTitle === "Pensamiento" ?
									ageData.map((item: any, i: number) =>
										<Rectangle key={`list${i}`}
											id={item.uuid}
											width={Dimensions.get('window').width * 0.8}
											idSelected={idSelected}
											position={currentPosition}
											text={t('general.locale') === "en" ? item.contentEn : item.contentEs}
											onPress={(id) => {
												if (idSelected === id) {
													setIdSelected(0);
												} else {
													setIdSelected(id);
												}
											}}
										/>
									) : null
								}

								{currentPosition === 2 ?
									<>
										<Text style={[ageTitle === "Thinking" || ageTitle === "Pensamiento" ? styles.styleTextSubThing : t('general.locale') === "en" ? styles.styleTextSubEn : styles.styleTextSub]}>
											{ageSubTitle}
										</Text>
										<Text style={[styles.styleTextSubThing, { color: '#5B5C5B', marginLeft: '-5%', paddingTop: 10 }]}>
											{t('myHealth.screenUnderstandingYourAnxiety.limitAnswer')}
										</Text>
										<TallInput callBack={handleChangeInput} valInput={ageTitle === "Thinking" || ageTitle === "Pensamiento" ? ageTextInputT : ageTextInputA} />
									</>
									: ((ageTitle === "Feelings" || ageTitle === "Sentimientos") && ageDataFeelings.length > 0) || ((ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos") && ageDataPhysical.length > 0) ?
										<Text style={ageTitle === "Feelings" || ageTitle === "Sentimientos" ?
											(t('general.locale') === "en" ? styles.styleTextSubFeeliEn : styles.styleTextSubFeeli)
											: ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos" ?
												t('general.locale') === "en" ? styles.styleTextSubPhysEn : styles.styleTextSubPhys
												: t('general.locale') === "en" ? styles.styleTextSubFeEn : styles.styleTextSubFe
										}
										>
											{ageSubTitle}
										</Text>
										: null
								}

								{ageTitle === "Feelings" || ageTitle === "Sentimientos" ?
									<View style={styles.viewContFellings}>
										{ageDataFeelings.map((v: any, i: number) => {
											return (
												<View style={i % 2 ? styles.viewFellingsLeft : styles.viewFellingsRight} key={`list${i}`}>
													<TouchableOpacity
														accessibilityRole='button'
														style={v?.status == false ? styles.btnFellingsActive : styles.btnFellings}
														onPress={() => handleSelectOption(ageTitle, v.order)}
													>
														<Text style={v?.status == false ? styles.textFellingsActive : styles.textFellings}>{t('general.locale') === "en" ? v.contentEn : v.contentEs}</Text>
													</TouchableOpacity>
												</View>
											)
										})}
									</View>
									: null
								}

								{ageTitle == "Physical symptoms" || ageTitle === "Síntomas físicos" ?
									<View style={styles.viewContFellings}>
										{ageDataPhysical.map((v: any, i: number) => {
											return (
												<View style={i % 2 ? styles.viewFellingsLeft : styles.viewFellingsRight} key={`list${i}`}>
													<TouchableOpacity
														accessibilityRole='button'
														style={v?.status == false ? styles.btnFellingsActive : styles.btnFellings}
														onPress={() => handleSelectOption(ageTitle, v.order)}
													>
														<Text style={v?.status == false ? styles.textFellingsActive : styles.textFellings}>{t('general.locale') === "en" ? v.contentEn : v.contentEs}</Text>
													</TouchableOpacity>
												</View>
											)
										})}
									</View>
									: null
								}

								{currentPosition == 5 ?
									<>
										<View style={styles.viewGrafic}>
											<Text style={styles.textGrafic}>
												{t('myHealth.screenUnderstandingYourAnxiety.subTitleViewCards')}
												<Text style={styles.fontBold}>{' ' + t('myHealth.screenUnderstandingYourAnxiety.subTitleViewCardsBold')}</Text>
												{' ' + t('myHealth.screenUnderstandingYourAnxiety.subTitleViewCardsTwo')}
											</Text>
										</View>
										{
											t('general.locale') === "en" ?
												<View style={styles.viewIconGraficEn}>
													<GraficEn />
												</View>
												:
												<View style={styles.viewIconGrafic}>
													<Grafic />
												</View>
										}
									</>
									: null
								}

								<View style={styles.btnNext}>
									<Button
										title={ageTitle == "Physical symptoms" || ageTitle === "Síntomas físicos" ? t('myHealth.screenUnderstandingYourAnxiety.btnSubmit') : currentPosition == 5 ? t('myHealth.screenUnderstandingYourAnxiety.btnNext') : t('myHealth.screenUnderstandingYourAnxiety.btnEnter')}
										onPress={() => ageTitle == "Physical symptoms" || ageTitle === "Síntomas físicos" ?
											handleSubmit()
											: currentPosition == 5 ?
												handleEnd()
												: handleNext(ageTitle === "Thinking" || ageTitle === "Pensamiento" ? ageTextInputT : ageTextInputA)
										}
										disabled={(ageTitle === "Feelings" || ageTitle === "Sentimientos") && ageSelectOptionF.length === 0 ? true :
											(ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos") && ageSelectOptionP.length === 0 ? true : false
										}
										style={(ageTitle === "Physical symptoms" || ageTitle === "Síntomas físicos") && ageDataPhysical.length === 0 ? styles.displayNone
											: (ageTitle === "Feelings" || ageTitle === "Sentimientos") && ageDataFeelings.length === 0 ? styles.displayNone : null
										}
									/>
								</View>
							</KeyboardAwareScrollView>
						</View>
						:
						<RenderStart title={ageTitle} scroll={extraScrollHeight} />
					}
				</View>
				: <View style={styles.void}></View>
			}
		</View>
	);
};

const TallInput: React.FC = (props) => {
	const { callBack, valInput } = props;
	const { t } = useTranslation();
	const [ageValue, setValue] = useState<string>("");
	const { styles } = useStyles(componentStyles);

	useEffect(() => {
		setValue(valInput);
	}, [valInput]);

	return (
		<View style={styles.input}>
			<TextInput
				maxLength={500}
				keyboardType='ascii-capable'
				textAlignVertical={'top'}
				multiline={true}
				placeholder={t('myHealth.screenUnderstandingYourAnxiety.placeholderTextArea')}
				value={ageValue}
				onChangeText={(val) => {
					let y = val.replace(/[|]/g, '');
					setValue(y);
					callBack(y);
				}}
				placeholderTextColor={'#5B5C5B'}
				style={styles.inputContent} />
		</View>
	);
};

const Rectangle: React.FC<RectangleProps> = (props) => {
	const { onPress, idSelected, width, text, id, position } = props;
	const { styles } = useStyles(componentStyles);

	return (
		<TouchableOpacity
			accessibilityRole='button'
			disabled={idSelected === id && position !== 1}
			style={[styles.rectangleContent,
			{ width, display: idSelected && idSelected !== id && position !== 1 ? 'none' : 'flex' },
			idSelected === id && { backgroundColor: '#0069A7' }
			]}
			onPress={() => onPress(id)}
		>
			<Text style={[styles.textRectangle, idSelected === id && { color: '#FFF' }]}>{text}</Text>
		</TouchableOpacity>
	);
};

const RenderStart: React.FC<RenderStartProps> = (props) => {
	const { title, scroll } = props;
	const navigation: any = useNavigation();
	const { t } = useTranslation();
	const { styles } = useStyles(componentStyles);

	return (
		<KeyboardAwareScrollView
			enableAutomaticScroll
			keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
			extraScrollHeight={scroll}
			enableOnAndroid={true}
			contentContainerStyle={{ flexGrow: 1 }}
		>
			<View style={styles.viewStart}>
				<Text style={styles.titleMadeIt}>{title}</Text>
				<TrophyStar />

				<Text style={styles.textSubtitleStart}>{t('myHealth.screenUnderstandingYourAnxiety.subTitleViewTwo')}</Text>

				<Button
					title={t('myHealth.screenUnderstandingYourAnxiety.btnTitlesViewTwo')}
					onPress={() =>
						navigation.navigate('UnderstandingYourAnxietyScreen')
					}
				/>

				<Text style={styles.texBtnStart}>{t('myHealth.screenUnderstandingYourAnxiety.btnTitleViewTwo')}</Text>
			</View>
		</KeyboardAwareScrollView>
	)
}