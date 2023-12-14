import useStyles from 'hooks/useStyles';
import { t } from 'i18next';
import React from 'react'
import { Text, View} from 'react-native';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Button from 'src/components/atoms/Button/Button';
import Row from 'src/components/atoms/Row/Row';
import { RegistryFilterProps } from 'src/components/organisms/DateRangeFilter/DateRangeFilter.types';
import styles from '../UpdateInsurance/UpdateMyInsurance.styles';
import InfoSquare from 'icons/InfoSquare.svg';

import componentStyles from '../UpdateInsurance/UpdateMyInsurance.styles';

export const OptionView = () => {
    
    const { styles } = useStyles(componentStyles);
  return (
    <>

     <InfoSquare style={{backgroundColor:'transparent'}} />
    <Text maxFontSizeMultiplier={1.3}>Titulo</Text>
    <Text maxFontSizeMultiplier={1.3}>Subtitulo</Text>
    <Row>
				<Button
					title={t('common.cancel').toUpperCase()}
					variant="Text"
					textStyle={styles.cancelButton}
					onPress={() => {console.log("No")}}
				/>
				<Button
					textStyle={{ paddingHorizontal: 45 }}
					title={t('common.filter').toUpperCase()}
					onPress={() => {console.log("Si")}}
				/>
                </Row>
    </>
  )
}
