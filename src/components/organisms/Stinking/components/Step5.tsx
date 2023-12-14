import useStyles from 'hooks/useStyles';
import { Step0Props } from './Step.types';
import componentStyles from './Step.styles';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

import Icon from 'icons/trophy-star.svg';
import Button from 'src/components/atoms/Button/Button';
import { useNavigation } from '@react-navigation/native';

const Step5: React.FC = (props: any) => {
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
    const navigation = useNavigation();

	return (
		<View style={[styles.rootContainer]}>
			<View>
				<Text
					style={[
						styles.titleMentalHealth,
						{
							paddingHorizontal: 10,
							fontSize: 24,
							textAlign: 'center',
							marginVertical: 20,
						},
					]}
				>
					{t('stinkingMH.titleStep5')}
				</Text>
			</View>
			<View style={[styles.title_group]}>
				<ScrollView style={styles.scroll}>
					<View style={[styles.iconMentalHealth, { marginVertical: 20 }]}>
						<Icon />
					</View>
					<Text
						style={{
							fontSize: 14,
							fontFamily: 'proxima-regular',
							fontWeight: '400',
							marginBottom: 30,
                            paddingHorizontal: 40
						}}
					>
						<Text style={{ fontFamily: 'proxima' }}>
							{t('stinkingMH.bodyStep5')}
						</Text>
					</Text>
					<View style={{ width: '100%', alignItems: 'center', marginBottom: 30 }}>
						<Button
							title={t('stinkingMH.buttonStep5')}
							textStyle={{ fontSize: 15 }}
							style={{
								height: 40,
								marginVertical: 10,
								alignContent: 'center',
								alignItems: 'center',
								shadowColor: '#000',
								shadowOffset: {
									width: 0,
									height: 2,
								},
								elevation: 5,
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
							}}
							onPress={() => navigation.navigate('MentalHealthScreen')}
						/>
					</View>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<Text
							style={{
								fontFamily: 'proxima-bold',
								fontSize: 12,
								color: '#022F58',
								textAlign: 'left',
							}}
						>
							{t('stinkingMH.footerStep4')}
						</Text>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default Step5;
