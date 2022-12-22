import {
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3DarkTheme,
    MD3LightTheme,
    adaptNavigationTheme,
    useTheme,
} from 'react-native-paper';
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3DarkTheme, LightTheme);
const CombinedDarkTheme = merge(MD3LightTheme, DarkTheme);

export const lightTheme = {
    ...CombinedDefaultTheme,
    textSolidPrimaryColor: '#252525',
    textSolidSecondaryColor: '#444444',
    iconSolidPrimaryColor: '#252525',
    iconSolidSecondaryColor: 'grey',
    bottomTabBackgroundColor: 'white',
    topTabBackgroundColor: 'white',
    cardColor: 'white',
    colors: {
        ...CombinedDefaultTheme.colors,
    },
}

export const darkTheme = {
    ...CombinedDarkTheme,
    textSolidPrimaryColor: 'white',
    textSolidSecondaryColor: '#DADADA',
    iconSolidPrimaryColor: 'white',
    iconSolidSecondaryColor: 'grey',
    bottomTabBackgroundColor: '#252525',
    topTabBackgroundColor: '#252525',
    cardColor: '#252525',
    colors: {
        ...CombinedDarkTheme.colors,
        background: '#171717',
    },
}

export type LightAppTheme = typeof lightTheme;
export const useLightAppTheme = () => useTheme<LightAppTheme>();