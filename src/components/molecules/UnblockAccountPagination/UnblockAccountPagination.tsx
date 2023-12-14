import React, { useMemo, useRef } from "react";
import { FlatList } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

//Components
import Icon from "src/components/atoms/Icon/Icon";
import IconButton from "src/components/atoms/IconButton/IconButton";
import Column from "src/components/atoms/Column/Column";
import Row from "src/components/atoms/Row/Row";
//Styles
import componentStyles from './UnblockAccountPagination.styles';
import useStyles from "hooks/useStyles";
import { extraScrollHeigth } from "src/utils/devices";
//Types
import { UnblockAccountPaginationType } from './UnblockAccountPagination.types';

/**
 * Render a UnblockAccountPagination.
 * @since 1.0.0
 */
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };
const UnblockAccountPagination = React.forwardRef<FlatList, UnblockAccountPaginationType>(({ ...props }) => {

    const { styles } = useStyles(componentStyles);
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

    const renderItem = ({ item }: { item: any }) => {
        return <KeyboardAwareScrollView
            enableAutomaticScroll
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            extraScrollHeight={extraScrollHeight}
            enableOnAndroid={true}
            contentContainerStyle={styles.contentContainerScroll} >
            {item.children}
        </KeyboardAwareScrollView>
    };

    const extraScrollHeight = extraScrollHeigth();


    const keyExtractor = (item: any) => item.id;
    return (
        <Column width={1} style={styles.layout}>
            <IconButton style={styles.iconButton} variant="Float" icon={<Icon name={'arrow-left'} />} onPress={handlerBack} />
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
export default UnblockAccountPagination;