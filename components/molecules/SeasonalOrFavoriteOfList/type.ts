import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootSeasonalTopTabParamList, RootStackParamList } from "../../../types";
import { CompositeNavigationProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export type SeasonalOrFavoriteOfListType = {
    type: 'anime' | 'manga';
    list: {
        mal_id: number,
        images: any,
        title: string,
        genreList: string[],
        aired?: any,
        published?: any,
        members: number,
        score: number,
        season?: string,
        year?: number
    }[];
    label: string;
    navigation:
    CompositeNavigationProp<
        MaterialTopTabNavigationProp<RootSeasonalTopTabParamList, 'Last' | 'Now' | 'Up Coming' | 'Archive', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root'| 'AnimeDetailScreen' | 'MangaDetailScreen' | 'ListScreen' | 'SeasonalListScreen' | 'TopListScreen', undefined>
    > | any;
}