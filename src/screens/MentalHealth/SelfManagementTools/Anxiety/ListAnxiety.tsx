import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TouchableOpacity } from 'react-native';
import useStyles from 'hooks/useStyles';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import componentStyles from './ListAnxiety.style';
import { useNavigation } from '@react-navigation/native';
import ThoughtBubble from 'icons/MentalHealthIcons/SelfManagementTools/thought-bubble.svg';
import Actions from 'icons/MentalHealthIcons/Anxiety/Actions.svg';
import Feelings from 'icons/MentalHealthIcons/Anxiety/Feelings.svg';
import Physical from 'icons/MentalHealthIcons/Anxiety/Physical.svg';
import { extraScrollHeigth } from 'src/utils/devices';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { convertMonth2 } from 'src/components/molecules/CardDate/CardDate.types';


export const ListAnxiety = ({ route }: any) => {
    const { data, thinking } = route.params;
    const navigation: any = useNavigation();
    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const extraScrollHeight = extraScrollHeigth();
    const getFeling = data?.physicalSymptoms?.toUpperCase().split("|");
    const getPhysical = data?.feeling?.toUpperCase().split("|");

    const findTitleThinking = (uuid: string, lenguage: 'es' | 'en') => {
        try {
            const leeter = lenguage == 'es' ? 'Es' : 'En'
            const searchResult = thinking?.find((e: any) => e?.uuid == uuid)?.[`content${leeter}`]
            return searchResult ? searchResult : uuid
        } catch (error) {
            return uuid
        }
    }

    const body = () => {
        return (
            <KeyboardAwareScrollView
                enableAutomaticScroll
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                extraScrollHeight={extraScrollHeight}
                enableOnAndroid={true}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <Text style={styles.title}>{convertMonth2(data?.dateTime, t('general.locale'))}</Text>
                <View style={styles.contentTitleGeneral}>
                    <ThoughtBubble />
                    <Text accessibilityRole='header' style={styles.title}>{t('myHealth.screenUnderstandingYourAnxiety.titleViewBtns')}</Text>
                </View>
                <Text style={[styles.subTitle, styles.styleTextSub]}>{t('myHealth.screenUnderstandingYourAnxiety.subTitleViewBtns')}</Text>

                <View
                    style={styles.rectangleContent}
                >
                    <Text style={styles.textRectangle}>{findTitleThinking(data.thinking, t('general.locale'))}</Text>
                </View>
                <Text style={[styles.textRectangle, styles.textCenter]}>{t('myHealth.screenUnderstandingYourAnxiety.titlePlease') + ':'}</Text>

                <View style={styles.viewBodyText}>
                    <Text style={styles.textBody}>{data.moreAbout}</Text>
                </View>

                <View style={styles.contentTitleActions}>
                    <View style={styles.viewIcon}>
                        <Actions />
                    </View>

                    <View>
                        <Text style={styles.title}>{t('myHealth.screenUnderstandingYourAnxiety.titleTextArea')}</Text>
                        <Text>{t('myHealth.screenUnderstandingYourAnxiety.titleSituation')}</Text>
                    </View>
                </View>
                <View style={styles.viewBodyText}>
                    <Text style={styles.textBody}>{data.actions}</Text>
                </View>


                <View style={styles.contentTitleActions}>
                    <View style={styles.justyCenter}>
                        <Feelings />
                    </View>

                    <View>
                        <Text style={styles.title}>{t('myHealth.screenUnderstandingYourAnxiety.titleTextAreaTwo')}</Text>
                        <Text>{t('myHealth.screenUnderstandingYourAnxiety.titleSituationTwo')}</Text>
                    </View>
                </View>

                <View style={styles.viewFellings}>
                    {getFeling?.map((v: string, i: number) => {
                        return (
                            v.length ?
                                <View
                                    key={i}
                                    style={styles.BtnFellings}
                                >
                                    <Text style={styles.textFellings}>{v}</Text>
                                </View> : <></>
                        )
                    })
                    }
                </View>

                <View style={styles.contentTitleActions}>
                    <View style={styles.viewIconPsycal}>
                        <Physical />
                    </View>

                    <View>
                        <Text style={styles.title}>{t('myHealth.screenUnderstandingYourAnxiety.titlePhysical')}</Text>
                        <Text>{t('myHealth.screenUnderstandingYourAnxiety.subTitlePhysical')}</Text>
                    </View>
                </View>
                <View style={styles.viewContentFellings}>
                    {getPhysical?.map((v: string, i: number) => {
                        return (
                            v.length ?
                                <View
                                    style={styles.BtnFellings}
                                >
                                    <Text style={styles.textFellings}>{v}</Text>
                                </View> : <></>
                        )
                    })
                    }
                </View>

                <View style={styles.viewEnd}></View>
            </KeyboardAwareScrollView>
        )
    }

    return (
        <RootGeneral
            title={t('myHealth.screenUnderstandingYourAnxiety.titleUnderstandingYourAnxiety')}
            subtitle={t('myHealth.screenUnderstandingYourAnxiety.subTitleUnderstandingYourAnxiety')}
            onPressGoBack={() => navigation.goBack()}
            content={
                body()
            }
            isButton={false}
            isForm
        />
    );
};