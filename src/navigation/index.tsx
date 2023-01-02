import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { useLightAppTheme } from '../themes';
import { RootStackParamList, RootBottomTabParamList, RootSeasonalTopTabParamList, RootFavoritesTopTabParamList } from './type';
import { BottomTabNavigatorCustom } from '../components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SplashScreen, ListScreen, TopListScreen, SeasonalListScreen, AnimeDetailScreen, MangaDetailScreen } from '../screens/Stack';
import { AnimeScreen, MangaScreen, SearchScreen } from '../screens/BottomTab';
import { LastSeasonalScreen, NowSeasonalScreen, UpComingSeasonalScreen, ArchiveListScreen, AnimeFavoritesListScreen, MangaFavoritesListScreen } from '../screens/TopTab';

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTab = createBottomTabNavigator<RootBottomTabParamList>();
const SeasonalTopTab = createMaterialTopTabNavigator<RootSeasonalTopTabParamList>();
const FavoritesTopTab = createMaterialTopTabNavigator<RootFavoritesTopTabParamList>();

export default function Navigation({ colorScheme }: { colorScheme: any }) {
  return (
    <NavigationContainer
      theme={colorScheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

function RootNavigator() {
  const lightTheme = useLightAppTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ListScreen" component={ListScreen} options={({ route }) => ({ title: route.params.type === 'anime' ? 'Anime List' : 'Manga List', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 12, fontFamily: 'poppins-regular' }, headerStyle: { backgroundColor: lightTheme.topTabBackgroundColor } })} />
      <Stack.Screen name="TopListScreen" component={TopListScreen} options={({ route }) => ({ title: route.params.types === 'anime' ? 'Top Anime List' : 'Top Manga List', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 12, fontFamily: 'poppins-regular' }, headerStyle: { backgroundColor: lightTheme.topTabBackgroundColor } })} />
      <Stack.Screen name="SeasonalListScreen" component={SeasonalListScreen} options={{ headerTitle: 'Seasonal Anime List', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 12, fontFamily: 'poppins-regular' }, headerStyle: { backgroundColor: lightTheme.topTabBackgroundColor } }} />
      <Stack.Screen name="AnimeDetailScreen" component={AnimeDetailScreen} options={{ headerTitle: 'Anime Detail', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 12, fontFamily: 'poppins-regular' }, headerStyle: { backgroundColor: lightTheme.topTabBackgroundColor } }} />
      <Stack.Screen name="MangaDetailScreen" component={MangaDetailScreen} options={{ headerTitle: 'Manga Detail', headerTitleAlign: 'center', headerTitleStyle: { fontSize: 12, fontFamily: 'poppins-regular' }, headerStyle: { backgroundColor: lightTheme.topTabBackgroundColor } }} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Anime"
      tabBar={(props: BottomTabBarProps) => <BottomTabNavigatorCustom {...props} />}
    >
      <BottomTab.Screen
        name="Anime"
        component={AnimeScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Manga"
        component={MangaScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Seasonal"
        component={SeasonalTopTabNavigator}
        options={{ headerShown: false }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesTopTabNavigator}
        options={{ headerShown: false }}
      />
    </BottomTab.Navigator>
  );
}

function SeasonalTopTabNavigator() {
  const lightTheme = useLightAppTheme();

  return (
    <SeasonalTopTab.Navigator
      initialRouteName='Now'
      screenOptions={{ tabBarStyle: { marginTop: StatusBar.currentHeight || 0, backgroundColor: lightTheme.topTabBackgroundColor }, tabBarActiveTintColor: 'rgba(0, 102, 255, 1)', tabBarInactiveTintColor: lightTheme.textSolidPrimaryColor, tabBarIndicatorStyle: { backgroundColor: 'rgba(0, 102, 255, 1)' }, tabBarLabelStyle: { fontFamily: 'poppins-regular', fontSize: 12, padding: 0, margin: 0, textTransform: 'capitalize'} }}
    >
      <SeasonalTopTab.Screen
        name='Last'
        component={LastSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Now'
        component={NowSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Up Coming'
        component={UpComingSeasonalScreen}
      />
      <SeasonalTopTab.Screen
        name='Archive'
        component={ArchiveListScreen}
      />
    </SeasonalTopTab.Navigator>
  );
}

function FavoritesTopTabNavigator() {
  const lightTheme = useLightAppTheme();

  return (
    <FavoritesTopTab.Navigator
      initialRouteName='Anime'
      screenOptions={{ tabBarStyle: { marginTop: StatusBar.currentHeight || 0, backgroundColor: lightTheme.topTabBackgroundColor }, tabBarActiveTintColor: 'rgba(0, 102, 255, 1)', tabBarInactiveTintColor: lightTheme.textSolidPrimaryColor, tabBarIndicatorStyle: { backgroundColor: 'rgba(0, 102, 255, 1)' }, tabBarLabelStyle: { fontFamily: 'poppins-regular', fontSize: 12, padding: 0, margin: 0, textTransform: 'capitalize'} }}
    >
      <FavoritesTopTab.Screen
        name='Anime'
        component={AnimeFavoritesListScreen}
      />
      <FavoritesTopTab.Screen
        name='Manga'
        component={MangaFavoritesListScreen}
      />
    </FavoritesTopTab.Navigator>
  );
}