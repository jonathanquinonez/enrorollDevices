import React, { useMemo, useRef } from "react";
import { View, Text, FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
//Components
import Button from "src/components/atoms/Button/Button";
import Icon from "src/components/atoms/Icon/Icon";
import IconButton from "src/components/atoms/IconButton/IconButton";
import Column from "src/components/atoms/Column/Column";
import Row from "src/components/atoms/Row/Row";
//Styles
import componentStyles from './CreateAccountPagination.styles';
import useStyles from "hooks/useStyles";
//Types
import { CreateAccountPaginationType } from './CreateAccountPagination.types';
//Images
import InfoSquare from 'icons/InfoSquare.svg';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extraScrollHeigth } from "src/utils/devices";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Support from "../../../../assets/icons/SupportIcon.svg";

/**
 * Render a CreateAccountPagination.
 * @since 1.0.0
 */
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };
const CreateAccountPaginationSSO = React.forwardRef<FlatList, CreateAccountPaginationType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const {
        bottomData,
        currentPosition,
        handlerBack,
        handlerNext,
        values,
        positionRef
    } = props;
    const bottomRef = useRef<FlatList>(null);

    const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
        ref.current?.scrollToIndex({
            animated: true,
            index: position
        })
    }

    useMemo(() => {
        updateIndexScroll(bottomRef, positionRef)
    }, [positionRef])

    const { t } = useTranslation();
    const { navigate } = useNavigation();

    const extraScrollHeight = extraScrollHeigth();

    const renderItem = ({ item }: { item: any }) => {
        return <KeyboardAwareScrollView
            enableAutomaticScroll
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            extraScrollHeight={extraScrollHeight}
            enableOnAndroid={true}
            contentContainerStyle={styles.contentContainerScroll} >
            {item.children}
            <Row style={styles.buttonNext}>
                <Button
                    accesibilityHint='button'
                    accessibilityRole='button'
                    accesibilityLabel={t('accessibility.linkSupport')}
                    icon={<Support color="#055293" />}
                    title={t('moreOptions.support')} variant='Underline'
                    style={{ marginTop: 5, marginBottom: 20, paddingLeft: 30 }}
                    textStyle={styles.textButton}
                    onPress={() => {
                        navigate<any>('ChatSanitas')
                    }}
                />
            </Row>
        </KeyboardAwareScrollView>
    };

    const MyIconButton = () => {
        return (
            <IconButton
                accessibilityHint="button"
                accessibilityLabel={t('accessibility.goBack')}
                style={styles.iconButton}
                variant="Float"
                icon={<Icon name={'arrow-left'} style={{ padding: 8 }} />}
                onPress={handlerBack}
            />
        );
    };

    const keyExtractor = (item: any, index: number) => item.id;
    return (
        <Column width={1} style={styles.layout}>
            {Platform.OS === 'ios' ?
                <MyIconButton />
                :
                <LinearGradient
                    colors={[colors.GRAY_LIGHT_4, 'transparent']}
                    locations={[0.5, 0.9]}
                    style={styles.shadow}
                >
                    <MyIconButton />
                </LinearGradient>
            }

            <Row width={1}>
                <FlatList
                    ref={bottomRef}
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
export default CreateAccountPaginationSSO;