import React, { useState } from 'react'
import { ScrollView, View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
//components
import Row from 'src/components/atoms/Row/Row';
import Button from 'src/components/atoms/Button/Button';
import ButtonLanguage from 'src/components/atoms/ButtonLanguage/ButtonLanguage';
import { useBottomSheet } from 'src/components/atoms/BottomSheetProvider/BottomSheetProvider';
//styles
import useStyles from 'hooks/useStyles';
import componentStyles from './LanguageOptions.styles';
//translation
import i18n from '../../i18n/i18n';
import { useTranslation } from 'react-i18next';
//icons
import Langue from 'icons/Langue.svg';
import { ASYNC_STORAGE } from 'config/constants/Global';
import { useNavigation, CommonActions  } from '@react-navigation/native';
export const LanguageOptions = () => {
  const { styles, colors } = useStyles(componentStyles);
  const { t } = useTranslation()
  const { closeModal, setModal } = useBottomSheet();
  const [showModal, setShowModal] = useState<boolean>(true);
  const [language, setLanguage] = React.useState(t('general.locale'));
  const navigation = useNavigation();

  const onPress = (isChecked: boolean) => {
    setShowModal(false);
    if (isChecked) {
      setModal({
        render: () => (
          <>
            <Langue style={styles.icon} />
            <Text style={styles.textDescriptionConf} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('language.description')} </Text>
            <View style={styles.buttonsModalCheck}>
              <Button
                title={t('getCareNow.videoCall.no')}
                variant='Text'
                textStyle={{ color: colors.GRAY_DARK, fontSize: 18 }}
                onPress={closeModal}
              />
              <Button
                title={t('getCareNow.videoCall.yes')}
                variant='Text'
                textStyle={{ color: colors.BLUEDC1, fontFamily: 'proxima-bold', fontSize: 18 }}
                onPress={() => { onChange() }}
              />
            </View>
          </>
        ),
      });
    }
  };
  const onPressmodal = (isChecked: boolean) => {
    setShowModal(false);
    if (isChecked) {
      setModal({
        render: () => (
          <>
            <Langue style={styles.icon} />
            <Text style={styles.textDescriptionConf} adjustsFontSizeToFit maxFontSizeMultiplier={1.3}>{t('language.confirm')} </Text>
            <View style={styles.buttonsModalCheck2}>
              <Button
                title={t('language.accept')}
                textStyle={{fontSize: 18,fontFamily: 'proxima-regular',color: "#ffffff"}}
                onPress={() => {
                  closeModal();
                  //Redirect to home
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [
                        { name: 'Home' },
                      ],
                    })
                  );
                }}
              />
            </View>
          </>
        ),
      });
    }
  };
  const onChangeLang = async (lang: any) => {
    await i18n.changeLanguage(lang);
    try {
      await AsyncStorage.setItem(ASYNC_STORAGE.LANGUAGE, lang);
      setModal(onPressmodal)
    } catch (error) {

    }
  }
  const onChange = () => {
    onChangeLang(language);

  }
  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 10 }}>
        <Row style={{ flexDirection: 'column' }}>
          <ButtonLanguage
            isChecked={language == "en"}
            title={t('language.english')}
            onPress={() => { setLanguage("en") }}
          />
          <ButtonLanguage
            isChecked={language == "es"}
            title={t('language.spanish')}
            onPress={() => { setLanguage("es") }}
          />
          <Button style={{ alignSelf: 'center', width: 200, marginTop: 50 }} title={t('language.buttonSave')} onPress={onPress} disabled={language == t('general.locale')} />
        </Row>
      </View>
    </ScrollView>
  )
}
