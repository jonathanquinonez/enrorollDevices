import React, { useState } from 'react';
import { FlatList, View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';

//Components
import OnboardingMedia from 'src/components/molecules/OnboardingMedia/OnboardingMedia';
import OnboardingPagination from 'src/components/molecules/OnboardingPagination/OnboardingPagination';

//Types
import { OnboardingIntroProps } from './Onboarding.types';

//Styles
import componentStyles from './Onboarding.styles';
import { container } from 'ui-core/utils/globalStyles';
import Row from 'src/components/atoms/Row/Row';
import Column from 'src/components/atoms/Column/Column';
import { useSwipe } from 'hooks/useSwipe';

const OnboardingIntro: React.FC<OnboardingIntroProps> = (props) => {
	const { styles, colors } = useStyles(componentStyles);
	const [position, setPosition] = useState(0);
	const { media, bottom, onFinish } = props;
	const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6);
	const mediaRef = React.createRef<FlatList>();
	const bottomRef = React.createRef<FlatList>();

	const updateIndexScroll = (ref: React.RefObject<FlatList<any>>, position: number) => {
		ref.current?.scrollToIndex({
			animated: true,
			index: position,
		});
	};
	const handlerNext = () => {
		const newPosition = position + 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};
	const handlerBack = () => {
		const newPosition = position - 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};
	const handlerSkip = () => {
		const newPosition = media.length - 1;
		updateIndexScroll(mediaRef, newPosition);
		updateIndexScroll(bottomRef, newPosition);
		setPosition(newPosition);
	};

	function onSwipeLeft(){
		if((position + 1) < bottom.length){
            handlerNext();
        }
	};

	function onSwipeRight(){
        if(position > 0){
            handlerBack();
        }
	};

	return (
		<View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} style={{ flex: 1 }}>
			<Row style={{ backgroundColor: colors.primary }}>
				<OnboardingMedia ref={mediaRef} mediaData={media} currentPosition={position} />
			</Row>
			<Row style={{ backgroundColor: colors.primary }}>
				<OnboardingPagination
					ref={bottomRef}
					bottomData={bottom}
					currentPosition={position}
					handlerBack={handlerBack}
					handlerNext={handlerNext}
					handlerSkip={handlerSkip}
					onFinish={onFinish}
				/>
			</Row>
		</View>
	);
};

export default OnboardingIntro;
