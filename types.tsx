import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootBottomTabParamList> | undefined;
  ListScreen: { type: 'anime' | 'manga', mal_id: number };
  TopListScreen: { types: 'anime' | 'manga' };
  SeasonalListScreen: { year: number, season: 'winter' | 'spring' | 'summer' | 'fall' | undefined };
  AnimeDetailScreen: { mal_id: number };
  MangaDetailScreen: { mal_id: number };
};

export type RootBottomTabParamList = {
  Anime: undefined;
  Manga: undefined;
  Search: undefined;
  Seasonal: NavigatorScreenParams<RootSeasonalTopTabParamList> | undefined;
  Favorites: NavigatorScreenParams<RootFavoritesTopTabParamList> | undefined;
};

export type RootSeasonalTopTabParamList = {
  Last: undefined;
  Now: undefined;
  ['Up Coming']: undefined;
  Archive: { year: number, season: string };
};

export type RootFavoritesTopTabParamList = {
  Anime: undefined;
  Manga: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootBottomTabScreenProps<Screen extends keyof RootBottomTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootBottomTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootSeasonalTopTabScreenProps<TopTabScreens extends keyof RootSeasonalTopTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<RootSeasonalTopTabParamList, TopTabScreens>,
  NativeStackScreenProps<RootStackParamList>
>;

export type RootFavoritesTopTabScreenProps<TopTabScreens extends keyof RootFavoritesTopTabParamList> = CompositeScreenProps<
  MaterialTopTabScreenProps<RootFavoritesTopTabParamList, TopTabScreens>,
  BottomTabScreenProps<RootBottomTabParamList>
>;