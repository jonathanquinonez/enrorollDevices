import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
//Components
import Button from "src/components/atoms/Button/Button";
import Icon from "src/components/atoms/Icon/Icon";
import IconButton from "src/components/atoms/IconButton/IconButton";
//Styles
import componentStyles from './PatientRegisPagination.styles';
import useStyles from "hooks/useStyles";
//Types
import { PatientRegisPaginationType } from './PatientRegisPagination.types';
import Row from "src/components/atoms/Row/Row";
import Column from "src/components/atoms/Column/Column";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extraScrollHeigth } from "src/utils/devices";
import Support from '../../../../assets/icons/SupportIcon.svg';
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';

/**
 * Render a ForgotPasswPagination.
 * @since 1.0.0
 */
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };
const PatientRegisPagination = React.forwardRef<FlatList, PatientRegisPaginationType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { bottomData, currentPosition, handlerBack, handlerNext } = props;
    const { t, i18n } = useTranslation();
    const [tempValues, setTempValues] = useState<any>();
    const lng: string = i18n.language.slice(0, 2);
    const navigation = useNavigation();
    const { editAccountdata } = useAppSelector(userSelectors.selectEditAccountdata);

    const [newBtnData, setNewBtnData] = useState<any[]>([])

    const getItemInfo = async (btnData: any[]) => {
        let values: any;
        values = await AsyncStorage.getItem('loadUserInfoByCode');
        let valuesParse = JSON.parse(values)
        setTempValues(valuesParse)
        const tempBottomData = btnData;
        if (!valuesParse?.patientInformation || editAccountdata?.isNewVersion) {
            tempBottomData.splice(1, 1)
        }
        setNewBtnData(tempBottomData)
    }

    useEffect(() => {
        getItemInfo(bottomData)
    }, [bottomData])

    const extraScrollHeight = extraScrollHeigth();

    const renderItem = ({ item }: { item: any }) => {
        return <View>
            <KeyboardAwareScrollView 
                enableAutomaticScroll
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                extraScrollHeight={extraScrollHeight}
                enableOnAndroid={true} 
                contentContainerStyle={styles.contentContainerScroll} >
                {item.children}
                <Row>
                    {currentPosition > 0 ? <View style={styles.buttonBack}>
                        <Button
                            accesibilityLabel={t('accessibility.goBack')}
                            onPress={handlerBack}
                            title={t('patientRegistration.back')}
                            style={{
                                paddingHorizontal: lng == 'es' ? currentPosition == 1 && 22  : currentPosition == 1 ? 38 : 34,
                                backgroundColor: "#F5F5F5",
                                borderColor: "#0069A7",
                                borderWidth: 1,
                                marginBottom: 25,
                                marginLeft:10
                            }}
                            textStyle={styles.secondaryText}
                        />
                        <Button
                            accesibilityLabel={t('accessibility.linkSupport')}
                            icon={<Support />} 
                            title={t('moreOptions.support')} variant='Underline' 
                            style={{marginTop: 5,marginBottom: 20, paddingLeft: 30}} 
                            textStyle={styles.textButton} 
                            onPress={() => {
                                navigation.navigate<any>('ChatSanitas')
                            }}  
                        />
                    </View> : <></>}
                </Row>
            </KeyboardAwareScrollView>
        </View>
    };

    const keyExtractor = (item: any, index: number) => item.id;
    return (
        <Column width={1} style={styles.layout}>
            {
                currentPosition > 0 ? 
                (<IconButton style={styles.iconButton} variant="Float" icon={<Icon name={'arrow-left'} />} onPress={handlerBack} />)
                : <></>
            }
            <View style={{ marginLeft: '4.5%', marginTop: 20, paddingBottom: 10 }}>
                <Text style={styles.textTitle} maxFontSizeMultiplier={1.3}>
                    {t('patientRegistration.sectionTittle')}
                </Text>
                <Text style={styles.name} maxFontSizeMultiplier={1.3}>
                    {tempValues?.patientInformation?.firstName ?? tempValues?.firstName ?? ''} {tempValues?.patientInformation?.lastName ?? tempValues?.lastName ?? ''}
                </Text>
            </View>
            <Row width={1}>
                <FlatList
                    ref={ref}
                    contentContainerStyle={{ flexGrow: 1 }}
                    data={bottomData}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    pagingEnabled
                    horizontal
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={itemVisibleHotfix}
                />
            </Row>
        </Column>
    )
});
export default PatientRegisPagination;