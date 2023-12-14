import React from 'react';
import { View, Text, Dimensions } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalStinkingProps as Props } from './ModalStinking.types';
import componentStyles from './ModalStinking.styles';
import Button from 'src/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';
import RenderHtml from 'react-native-render-html';

/**
 * Render a ModalStinking.
 * @since 1.0.0
 */
const ModalStinking = (props: Props) => {
	const { onPress, title, quote, body } = props;
	//console.log({ body });

	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();
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
		html: title,
	};
	const renderHtmlBody = {
		html: body,
	};
	const renderHtmlQuote = {
		html: quote,
	};
	//console.log({ renderHtmlBody, renderHtmlQuote, renderHtmlTitle });

	return (
		<View style={styles.container}>
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
			<View>
				<RenderHtml
					systemFonts={['proxima-bold', 'proxima-regular']}
					contentWidth={width}
					source={renderHtmlQuote}
					tagsStyles={tagsStyles}
					enableExperimentalMarginCollapsing
				/>
			</View>
			<Button
				style={{ marginBottom: 15 }}
				title={t('common.close')}
				onPress={onPress}
			/>
		</View>
	);
};

export default ModalStinking;
