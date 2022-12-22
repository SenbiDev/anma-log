import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { lightTheme, darkTheme } from './themes';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PaperProvider theme={colorScheme === 'dark' ? darkTheme :lightTheme}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={ colorScheme === 'dark' ? '#171717' : 'white' } style={ colorScheme === 'dark' ? 'light' : 'dark' } />
          <Navigation colorScheme={colorScheme === 'dark' ? darkTheme : lightTheme} />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
