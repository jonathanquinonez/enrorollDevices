import React from "react";
import { View, FlatList, } from "react-native";
import Image from 'react-native-scalable-image';

import useStyles from "hooks/useStyles";

import { LinearGradient } from 'expo-linear-gradient';

import componentStyles from './OnboardingMedia.styles';

import { MediaDataType, OnboardingMediaType } from "./OnboardingMedia.types";
import Row from "src/components/atoms/Row/Row";
import { centerElement, windowDimentions } from "ui-core/utils/globalStyles";
import Logo from "src/components/atoms/Logo/Logo";
import Header from "../Header/Header";

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

const OnboardingMedia = React.forwardRef<FlatList, OnboardingMediaType>(({ ...props }, ref) => {

    const { styles, colors } = useStyles(componentStyles);
    const { mediaData, currentPosition } = props;

    const renderItem = ({ item }: { item: MediaDataType }) => {
        return <View style={{width: windowDimentions.width, alignContent: 'center', alignItems: 'center'}} >
            <Image width={item.width} source={item.imageSource} />
        </View>
    };

    const keyExtractor = (item: any, index: number) => item.id;

    return (
        <LinearGradient
            colors={['rgba(9, 9, 9 , 0.4)', colors.primary]}
            locations={[0, 0.4]}
            style={{ flex: 1 }}
        >
            <Header/>
            <Row width={3}>
                <FlatList
                    ref={ref}
                    data={mediaData}
                    contentContainerStyle={{ alignItems: 'center'}}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    pagingEnabled
                    horizontal
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    viewabilityConfig={itemVisibleHotfix}
                />
            </Row>
        </LinearGradient>
    )
});


export default OnboardingMedia;