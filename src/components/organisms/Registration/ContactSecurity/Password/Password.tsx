import React, { useState } from 'react';
import { View, Dimensions, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
//Components
import Checkbox, { CheckboxController } from 'src/components/atoms/Checkbox/Checkbox';
import Button from 'src/components/atoms/Button/Button';
// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { PasswordProps as Props } from './Password.types';
import componentStyles from './Password.styles';
import Input from 'src/components/atoms/Input/Input';
//Images
import LockAltIcon from 'icons/LockAltIcon.svg';
import { useNavigation } from '@react-navigation/native';

/**
 * Render a Password.
 */
const Password: React.FC<Props> = (props) => {
  const { control, errors, setValue } = props;
  const { styles, colors } = useStyles(componentStyles);
  const navigation = useNavigation()


  const { t } = useTranslation();

  const [isTerm, setIsTerm] = useState(false);
  const [isPolicy, setIsPolicy] = useState(false)

  const change = (name: string, value: boolean) => {
    name === 'policy' ? setIsPolicy(value) : setIsTerm(value)
    setValue(name, value)
  }

  return (
    <>
      <Input
        icon={<LockAltIcon />}
        labelStyle={{ color: colors.BLUEDC1 }}
        passwordInput
        inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
        placeholder={t('patientRegistration.placeholders.password')}
        label={t('createAccount.inputs.createPassword')}
        name='pass'
        showPasswordStrength
        control={control}
        error={errors.pass}
      />
      <Input
        icon={<LockAltIcon />}
        labelStyle={{ color: colors.BLUEDC1 }}
        passwordInput
        inputStyle={{ width: Dimensions.get('window').width * 0.9 }}
        placeholder={t('patientRegistration.placeholders.password2')}
        label={t('createAccount.inputs.confirmPassword')}
        name='confirmPassword'
        control={control}
        error={errors.confirmPassword} />
      <View style={{ width: Dimensions.get('window').width * 0.9, marginTop: 24 }}>
        <View style={{ alignItems: 'flex-start' }}>
          <CheckboxController
            name='policy'
            accessibilityRole='checkbox'
            accesibilityHint={t('accessibility.acceptPolit')}
            control={control}
            colorCheckbox={colors.GREENDC1}
            value={isPolicy}
            text={t('createAccount.textPrivacyPolicy')}
            onPress={(e) => { change('policy', e) }}
            error={errors.policy}
            children2={
              <Text
                accessibilityRole='button'
                accessibilityLabel={t('accessibility.btnprivacy')}
                onPress={() => navigation.navigate("PrivacyPolicy")}
                style={{ textDecorationLine: 'underline', fontFamily: 'proxima-bold' }} maxFontSizeMultiplier={1.3}>{' ' + t('createAccount.buttons.privacyPolicy')}</Text>
            }
          />
        </View>
        <View style={{ marginVertical: 32, alignItems: 'flex-start' }}>
          <CheckboxController
            accessibilityRole='checkbox'
            accesibilityHint={t('accessibility.acceptTerm')}
            name='terms'
            control={control}
            colorCheckbox={colors.GREENDC1}
            value={isTerm}
            text={t('createAccount.textTermsConditions')}
            error={errors.terms}
            onPress={(e) => { change('terms', e) }}
            children2={
              <Text
                accessibilityRole='button'
                accessibilityLabel={t('accessibility.btnterms')}
                onPress={() => navigation.navigate("TermsConditions")}
                style={{ textDecorationLine: 'underline', fontFamily: 'proxima-bold' }} maxFontSizeMultiplier={1.3}>{' ' + t('createAccount.buttons.termsConditions')}</Text>
            }
          />
        </View>
      </View>
    </>
  );
};

export default Password;
