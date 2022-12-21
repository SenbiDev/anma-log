/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList> | undefined;
  AnimeListScreen: undefined;
  TopAnimeListScreen: undefined;
  TopMangaListScreen: undefined;
  SeasonalListScreen: undefined;
  AnimeDetailScreen: undefined;
  MangaDetailScreen: undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootBottomTabParamList = {
  Anime: undefined;
  Manga: undefined;
  Search: undefined;
  Seasonal: NavigatorScreenParams<RootSeasonalTopTabParamList> | undefined;
  Favorites: NavigatorScreenParams<RootFavoritesTopTabParamList> | undefined;
};

export type RootTabScreenProps<Screen extends keyof RootBottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootSeasonalTopTabParamList = {
  Last: undefined;
  Now: undefined;
  ['Up Coming']: undefined;
  Archive: undefined;
};

export type RootFavoritesTopTabParamList = {
  Anime: undefined;
  Manga: undefined;
};
