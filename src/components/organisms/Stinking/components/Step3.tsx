import useStyles from 'hooks/useStyles';
import { Step0Props } from './Step.types';
import componentStyles from './Step.styles';
import { View, Text, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import Icon from 'icons/mh/step002.svg';
import Button from 'src/components/atoms/Button/Button';

const Step3: React.FC<Step0Props> = (props) => {
	const { onFinish } = props;
	const { styles, colors } = useStyles(componentStyles);
	const { t } = useTranslation();
	return (
		<View style={styles.rootContainer}>
			<View>
				<Text style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>
					{t('stinkingMH.titleStep2')}
				</Text>
			</View>
			<View style={[styles.title_group]}>
				<ScrollView style={styles.scroll}>
					<View style={[styles.iconMentalHealth, { marginTop: 20 }]}>
						<Image source={require(`assets/images/step002.png`)} style={{ width: 230, height: 165 }} />
					</View>
					<Text style={{ ...styles.text_font, marginTop: 25 }}>
						{t('stinkingMH.bodyStep3')}
						<Text style={{ fontFamily: 'proxima-bold' }}>
							{t('stinkingMH.bodyStep31')}
						</Text>
					</Text>
					<View style={{ width: '100%', alignItems: 'center' }}>
						<Button
							title={t('stinkingMH.buttonStartStep3')}
							style={{
								height: 40,
								width: 150,
								marginBottom: 25,
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
							onPress={onFinish}
						/>
					</View>
				</ScrollView>
			</View>
		</View>
	);
};

export default Step3;
