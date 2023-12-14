import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Hooks
import useStyles from 'hooks/useStyles';
// Types, Styles
import { AlertErrorContextProps, ErrorAlertProviderProps as Props } from './ErrorAlertProvider.types';
import { View, Text, Animated } from 'react-native';
import Times from 'icons/Times.svg';
import CheckOk from 'icons/checkOk.svg';
import Circle from 'icons/circle-exclamation.svg';
import componentStyles from './ErrorAlertProvider.styles';

import IconButton from '../IconButton/IconButton';
import Button from '../Button/Button';
import { t } from 'i18next';
import UsersService from 'adapter/api/usersService';
import { useAppDispatch, useAppSelector } from 'adapter/hooks';
import { userSelectors } from 'adapter/user/userSelectors';
import { userActions } from 'adapter/user/userSlice';

const AlertErrorContext = createContext<AlertErrorContextProps | undefined>(undefined);

/**
 * Render a ErrorAlertProvider.
 * @since 1.0.0
 */
const ErrorAlertProvider: React.FC<any> = (props) => {
  const { children, eventState } = props;
  const { styles } = useStyles(componentStyles);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [typeAlert, setTypeAlert] = useState<string>('error');
  const [createNotificationApp] = UsersService.useCreateNotificationAppMutation();
  const { tempDeleteNotification } = useAppSelector(userSelectors.selectNotificationsList);
  const dispatch = useAppDispatch();

  const setAlertErrorMessage = (error: string, type?: 'error' | 'warning' | 'success' | 'successNotification') => {
    console.log('---type---', type)
    setTypeAlert(type ?? 'error')
    setErrorMessage(error);
  };

  const post_undo = useCallback(async () => {
    try {
      if (tempDeleteNotification?.type == 'delete') {
        await createNotificationApp({ ...tempDeleteNotification?.data, viewed: true }).unwrap();
      }
      dispatch(userActions.setTempDeleteNotification({ type: 'delete', data: tempDeleteNotification?.data, status: true }))
    } catch (error) {
      console.log('---error---', error)
    }
  }, [createNotificationApp, tempDeleteNotification]);


  useEffect(() => {
    setErrorMessage(undefined);
  }, [eventState]);

  const value = useMemo(() => ({
    setAlertErrorMessage,
  }), []);

  let startValue = new Animated.Value(-700);
  const duration = 300;
  useMemo(
    () => {
      if (errorMessage) {
        startValue = new Animated.Value(-700);
        let endValue = 0;
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }).start();
      } else {
        startValue = new Animated.Value(0);
        let endValue = -700;
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }).start();
      }
    },
    [errorMessage],
  );

  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (errorMessage) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [errorMessage]);

  const animatedStyle = {
    opacity: opacity,
  };


  return (
    <AlertErrorContext.Provider value={value}>
      {children}
      {errorMessage != undefined ? <Animated.View
        style={[
          typeAlert == 'success' && styles.colorSucces,
          typeAlert == 'successNotification' && styles.colorSucces,
          typeAlert == 'error' && styles.colorError,
          typeAlert == 'warning' && styles.colorWarning,
          styles.container,
          animatedStyle,
        ]}>
        <View style={{ padding: 6 }}>
          <IconButton
            accessibilityRole='link'
            accessibilityLabel={t('accessibility.linkCancel2')}
            onPress={() => { setErrorMessage(undefined) }}
            style={[
              styles.icon,
              typeAlert == 'success' && styles.colorIconSucces,
              typeAlert == 'successNotification' && styles.colorIconSucces,
              typeAlert == 'error' && styles.colorIconError,
              typeAlert == 'warning' && styles.colorIconWarning,
            ]}
            icon={
              typeAlert == 'success' || typeAlert == 'successNotification' ? <CheckOk /> : typeAlert == 'warning' ? <Circle /> : <Times />
            } />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text} maxFontSizeMultiplier={1.3}>{errorMessage}</Text>
          <Button title={typeAlert == 'successNotification' ? t('notifications.btnUndo') : t('common.close')}
            accessibilityRole='button'
            accesibilityLabel={t('accessibility.linkCancel2')}
            onPress={() => { if (typeAlert == 'successNotification') post_undo(); setErrorMessage(undefined); }}
            variant='Underline'
            textStyle={[styles.button, typeAlert == 'warning' && { color: '#000' }]} />
        </View>
      </Animated.View> : <></>}
    </AlertErrorContext.Provider>
  );
};

export const useErrorAlert = () => {
  const context = useContext(AlertErrorContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a BottomSheetProvider');
  }
  return context;
};

export default ErrorAlertProvider;

