import React from 'react';
import { View, Text } from 'react-native';
import Row from 'src/components/atoms/Row/Row';
import componentStyle from './RootHeader.style';
import useStyles from 'hooks/useStyles';
import { RootContent } from '../RootContent/RootContent';
import { IRootHeader } from './RootHeader.type';

export const RootHeader = (props: IRootHeader) => {
	const {
		content,
		title,
		subtitle,
		isButton = false,
		filterComponent,
		filterBySearch,
		moreOptionComponent,
		data,
		showData,
		isForm,
		onPressGoBack,
		hiddenBackButton,
		stylesTitle
	} = props;
	const { styles } = useStyles(componentStyle);

	return (
		<View style={{ flex: 1, width: '100%' }}>
			<Row style={styles.containerRow}>
				<View
					style={{
						marginTop: 10,
						alignContent: 'center',
						flex: 1
					}}
				>
					<Text accessibilityRole='header' style={[styles.title, stylesTitle]} allowFontScaling={false} maxFontSizeMultiplier={1.3}>{title}</Text>
					<Text style={styles.subtitle} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} allowFontScaling={false}>
						{subtitle}
					</Text>
				</View>
			</Row>
			<Row width={4}>
				<RootContent
					isForm={isForm}
					title={title}
					component={content}
					onPressGoBack={onPressGoBack}
					isButton={isButton}				
					data={data}
					showData={showData}
					filterComponent={filterComponent}
					filterBySearch={filterBySearch}
					moreOptionComponent={moreOptionComponent}
					hiddenBackButton={hiddenBackButton}
				/>
			</Row>
		</View>
	);
};
