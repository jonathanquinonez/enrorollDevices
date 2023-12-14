import useStyles from 'hooks/useStyles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View, Image } from 'react-native';
import Row from 'src/components/atoms/Row/Row';
import Card from 'src/components/molecules/Card/Card';
import componentStyles from './SelfManagementTools.style';
import { useNavigation } from '@react-navigation/native';

export const SelfManagementToolsList: React.FC = (props) => {
	const { t } = useTranslation();
	const { styles, colors } = useStyles(componentStyles);
    const navigation: any = useNavigation();

	return (
		<ScrollView>
			<View style={{ width: '100%', padding: 10, marginTop: 30 }}>
				<Row style={{ flexDirection: 'row' }}>
					<Card
						style={styles.containerCards}
						icon={<Image style={{ width: 48.9, height: 43.8, marginBottom: 14 }} source={require('assets/icons/MentalHealthIcons/SelfManagementTools/1.png')} />}
						title={t('myHealth.screenSelfManagementTools.titleCardOne')}
						styleTitle={{ fontSize: 14, marginBottom: 8 }}
						styleSub={{ fontSize: 12 }}
						subtitle={t('myHealth.screenSelfManagementTools.subTitleCardOne')}
						onPress={() => navigation.navigate('UnderstandingYourAnxietyScreen')} />
					<Card
						style={styles.containerCards}
						icon={<Image style={{ width: 54, height: 50, marginBottom: 10, marginTop: 10 }} source={require('assets/icons/MentalHealthIcons/SelfManagementTools/2.png')} />}
						title={t('myHealth.screenSelfManagementTools.titleCardTwo')}
						styleTitle={{ fontSize: 14, marginBottom: 8 }}
						styleSub={{ fontSize: 12 }}
						subtitle={t('myHealth.screenSelfManagementTools.subTitleCardTwo')}
						onPress={() => navigation.navigate('StinkingthinkingScreen')} />
				</Row>
			</View>
		</ScrollView>
	);
};
