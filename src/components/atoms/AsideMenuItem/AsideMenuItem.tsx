import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { useTranslation } from 'react-i18next';

// Components
import RotateSpringAnimation from '../RotateSpringAnimation/RotateSpringAnimation';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { AsideMenuItemProps as Props } from './AsideMenuItem.types';
import componentStyles from './AsideMenuItem.styles';
// Images
import ArrowThinDownIcon from 'icons/ArrowThinDownIcon.svg';
import RightArrowIcon from 'icons/RightArrowIcon.svg';

import MenuBox from '../MenuBox/MenuBox';

/**
 * Render a asideMenuItem.
 * @since 1.0.0
 */
const AsideMenuItem: React.FC<Props> = (props) => {
	const { text, icon, isDropdown, onPress, index, currentIndex, children, styleText,
		accessibilityHint,
		accessibilityLabel,
		accessibilityRole = 'button' } = props;
	const { showRightArrowIcon, style } = props;
	const { t } = useTranslation();
	// Hooks
	const { styles, colors } = useStyles(componentStyles);
	const [isCollapsed, setIsCollapsed] = useState(true);

	/**
	 * Opens or close the collapsible component
	 * @since 1.0.0
	 */
	const handlePress = () => {
		if (onPress) onPress(index ?? -1);
		if (isDropdown) setIsCollapsed(!isCollapsed);
	};

	useEffect(() => {
		if (!index) return;
		if (index === currentIndex) {
			setIsCollapsed(false);
			return;
		}
		setIsCollapsed(true);
	}, [currentIndex]);

	return (
		<View>
			<MenuBox>
				<TouchableOpacity accessibilityRole={accessibilityRole} accessibilityHint={accessibilityHint} accessibilityLabel={accessibilityLabel} style={[styles.container, style]} onPress={handlePress}>
					<View style={styles.mainContent}>
						{icon ? <View style={styles.iconContainer}>{icon}</View> : null}
						<Text style={[styles.title, styleText]} maxFontSizeMultiplier={1.3}>{text}</Text>
					</View>
					{showRightArrowIcon || isDropdown ? (
						<View style={styles.rightIcon}>
							<RotateSpringAnimation
								animate={!isCollapsed}
								degrees={-180}
								tension={80}
							>
								{showRightArrowIcon ? (
									<RightArrowIcon
										stroke={colors.GRAYDC1}
										width={8}
										height={24}
										accessibilityLabel={t('imgNIcons.chevronRight')}
									/>
								) : (
									<ArrowThinDownIcon
										stroke={colors.GRAYDC1}
										width={8}
										height={24}
										accessibilityLabel={t('imgNIcons.chevrondown')}
									/>
								)}
							</RotateSpringAnimation>
						</View>
					) : null}
				</TouchableOpacity>
				{isDropdown ? (
					<Collapsible collapsed={isCollapsed} style={styles.submenu}>
						{children}
					</Collapsible>
				) : <></>}
			</MenuBox>
		</View>
	);
};

export default AsideMenuItem;
