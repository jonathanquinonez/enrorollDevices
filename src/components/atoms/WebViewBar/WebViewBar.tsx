import React from 'react';
import { Text, View } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { WebViewBar as Props } from './WebViewBar.types';
import componentStyles from './WebViewBar.styles';

/**
 * Render Webviewbar.
 * @since 1.0.0
 */
const WebViewBar = (props: Props) => {
	const {

		onPress,
		
	} = props;
	const { styles } = useStyles(componentStyles);

	return (
		<View
			style={styles.container}
		>
			<Text
				style={styles.closeSign}
				onPress={onPress}
				maxFontSizeMultiplier={1.3}
			>
				X
			</Text>
		</View>
	);
};

export default WebViewBar;
