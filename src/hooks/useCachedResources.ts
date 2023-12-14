/* eslint-disable global-require */
import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'IBMPlexSans-SemiBold': require('assets/fonts/IBMPlexSans-SemiBold.otf'),
          'ocr-a': require('assets/fonts/ocr-a.otf'),
          'proxima-regular': require('assets/fonts/proxima-nova-regular.otf'),
          'proxima-bold': require('assets/fonts/proxima-nova-bold.otf'),
          'proxima-semibold': require('assets/fonts/proxima-nova-semibold.otf'),
          'proxima-light': require('assets/fonts/proxima-nova-light.otf'),
          'proxima-thin': require('assets/fonts/proxima-nova-thin.otf'),
          'proxima-black': require('assets/fonts/proxima-nova-black.otf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
