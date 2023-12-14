import React from 'react'
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalBlockAccountProps as Props } from './ModalBlockAccount.types';
import componentStyles from './ModalBlockAccount.styles';
//Images
import InfoIcon from 'icons/InfoIcon.svg';
//Components
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
import Icon from 'src/components/atoms/Icon/Icon';
import Button from 'src/components/atoms/Button/Button';

/**
 * Render a ModalBlockAccount.
 * @since 1.0.0
 */
const ModalBlockAccount = (props: Props) => {
  const { style, isPassExpired } = props;
  const { styles } = useStyles(componentStyles);
  const { closeModal } = useBottomSheet();
  const { t } = useTranslation();
  /* height: 330,
     blockModal: true */
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <InfoIcon />
      </View>
      <Text accessibilityRole='header' style={styles.tittle} maxFontSizeMultiplier={1.3}>
        {t('unblockAccount.yourBlockAccount')}
      </Text>
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>
        {isPassExpired ? t('unblockAccount.passExpired') : t('unblockAccount.excededTheNumero')}
      </Text>
      <Button
        variant={'Contained'}
        title={t('unblockAccount.unblockAccount')}
        style={styles.button}
        textStyle={styles.secondaryText}
        onPress={closeModal}
      />
    </View>
  )
}

export default ModalBlockAccount