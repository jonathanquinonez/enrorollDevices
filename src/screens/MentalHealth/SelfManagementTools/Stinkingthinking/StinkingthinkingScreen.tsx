import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral';
import { NeedHelpBody } from 'src/components/organisms/NeedHelp/NeedHelp.body';
import { StinkingthinkingRoot } from 'src/components/organisms/Stinking/Stinking.screen';
/**
 * View options MyHealth
 * @returns
 */
export const StinkingthinkingScreen = (props: any) => {
	const { t } = useTranslation();
    const [ hiddenBackButton, setHiddenBackButton] = useState(false);
	const [title, setTitle] = useState<string>(t('stinkingMH.screenTitle'))
	const [subTitle, setSubTitle] = useState<string>(t('stinkingMH.screenSubtitle'))
    const handlerBackButton = () => {
        setHiddenBackButton(true);
    }
	const handlerTexts = () => {
		setSubTitle(t('stinkingMH.screenSubtitle2'));
	}

	const handlerReset = () => {
		setSubTitle(t('stinkingMH.screenSubtitle'));
	}

	return (
		<RootGeneral
			title={title}
			isForm
			subtitle={subTitle}
			content={<StinkingthinkingRoot  handlerBackButton={handlerBackButton} handlerText={handlerTexts} handlerReset={handlerReset}/>}
			isButton={false}
            hiddenBackButton={hiddenBackButton}
		/>
	);
};
