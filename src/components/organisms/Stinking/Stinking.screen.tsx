import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { NeedHelpBody } from 'src/components/organisms/NeedHelp/NeedHelp.body';
import { StinkingProps } from './Stinking.types';
import Step0 from './components/Step0';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Step4 from './components/Step4';
import Step5 from './components/Step5';
import { useNavigation } from '@react-navigation/native';
/**
 * View options MyHealth
 * @returns
 */
export const StinkingthinkingRoot = (props: StinkingProps) => {
	const { handlerBackButton, handlerText, handlerReset } = props;
	const [step, setStep] = useState(0);
	const { t } = useTranslation();
	const navigation = useNavigation();

	const handlerChangeStep = () => {
		setStep(step + 1);
	};

	const handlerFinishStep = () => {
		handlerChangeStep();
	};

	const renderStep = () => {
		var element = <></>;
		switch (step) {
			case 0:
				element = <Step0 onFinish={handlerFinishStep} />;
				break;
			case 1:
				handlerText();
				element = <Step1 onFinish={handlerFinishStep} />;
				break;
			case 2:
				element = <Step2 onFinish={handlerFinishStep} />;
				break;
			case 3:
				element = <Step3 onFinish={handlerFinishStep} />;
				break;
			case 4:
				element = <Step4 onFinish={handlerFinishStep} />;
				break;
			case 5:
				//handlerReset();
				handlerBackButton();
				element = <Step5 />;
				break;
			default:
				break;
		}

		return element;
	};

	return (
		<ScrollView>
			<View style={{ marginBottom: 10, width: '100%', marginTop: 30 }}>{renderStep()}</View>
		</ScrollView>
	);
};
