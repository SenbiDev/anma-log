import { MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        await Font.loadAsync({
          ...MaterialIcons.font,
          'poppins-regular': require('../../assets/fonts/Poppins-Regular.ttf'),
          'poppins-medium': require('../../assets/fonts/Poppins-Medium.ttf'),
          'poppins-semiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
          'poppins-bold': require('../../assets/fonts/Poppins-Bold.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
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
