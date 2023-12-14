import React from 'react';
import { View, Platform, TouchableOpacity } from 'react-native';
import { centerElement } from 'ui-core/utils/globalStyles';
//Components
import Row from 'src/components/atoms/Row/Row';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { HeaderProps as Props } from './Header.types';
import componentStyles from './Header.styles';
// Images
import Logo from 'src/components/atoms/Logo/Logo';
import IconButton from 'src/components/atoms/IconButton/IconButton';
import Button from 'src/components/atoms/Button/Button';
import TimesCircle from 'icons/TimesCircle.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { t } from 'i18next';

/**
 * Render a Header.
 * @since 1.0.0
 */
const Header = (props: Props) => {
	const {
		style,
		onPressLeft,
		onPressRight,
		iconLeft,
		iconRight,
		iconVariant = 'Header',
		logoWithoutText,
		showLine,
		btnGoBack,
		width = 1,
		accesibilityHint,
		accesibilityLabel,
		accessibilityHint2,
		accessibilityLabel2,
		accessibilityRole = 'button',
		accessibilityRole2 = 'button',
	} = props;
	const { styles } = useStyles(componentStyles);

	const navigation = useNavigation();

	return (
		<>
			{iconLeft || btnGoBack || iconRight ? (
				<Row
					width={width}
					style={[styles.header, showLine ? styles.borderLine : null, style]}
				>
					{iconLeft || btnGoBack ? (
						<>
							{iconLeft ? (
								<IconButton
									accessibilityRole={
										accesibilityLabel ? undefined : accessibilityRole
									}
									accessibilityLabel={accesibilityLabel}
									icon={iconLeft}
									variant={iconVariant}
									onPress={onPressLeft}
								/>
							) : (
								<Button
									accesibilityHint={accesibilityHint}
									accessibilityRole={
										accesibilityLabel ? undefined : accessibilityRole
									}
									accesibilityLabel={accesibilityLabel}
									onPress={() => navigation.goBack()}
									title={''}
									variant={'Contained'}
									style={styles.button}
									icon={<TimesCircle style={styles.icon} />}
								/>
							)}
						</>
					) : (
						<View style={{ width: 45 }} />
					)}
					<Logo withOutText={logoWithoutText} />
					{iconRight ? (
						<IconButton
							accessibilityHint={accessibilityHint2}
							accessibilityLabel={accessibilityLabel2}
							accessibilityRole={accessibilityRole2}
							icon={iconRight}
							variant={iconVariant}
							onPress={onPressRight}
						/>
					) : (
						<View style={{ width: 45 }} />
					)}
				</Row>
			) : (
				<Row width={width} style={[centerElement, style]}>
					<Logo withOutText={logoWithoutText} />
				</Row>
			)}
		</>
	);
};

export default Header;
