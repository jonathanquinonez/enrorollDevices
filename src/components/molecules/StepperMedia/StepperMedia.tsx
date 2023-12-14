import React from 'react';
import { View, Text, FlatList, Image, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';

import useStyles from 'hooks/useStyles';

import Button from 'src/components/atoms/Button/Button';
import Icon from 'src/components/atoms/Icon/Icon';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import SlideIndicator from 'src/components/atoms/SlideIndicator/SlideIndicator';

import componentStyles from './StepperMedia.styles';

import { StepperMediaType, BottomDataType } from './StepperMediatypes';
import Row from 'src/components/atoms/Row/Row';
import { ScrollView } from 'react-native-gesture-handler';

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

const StepperMedia = React.forwardRef<FlatList, StepperMediaType>(({ ...props }, ref) => {
	const { styles, colors } = useStyles(componentStyles);
	const {
		currentPosition,
		bottomData, 
		handlerBack,
		handlerNext,
		handlerSkip,
		onFinish,
		isMentalHealth,
		hiddenIndicator = false,
		textButtonFinish,
		textButtonbackFinish,
		title,
	} = props;
	const { t } = useTranslation();

	const renderItem = ({ item }: { item: BottomDataType }) => {
		return (
			<View style={[styles.title_group]}>
				<View style={styles.scroll}>
					{item.icon && item.id !== 2 ?
							<View style={styles.iconMentalHealth}>
								<>{React.cloneElement(item?.icon)}</>
							</View>
						:
							<View style={ styles.viewImg }>
								<Image width={90} height={90} source={require('assets/icons/mh/stinking.png')} />
							</View>
					}
					<Text style={styles.title_font}>{item.title}</Text>
					<Text style={{ ...styles.text_font, fontSize: item.fontSize }}>
						{item.body}
					</Text>
				</View>
			</View>
		);
	};

	const keyExtractor = (item: any, index: number) => item.id;

	return (
		<View style={styles.rootContainer}>
				<View style={{ flex: 1 }}>
					{title && (
						<Text style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>
							{title}
						</Text>
					)}
				</View>
				<View style={{ flex: 3 }}>
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
				</View>
				<View style={{ alignItems: 'center' }}>
					<View style={styles.actions_container}>
						{currentPosition + 1 < bottomData.length ? (
							<>
								<Button
									title={t('onboarding.skip')}
									variant="Text"
									onPress={handlerSkip}
									textStyle={{
										fontFamily: 'proxima-bold',
										fontSize: 16,
										paddingLeft: 10,
									}}
								/>
								<View style={[styles.group_button, { flexDirection: 'row' }]}>																		
									<View style={ styles.viewBtnBack }>
										{currentPosition > 0 && (
											<IconButton											
												icon={<Icon name="angle-left" />}
												variant="RadianceBlue"
												onPress={handlerBack}
											/>
										)}
									</View>
									
									<View style={ styles.viewBtnNext }>
										<IconButton											
											icon={<Icon name="angle-right" />}
											variant="RadianceBlue"
											onPress={handlerNext}
										/>
									</View>									
								</View>
							</>
						) : currentPosition > 0 ? (
							<>
								<View style={styles.group_button}>
									<Button
										title={t('onboarding.start2')}
										style={{
											height: 40,
											marginVertical: 10,
											alignContent: 'center',
											alignItems: 'center',
										}}
										onPress={onFinish}
									/>
								</View>
							</>
						) : null}
					</View>
				</View>
			</View>
	);
});
export default StepperMedia;
