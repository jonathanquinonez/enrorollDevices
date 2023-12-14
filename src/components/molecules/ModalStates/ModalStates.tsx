import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import { useForm } from 'react-hook-form';

//Translate
import { useTranslation } from 'react-i18next';
// Hooks
import useStyles from 'hooks/useStyles';
import { yupResolver } from '@hookform/resolvers/yup';
// Types, Styles
import { ListStatesType, ModalStatesProps as Props, StatesInfo } from './ModalStates.types';
import componentStyles from './ModalStates.styles';
import Button from 'src/components/atoms/Button/Button';
import InputSelect from 'src/components/atoms/InputSelect/InputSelect';
//Images
import RouteInterstate from 'icons/RouteInterstate.svg';

/** RouteInterstate
 * Render a ModalStates.
 * @since 1.0.0
 */
const ModalStates = (props: Props) => {
  const { style, listStates, closeModal, state } = props;
  const { styles } = useStyles(componentStyles);
  const { t } = useTranslation();

  let myState: ListStatesType[] = [];

  listStates.map((state, key) => {
    switch (state) {
      case 'FL':
        myState.push({ key, label: 'Florida', value: 'FL' })
        break;
      case 'TN':
        myState.push({ key, label: 'Tennessee', value: 'TN' })
        break;
      default:
        break;
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<{ states: string }>({
    resolver: yupResolver(StatesInfo),
    mode: 'onBlur'
  })

  const onValidSubmit = (value: { states: string }) => {
    state(value.states);
    closeModal();
  }


  return (
    <View style={{ justifyContent: 'center' }}>
      <Text style={styles.text} maxFontSizeMultiplier={1.3}>{t('forgotPassword.textModal')}
      </Text>
      <View style={{ justifyContent: 'center', paddingTop: 20, alignSelf: 'center' }}>
        <InputSelect
          icon={<RouteInterstate />}
          control={control}
          style={{ width: Dimensions.get('window').width * 0.8 }}
          label={t('forgotPassword.modalStateLabel') + '*'}
          items={[
            { key: 1, label: 'Florida', value: 'FL' },
            { key: 2, label: 'Tennessee', value: 'TN' },
          ]}
          placeholder={t('common.select')}
          onChange={(v) => { setValue('states', v) }}
          name='states'
          error={errors.states}
        />
      </View>

      <View style={styles.containerButton}>
        <Button accesibilityLabel={t('accessibility.next')} title={t('forgotPassword.buttons.next')}
          onPress={handleSubmit(onValidSubmit)}
        />
      </View>
      <View style={[styles.containerButton, { marginTop: 10, marginBottom: 25 }]}>
        <Button
          variant='Underline'
          title={t('common.cancel')}
          onPress={() => {
            closeModal()
          }}
        />
      </View>
    </View>
  )
}

export default ModalStates