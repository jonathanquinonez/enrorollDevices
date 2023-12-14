import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalpassChangeWarningProps as Props } from './ModalpassChangeWarning.types';
import componentStyles from './ModalpassChangeWarning.styles';
//Translate
import { useTranslation } from 'react-i18next';
//Components
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Button from 'src/components/atoms/Button/Button';

/**
 * Render a ModalpassChangeWarning.
 * @since 1.0.0
 */
const ModalpassChangeWarning = (props: Props) => {
  const { style } = props;
  const { styles } = useStyles(componentStyles);
  const { closeModal } = useBottomSheet();
  const { t } = useTranslation();
  /* height: 230,
     blockModal: true */
  return (
    <View style={styles.container}>
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>
        {t('unblockAccount.infoChangeWarning')}
      </Text>
      <Button
        variant={'Contained'}
        title={t('common.accept')}
        textStyle={styles.secondaryText}
        onPress={closeModal}
      />
    </View>
  )
}

export default ModalpassChangeWarning