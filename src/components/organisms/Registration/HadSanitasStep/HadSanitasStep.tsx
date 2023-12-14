import React from 'react';
import { View, Text } from 'react-native';
import useStyles from 'hooks/useStyles';
import { useTranslation } from 'react-i18next';
//Components
import RadioButton from 'src/components/atoms/RadioButton/RadioButton';
import RadioGroup from 'src/components/atoms/RadioGroup/RadioGroup';
// Types, Styles
import { HadSanitasStepProps as Props } from './HadSanitasStep.types';
import componentStyles from './HadSanitasStep.styles';

const HadSanitasStep: React.FC<Props> = (props) => {
	const { value } = props;
	const { styles } = useStyles(componentStyles);
	const { t } = useTranslation();



	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.title} maxFontSizeMultiplier={1.3}>{t('createAccount.receivedMedicalServices')}</Text>
			</View>
			<View style={{ width: '100%' }}>
				<RadioGroup style={styles.radioGroup} onChange={value}>
					<RadioButton
						accessibilityRole='radio'
						value={1}
						textStyle={styles.text}
						style={styles.radioButton}
						title={t('createAccount.yes')}
					/>
					<RadioButton
						accessibilityRole='radio'
						value={2}
						textStyle={styles.text}
						style={styles.radioButton}
						title={t('createAccount.no')}
					/>
				</RadioGroup>
			</View>
		</View>
	);
};

export default HadSanitasStep;
