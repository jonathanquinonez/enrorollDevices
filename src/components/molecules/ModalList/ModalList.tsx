import React from 'react'
import { View, Text } from 'react-native';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { ModalListProps as Props } from './ModalList.types';
import componentStyles from './ModalList.styles';
import Button from 'src/components/atoms/Button/Button';
import { useTranslation } from 'react-i18next';

/**
 * Render a ModalList.
 * @since 1.0.0
 */
const ModalList = (props: Props) => {
  const { onPress, options } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation()


  return (
    <View style={styles.container}>
      <Text accessibilityRole='header' style={styles.title}>{t('needhelpMH.modalTitle')}</Text>
        { options && options.map((opt, i) => (
            <Button key={i} style={styles.btnList} textStyle={styles.btnlistText} title={t(opt.name)} variant='OutlinedFocus' onPress={opt.handlerAction} />
        ))}
      <Button style={styles.btnClose} title={t('common.close')} onPress={onPress} />
    </View>
  )
}

export default ModalList