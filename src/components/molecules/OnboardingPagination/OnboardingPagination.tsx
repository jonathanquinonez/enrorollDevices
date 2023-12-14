import React from "react";
import { View, Text, FlatList, Dimensions, AccessibilityRole } from 'react-native';
import { useTranslation } from "react-i18next";

import useStyles from "hooks/useStyles";

import Button from "src/components/atoms/Button/Button";
import Icon from "src/components/atoms/Icon/Icon";
import IconButton from "src/components/atoms/IconButton/IconButton";
import SlideIndicator from "src/components/atoms/SlideIndicator/SlideIndicator";

import componentStyles from './OnboardingPagination.styles';

import { OnboardingPaginationType, BottomDataType } from './OnboardingPagination.types';
import Row from "src/components/atoms/Row/Row";
import { ScrollView } from "react-native-gesture-handler";

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

const OnboardingPagination = React.forwardRef<FlatList, OnboardingPaginationType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { t } = useTranslation();
    const { onbType2, currentPosition, bottomData, handlerBack, handlerNext, handlerSkip, onFinish, isMentalHealth, backButtonText = `${t('onboarding.back')}` } = props;


    const renderItem = ({ item }: { item: BottomDataType }) => {
        return <View style={[styles.title_group, isMentalHealth && { marginHorizontal: 0 }]}>
            {isMentalHealth ? onbType2 ?
                <View style={{ width: Dimensions.get('window').width * 0.9 }}>
                    <>{item?.icon}</>
                    <>{item.body}</>
                </View>
                : <ScrollView>
                    {item.icon && <View style={styles.iconMentalHealth}><>{React.cloneElement(item?.icon)}</></View>}
                    <Text style={[styles.titleMentalHealth, { display: item?.title ? 'flex' : 'none' }]}>{item.title}</Text>
                    <Text style={styles.bodyMentalHealth}>{item.body}</Text>
                </ScrollView> :
                <ScrollView style={styles.scroll}>
                    <Text accessibilityRole="header" style={styles.title_font}>{item.title}</Text>
                    <Text style={{ ...styles.text_font, fontSize: item.fontSize }}>{item.body}</Text>
                </ScrollView>}
        </View>
    };

    const keyExtractor = (item: any, index: number) => item.id;

    return (
        <View style={[isMentalHealth ? { width: Dimensions.get('window').width * 0.85, height: 510 } : styles.layout, onbType2 && { height: 'auto' }]}>
            {isMentalHealth && !onbType2 && <Text accessibilityRole="header" style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>{t('onboardingMH.title')}</Text>}
            {!onbType2 && <Row style={{ justifyContent: 'center' }}>
                <View style={styles.indicator_container}>
                    <SlideIndicator currentPosition={currentPosition} length={bottomData.length} />
                </View>
            </Row>}
            <Row width={isMentalHealth ? 6 : 5}>
                <View style={styles.title_container}>
                    <FlatList
                        ref={ref}
                        data={bottomData}
                        contentContainerStyle={{ alignItems: 'center' }}
                        renderItem={renderItem}
                        scrollEnabled={false}
                        pagingEnabled
                        horizontal
                        keyExtractor={keyExtractor}
                        showsHorizontalScrollIndicator={false}
                        viewabilityConfig={itemVisibleHotfix}
                    />
                </View>
            </Row>
            {onbType2 && <Row style={{ justifyContent: 'center' }}>
                <View>
                    <SlideIndicator currentPosition={currentPosition} length={bottomData.length} />
                </View>
            </Row>}
            {!onbType2 && <Row style={{ justifyContent: 'center' }}>
                <View style={styles.actions_container}>
                    {
                        (currentPosition + 1) < bottomData.length ? (<>
                            <Button
                                accessibilityRole='link'
                                title={t('onboarding.skip')}
                                variant="Text"
                                onPress={onFinish}
                                textStyle={{ fontFamily: 'proxima-bold', fontSize: 16, paddingLeft: 10, paddingVertical: 5 }} />
                            <View style={styles.group_button}>
                                {currentPosition > 0 && <IconButton accessibilityLabel={t('accessibility.previous')} style={{ marginRight: 15 }} icon={<Icon name='angle-left' />} variant='RadianceBlue' onPress={handlerBack} />}
                                <IconButton
                                    accessibilityLabel={t('accessibility.next')}
                                    icon={<Icon name='angle-right' />}
                                    variant='RadianceBlue'
                                    onPress={handlerNext} />
                            </View>
                        </>
                        ) : (currentPosition > 0 ?
                            <>
                                <Button title={backButtonText} variant="Text" onPress={handlerBack} textStyle={{ fontFamily: 'proxima-bold', fontSize: 16 }} />
                                <View style={styles.group_button}>
                                    <Button
                                        title={t('onboarding.start')}
                                        style={{ height: 40, marginVertical: 10 }}
                                        onPress={onFinish} />
                                </View>
                            </> : null
                        )
                    }
                </View>
            </Row>}
        </View>
    )

});
export default OnboardingPagination;