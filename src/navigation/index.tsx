import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { RootStackParamList, RootBottomTabParamList, RootSeasonalTopTabParamList, RootFavoritesTopTabParamList } from './type';
import { BottomTabNavigatorCustom, TopTabNavigatorCustom } from '../components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { ListScreen, TopListScreen, SeasonalListScreen, AnimeDetailScreen, MangaDetailScreen } from '../screens/Stack';
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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ headerTitle: 'Anime List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="TopListScreen" component={TopListScreen} options={{ headerTitle: 'Top List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="SeasonalListScreen" component={SeasonalListScreen} options={{ headerTitle: 'Seasonal Anime List', headerTitleAlign: 'center' }} />
      <Stack.Screen name="AnimeDetailScreen" component={AnimeDetailScreen} options={{ headerTitle: 'Anime Detail', headerTitleAlign: 'center' }} />
      <Stack.Screen name="MangaDetailScreen" component={MangaDetailScreen} options={{ headerTitle: 'Manga Detail', headerTitleAlign: 'center' }} />
    </Stack.Navigator>
  );
}

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Anime"
      // screenOptions={{
      //   tabBarActiveTintColor: Colors[colorScheme].tint,
      // }}
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
  const colorScheme = useColorScheme();

  return (
    <SeasonalTopTab.Navigator
      initialRouteName='Now'
      screenOptions={{
        // tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          marginTop: StatusBar.currentHeight || 0,
        }
      }}
      tabBar={(props: MaterialTopTabBarProps) => <TopTabNavigatorCustom {...props} />}
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
  const colorScheme = useColorScheme();

  return (
    <FavoritesTopTab.Navigator
      initialRouteName='Anime'
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          marginTop: StatusBar.currentHeight || 0,
        }
      }}
      tabBar={(props: MaterialTopTabBarProps) => <TopTabNavigatorCustom {...props} />}
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