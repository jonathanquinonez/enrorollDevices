import React from 'react'
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalCodeSentFPProps as Props } from './ModalCodeSentFP.types';
import componentStyles from './ModalCodeSentFP.styles';
//Images
import PaperPlane from 'icons/PaperPlane.svg';
//Components
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Button from 'src/components/atoms/Button/Button';

/**
 * Render a ModalCodeSentFP.
 * @since 1.0.0
 */
const ModalCodeSentFP = (props: Props) => {
  const { style, isMobile, onPress } = props;
  const { styles } = useStyles(componentStyles);
  const { closeModal } = useBottomSheet();
  const { t } = useTranslation();
  /*height: 280,
    blockModal: true */
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <PaperPlane />
      </View>
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>
        {t(`forgotPassword.messageValidation${isMobile? 'Mobile': 'Email'}`)}
      </Text>
      <Button
        variant={'Contained'}
        title={t('common.accept')}
        style={styles.button}
        textStyle={styles.secondaryText}
        onPress={() => { closeModal(); onPress() }}
      />
    </View>
  )
}

export default ModalCodeSentFP