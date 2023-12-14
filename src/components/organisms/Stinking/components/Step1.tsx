import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Step0Props } from './Step.types';
import CardSlider from 'src/components/molecules/CardSlider/CardSlider';
import { useSwipe } from 'hooks/useSwipe';
import getStinkingService from 'adapter/api/StinkingthinkingService';
import { useErrorAlert } from 'src/components/atoms/ErrorAlertProvider/ErrorAlertProvider';

const Step1: React.FC<Step0Props> = (props) => {
	const { onFinish } = props;
	const [position, setPosition] = useState(0);
	const { t } = useTranslation();
	const mediaRef = React.createRef<FlatList>();
	const bottomRef = React.createRef<FlatList>();
	const [data, setData] = useState<any>([])
	const [getData] = getStinkingService.useGetStinkingCardMutation();
	const { setAlertErrorMessage } = useErrorAlert();


	useEffect(()=>{
		const getStinking = async ( ) => {			
			try {				
				const resp = await getData({}).unwrap();			 
			    if( resp ){
					setData( resp )
				}
			} catch (error) {
				setAlertErrorMessage(t(`errors.code${error}`))
			}		
		} 
		getStinking();
	},[ getData ])
	

	return (
		<View>
			<CardSlider
            title={t('stinkingMH.steptitle')}
			ref={bottomRef}
			isMentalHealth={true}
			bottomData={data}
			currentPosition={position}
			// handlerBack={handlerBack}
			// handlerNext={handlerNext}
			// handlerSkip={handlerSkip}
			onFinish={onFinish}
            hiddenIndicator={true}
		/>
		</View>
	);
};

export default Step1;
