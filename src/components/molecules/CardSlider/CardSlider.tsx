import React from 'react';
import { View, Text, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';

import useStyles from 'hooks/useStyles';

import Button from 'src/components/atoms/Button/Button';

import componentStyles from './CardSlider.styles';

import { CardSliderType, BottomDataType } from './CardSlider.types';
import i18n from 'i18n/i18n';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import ModalStinking from '../ModalStinking/ModalStinking';
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import RenderHtml from 'react-native-render-html';
import { log } from 'react-native-reanimated';

// hotfix: https://github.com/facebook/react-native/issues/16710
const itemVisibleHotfix = { itemVisiblePercentThreshold: 100 };

const CardSlider = React.forwardRef<any, CardSliderType>(({ ...props }, ref) => {
	const { styles, colors } = useStyles(componentStyles);
	const lang = i18n.language.includes('es') ? 'Es' : 'En';
	const { closeModal, setModal } = useBottomSheet();
	const [activeSlide, setActiveSlide] = React.useState(0);

	const [cards, setCards] = React.useState<string[]>([]);
	const {
		currentPosition,
		bottomData,
		onFinish,
		isMentalHealth,
		hiddenIndicator = false,
		textButtonFinish,
		textButtonbackFinish,
		title,
	} = props;
	const { t } = useTranslation();
	
	const addCard = (uuid: string) => {
		cards.length < 3 && setCards([...cards, uuid]);
	};

	const removeCard = (uuid: string) => {
		const array = [...cards];
		const index = array.indexOf(uuid);
		if (index !== -1) {
			array.splice(index, 1);
			setCards(array);
		}
	};

	const clearText = (text: string) => {
		let new_string = text;
		new_string = new_string.replace('<strong>', '');
		new_string = new_string.replace('</strong>', '');
		new_string = new_string.replace('<em>', '');
		new_string = new_string.replace('</em>', '');
		return new_string;
	};

	const handlerModal = (card: any) => {
		setModal({
			render: () => (
				<ModalStinking
					onPress={() => closeModal()}
					title={card[`title${lang}`]}
					body={card[`content${lang}`]}
					quote={card[`quote${lang}`]}
				/>
			),
			height: 450,
			blockModal: false,
		});
	};

	const renderItem = ({ item }: { item: any }) => {
		const isSelected = cards.includes(item.uuid);
		const disabled = cards.length >= 3 && !cards.includes(item.uuid);
		const { width } = Dimensions.get('window');
		const tagsStyles = {
			p: {
				fontFamily: 'proxima-regular',
				fontSize: 14,
			},
			strong: {
				fontFamily: 'proxima-bold',
				fontSize: 14,
			},
			em: {
				fontStyle: 'italic',
				fontFamily: 'proxima-regular',
				fontSize: 14,
			},
			h1: {
				fontFamily: 'proxima-bold',
			},
			h2: {
				fontFamily: 'proxima-bold',
			},
			h3: {
				fontFamily: 'proxima-bold',
			},
			h4: {
				fontFamily: 'proxima-bold',
			},
			h5: {
				fontFamily: 'proxima-bold',
			},
		};
		const renderHtmlTitle = {
			html: item[`title${lang}`],
		};
		const renderHtmlBody = {			
			html: item[`previewText${lang}`].length > 80 ? item[`previewText${lang}`].substring(0, 200 ) : item[`previewText${lang}`]
		}; 
		return (
			<View style={styles.card} key={item?.uuid}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						padding: 10,
						//height: Dimensions.get('window').height / 2,
					}}
				>
					<Text style={{ fontStyle: 'italic' }} />
					<View>
						<RenderHtml
							systemFonts={['proxima-bold', 'proxima-regular']}
							contentWidth={width}
							source={renderHtmlTitle}
							tagsStyles={tagsStyles}
							enableExperimentalMarginCollapsing
						/>
					</View>
					<View>
						<RenderHtml
							systemFonts={['proxima-bold', 'proxima-regular']}
							contentWidth={width}
							source={renderHtmlBody}
							tagsStyles={tagsStyles}
							enableExperimentalMarginCollapsing
						/>
					</View>
					<Text
						accessibilityRole='link'
						style={[
							styles.textLink,
							{ marginVertical: 15 },
							disabled && { color: '#757575' },
						]}
						onPress={() => handlerModal(item)}
					>
						{t('stinkingMH.buttonFind')}
					</Text>
					<View
						style={{
							marginVertical: 10,
							alignItems: 'center',
							width: Dimensions.get('window').width * 0.8,
						}}
					>
						<Button
							onPress={() =>
								(isSelected ? removeCard(item.uuid) : addCard(item.uuid))
							}
							title={t('stinkingMH.buttonApplies')}
							variant={isSelected ? 'Contained' : 'Outlined'}
							disabled={disabled}
						/>
					</View>
				</View>
			</View>
		);
	};

	const keyExtractor = (item: any, index: number) => item.id;

	return (
		<View style={styles.rootContainer}>
			<View style={{ flexDirection: 'row' }}>
				{title && (
					<Text style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>
						{title}
					</Text>
				)}
				<View>
					<Text style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>
						{cards.length}
						/3
					</Text>
				</View>
			</View>
			<Carousel
				vertical={false}
				ref={ref}
				data={bottomData}
				keyExtractor={keyExtractor}
				renderItem={renderItem}
				layout="default"
				sliderWidth={Dimensions.get('window').width * 0.89}
				itemWidth={Dimensions.get('window').width * 0.88}
				onSnapToItem={(index) => setActiveSlide(index)}  
				//containerCustomStyle={{ flex: 1 }}
				//sslideStyle={{ flex: 1 }}
			/>
			<View>
				<Pagination
					dotsLength={bottomData.length}
					activeDotIndex={activeSlide}
					containerStyle={{}}
					dotStyle={{
						width: 10,
						height: 10,
						borderRadius: 5,
						//marginHorizontal: 1,
						backgroundColor: colors.GREEN001,
					}}
					inactiveDotStyle={{ backgroundColor: '#333' }}
					inactiveDotOpacity={0.4}
					inactiveDotScale={0.6}
				/>
				<Text
					accessibilityRole='link'
					style={[
						styles.textLink,
						{ textAlign: 'center', marginTop: '-5%', marginBottom: 0 },
						cards.length === 0 && { color: '#757575', },
					]}
					onPress={() => cards.length !== 0 && onFinish()}
				>
					{t('stinkingMH.buttonReady')}
				</Text>
			</View>
		</View>
	);
});
export default CardSlider;
