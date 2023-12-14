import React, { useMemo, useRef } from "react";
import { View, Text, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";
//Components
import Button from "src/components/atoms/Button/Button";
import Icon from "src/components/atoms/Icon/Icon";
import IconButton from "src/components/atoms/IconButton/IconButton";
//Styles
import componentStyles from './ForgotPasswPagination.styles';
import useStyles from "hooks/useStyles";
//Types
import { ForgotPasswPaginationType } from './ForgotPasswPagination.types';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { extraScrollHeigth } from "src/utils/devices";

/**
 * Render a ForgotPasswPagination.
 * @since 1.0.0
 */
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };
const ForgotPasswPagination = React.forwardRef<FlatList, ForgotPasswPaginationType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { bottomData, handlerBack, handlerNext, positionRef } = props;
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

    const renderItem = ({ item }: { item: any }) => {
        return <View>
            <Text style={styles.title_font} maxFontSizeMultiplier={1.3}>{item.id != 2 ? item.title : ''}</Text>
            {item.children}
        </View>
    };

    const extraScrollHeight = extraScrollHeigth();


    const keyExtractor = (item: any, index: number) => item.id;
    return (
        <View style={styles.layout}>
            <IconButton accessibilityLabel={t('accessibility.goBack')} style={styles.iconButton} variant="Float" icon={<Icon name={'arrow-left'} />} onPress={handlerBack} />
            <KeyboardAwareScrollView
                enableAutomaticScroll
                keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
                extraScrollHeight={extraScrollHeight}
                enableOnAndroid={true}
                style={styles.container}>
                <FlatList
                    ref={bottomRef}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    data={bottomData}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    pagingEnabled
                    horizontal
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={itemVisibleHotfix}
                />
            </KeyboardAwareScrollView>
        </View>
    )
});
export default ForgotPasswPagination;