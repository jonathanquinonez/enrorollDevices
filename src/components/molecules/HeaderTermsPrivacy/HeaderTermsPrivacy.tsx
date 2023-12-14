import { View, Image, Dimensions } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
// Types, Styles
import componentStyles from './HeaderTermsPrivacy.styles';
import useStyles from 'hooks/useStyles';
// Images
import HorizontalGradient from 'src/components/atoms/HorizontalGradient/HorizontalGradient';
import Button from 'src/components/atoms/Button/Button';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import Header from '../Header/Header';
import TimesCircle from 'icons/TimesCircle.svg';
import Row from 'src/components/atoms/Row/Row';
/**
 * Render a HeaderTermsPrivacy.
 * @since 2.0.0
 */
const HeaderTermsPrivacy = ({ toggleBar, bar }) => {
	const { styles, colors } = useStyles(componentStyles);
	const navigation = useNavigation();
	return (
		<LinearGradient
			colors={[colors.primary, '#034268']}
			style={styles.linearGradient}
			locations={[0, 0.9]}
		>
			<Row width={1} style={{ height: 80 }}>
				<Header
					logoWithoutText
					btnGoBack={true}
					showLine
				/>
			</Row>
			<Row width={4} style={{ flexDirection: 'column' }}>
				<View style={{ marginTop: Dimensions.get('window').height * 0.09 }}>
					<View style={styles.justifyText}>
						{bar ? (<Button
							accessibilityRole='button'
							accesibilityLabel={t('accessibility.btnprivacy')}
							title={t('login.hyperlinks.privacyPolicy')}
							variant="Text"
							textStyle={{
								color: colors.WHITE,
								fontSize: 14,
								fontFamily: 'proxima-bold',
								padding: 10,
								flexDirection: 'row',
							}}
							onPress={() => {
								toggleBar(true);
							}}
						/>) : (<Button
							accessibilityRole='button'
							accesibilityLabel={t('accessibility.btnprivacy')}
							title={t('login.hyperlinks.privacyPolicy')}
							variant="Text"
							textStyle={{
								color: colors.GRAY,
								fontSize: 14,
								padding: 10,
								fontFamily: 'proxima-bold',
								flexDirection: 'row',
							}}
							onPress={() => {
								toggleBar(true);
							}}
						/>)}
						{bar ? (<Button
							accessibilityRole='button'
							accesibilityLabel={t('accessibility.terms')}
							title={t('login.hyperlinks.termsConditions')}
							variant="Text"
							textStyle={{
								color: colors.GRAY,
								fontSize: 14,
								padding: 10,
								fontFamily: 'proxima-bold',
								flexDirection: 'row',
							}}
							onPress={() => {
								toggleBar(false);
							}}
						/>) : (<Button
							accessibilityRole='button'
							accesibilityLabel={t('accessibility.terms')}
							title={t('login.hyperlinks.termsConditions')}
							variant="Text"
							textStyle={{
								color: colors.WHITE,
								fontSize: 14,
								fontFamily: 'proxima-bold',
								flexDirection: 'row',
								padding: 10,

							}}
							onPress={() => {
								toggleBar(false);
							}}
						/>)}

					</View>
					<View style={{ width: '100%', paddingHorizontal: 10 }}>
						{bar ? (
							<Image style={styles.logo_bar} source={require('assets/images/Group2.png')} />
						) : (
							<Image style={styles.logo_bar} source={require('assets/images/Group1.png')} />
						)}
					</View>
				</View>
			</Row>
		</LinearGradient>
	);
};
export default HeaderTermsPrivacy;
