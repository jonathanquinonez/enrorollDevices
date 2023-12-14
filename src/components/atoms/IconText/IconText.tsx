import React from 'react';
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { IconTextProps as Props } from './IconText.types';
import componentStyles from './IconText.styles';

/**
 * Render a iconText.
 * @since 1.0.x
 */
const IconText: React.FC<Props> = (props) => {
	const { sectionTitle, sectionIcon, textStyle } = props;
	const { styles } = useStyles(componentStyles);

	return (
		<View style={styles.container}>
			<View style={styles.mainContent}>
				<View style={styles.iconContainer}>{sectionIcon}</View>
				<Text style={[styles.infoText, textStyle]} maxFontSizeMultiplier={1.3}>
					{sectionTitle}
				</Text>
			</View>
		</View>
	);
};

export default IconText;
