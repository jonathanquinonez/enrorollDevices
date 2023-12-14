import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { BreadCrumbProps as Props, Route } from './BreadCrumb.types';
import { RootStackParamList } from 'src/navigation/navigation.types';
import componentStyles from './BreadCrumb.styles';
// Images
import RightArrowIcon from 'icons/RightArrowIcon.svg';

/**
 * Render a breadCrumb.
 * @since 1.0.0
 */
const BreadCrumb: React.FC<Props> = (props) => {
	const { breadcrumbList = [], style, styleText } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { navigate } = useNavigation();
	const navigation = useNavigation();

	/**
	 * Navigates to a route
	 * @since 1.0.0
	 * @param routeItem Route to navigate to
	 */
	const navigateTo = (routeItem: Route) => {
		const { route, params } = routeItem;
		if (route) navigation.navigate(route as keyof RootStackParamList);
	};

	return (
		<View style={[styles.container, style]}>
			{breadcrumbList.map((route, index) => (
				<React.Fragment key={route.label}>
					<TouchableOpacity disabled={!route.route} onPress={() => navigateTo(route)}>
						<Text style={[ styles.routeText, route.route ? styles.routeTextLink : null, styleText]} maxFontSizeMultiplier={1.3}>
							{route.label}
						</Text>
					</TouchableOpacity>
					{index < breadcrumbList.length - 1 ? (
						<RightArrowIcon
							stroke={colors.GREENDC1}
							height={12}
							width={8}
							style={styles.icon}
						/>
					) : null}
				</React.Fragment>
			))}
		</View>
	);
};

export default BreadCrumb;
