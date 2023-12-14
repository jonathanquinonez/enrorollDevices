import React from 'react'
import { View, Text, Dimensions } from 'react-native';

//Translate
import { useTranslation } from 'react-i18next';
// Hooks
import useStyles from 'hooks/useStyles';

// Types, Styles
import { ModalForgotStateProps as Props } from './ModalForgotState.types';
import componentStyles from './ModalForgotState.styles';
import Button from 'src/components/atoms/Button/Button';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
//Images
import RouteInterstate from 'icons/RouteInterstate.svg';
import Input from 'src/components/atoms/Input/Input';
import { windowDimentions } from 'ui-core/utils/globalStyles';

/** RouteInterstate
 * Render a ModalForgotState.
 * @since 1.0.0
 */
const ModalForgotState = (props: Props) => {
  const { closeModal, stateCheckbox, inputA, inputB, handlerNext, setOpen, setError, showError } = props;
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation();



  return (
    <View style={{ justifyContent: 'center', marginVertical: 20 }}>
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('forgotPassword.textModal')}
      </Text>
      <View style={{ justifyContent: 'center', paddingTop: 20, alignSelf: 'center' }}>
        <Input
          onPressCheckbox={() => stateCheckbox(1)}
          editable={false}
          isCheckbox
          valueCheckbox={inputA}
          colorCheckbox={colors.GRAY}
          icon={<RouteInterstate />}
          labelStyle={{ color: colors.BLUEDC1 }}
          inputStyle={{ width: 300 }}
          placeholder={'Tennessee'}
          name={''}
          label={t('forgotPassword.state')} />
        <Input
          onPressCheckbox={() => stateCheckbox(2)}
          editable={false}
          isCheckbox
          valueCheckbox={inputB}
          colorCheckbox={colors.GRAY}
          icon={<RouteInterstate />}
          labelStyle={{ color: colors.BLUEDC1 }}
          inputStyle={{ width: 300, justifyContent: 'center' }}
          placeholder={'Florida'}
          name={''} />
      </View>
      <View style={styles.containerButton}>
        <Button accesibilityLabel={t('accessibility.next')} title={t('forgotPassword.buttons.next')}
          onPress={() => {
            if (inputA || inputB) {
              handlerNext();
              closeModal()
              setOpen(false);
            } else {
              setError(true)
            }
          }}
        />
      </View>
      <View style={[styles.containerButton, { marginTop: 10 }]}>
        <Button
          variant='Underline'
          title={t('common.cancel')}
          onPress={() => {
            closeModal()
          }}
        />
      </View>
      {showError && (
        <View style={[{ marginBottom: 10, width: windowDimentions.width * .80 }]}>
          <Text style={{ color: colors.DANGER, fontFamily: 'proxima-regular', fontSize: 12 }} adjustsFontSizeToFit maxFontSizeMultiplier={1.3} numberOfLines={1}>{t(`errors.required`)}</Text>
        </View>
      )}
    </View>
  )
}

export default ModalForgotState