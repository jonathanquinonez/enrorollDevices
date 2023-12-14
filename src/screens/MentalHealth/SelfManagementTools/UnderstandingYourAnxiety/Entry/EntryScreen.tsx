import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { RootGeneral } from 'src/components/molecules/RootGeneral/RootGeneral'
import { EntryList } from './EntryList';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import { useNavigation } from '@react-navigation/native';


export const EntryScreen = () => {
  const { t } = useTranslation();
  const { setModal } = useBottomSheet();
  const [position, setPosition] = useState(1)
  const navigation = useNavigation();
  const [idSelected, setIdSelected] = useState<number>(0);
  const [ageStepTwo, setStepTwo] = useState<string>( "" );
  const [ageCurrentStepTwo, setCurrentStepTwo] = useState<boolean>( false );
  const [ageBtnBack, setBtnBack] = useState<boolean>( false );


  const openOnboardingStinkingThinking = () => {
    setModal({
      render: () => (<></>),
      height: 570,
      blockModal: true
    })
  }

  const changePage = () => {
    if (position === 1) {
      navigation.goBack()
    } else {
      if( position === 2 && ageStepTwo === "Actions" ){
        setCurrentStepTwo( true );        
        setTimeout(() => {
          setCurrentStepTwo( false );
        }, 300);
      }else{        
        setPosition(position - 1)   
        setCurrentStepTwo( false );        
      }             
    }
  }

  const changeStepTwo = ( item: string, showBtn: boolean ) =>{
    showBtn === false ? setBtnBack( true ) : setStepTwo( item )          
  }
  
  return (
    <RootGeneral
      title={t('myHealth.screenUnderstandingYourAnxiety.titleUnderstandingYourAnxiety')}
      subtitle={t('myHealth.screenUnderstandingYourAnxiety.subTitleUnderstandingYourAnxiety')}
      onPressGoBack={() => changePage()}      
      content={
      <EntryList
        onPress={openOnboardingStinkingThinking}
        currentPosition={position}
        setPosition={setPosition}
        setIdSelected={setIdSelected}
        idSelected={idSelected} 
        setStepTwo={ageCurrentStepTwo} 
        changeStepTwo={changeStepTwo} 
      />}
      isButton={false}
      hiddenBackButton={ ageBtnBack }
      isForm
    />
  )
}
