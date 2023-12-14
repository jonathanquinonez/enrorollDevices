import useStyles from 'hooks/useStyles';
import { Step0Props } from './Step.types';
import componentStyles from './Step.styles';
import { View, Text, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import Button from 'src/components/atoms/Button/Button';
import React from 'react';
import i18n from 'i18n/i18n';
import { useNavigation } from '@react-navigation/native';

const Step4: React.FC<Step0Props> = (props) => {
	const { onFinish } = props;
	const { styles, colors } = useStyles(componentStyles);
	const lang = i18n.language.includes('es') ? 'es' : 'en';
	const [currentIndex, setCurrentIndex] = React.useState(0);
    const navigation = useNavigation();
	const textsQuestions = {
		es: [
			'¿A qué estoy reaccionando?',
			'¿Qué significa esta situación para mí en el contexto de toda mi vida?',
			'¿Cómo se vería esta situación para alguien ajeno a ella? ¿Lo verían de la misma manera? (Puede ser útil pensar en alguien a quien respetes y admires)',
			'¿Esta situación importará dentro de 1 año, 5 años, 10 años, 50 años?',
			'¿Mi reacción es proporcional al evento real?',
		],
		en: [
			'What am I reacting to?',
			'What does this situation mean to me over my whole life?',
			'What would this situation look like to someone outside of the situation, would they see it the same way? (It helps to think of someone you respect and admire)',
			'Will this situation matter in 1 year, 5 years, 10 years, 50 years?',
			'Is my reaction in proportion to the actual event?',
		],
	};
	const { t } = useTranslation();
	const textsLang = textsQuestions[lang];

    const activateButton = () => {
		
		if (currentIndex >= textsLang.length) return true

	}

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) => prevIndex + 1);
		}, 2000);

		// Detener el intervalo cuando el componente se desmonta

		return () => clearInterval(interval);
	}, []);

	return (
		<View style={[styles.rootContainer]}>
			<Button
				onPress={() => navigation.goBack()}
				textStyle={{
					paddingHorizontal: 0,
					fontFamily: 'proxima-bold',
					fontSize: 16,
					marginVertical: 20,
				}}
				style={{ justifyContent: 'flex-start' }}
				title={t('stinkingMH.backStep4')}
				variant="Underline"
			/>
			<View>
				<Text style={[styles.titleMentalHealth, { paddingHorizontal: 10 }]}>
					{t('stinkingMH.titleStep4')}
				</Text>
			</View>
			<View style={[styles.title_group]}>
				<ScrollView style={styles.scroll}>
					{textsLang.slice(0, currentIndex + 1).map((question, i) => (
						<Text style={[styles.italic_font]}>{question}</Text>
					))}
					{activateButton() && (
						<View style={{ width: '100%', alignItems: 'center' }}>
							<Button
								title={t('stinkingMH.buttonStep4')}
								style={{
									height: 40,
									width: 150,
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
								onPress={onFinish}
							/>
						</View>
					)}
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
export default Step4;
