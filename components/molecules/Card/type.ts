import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootSeasonalTopTabParamList, RootStackParamList } from "../../../types";
import { CompositeNavigationProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";

export type CardType = {
    type: 'anime' | 'manga';
    mal_id: number;
    images: any;
    title: string;
    genres: string[];
    aired?: any;
    published: any;
    members: number;
    score: number;
    navigation:  
    CompositeNavigationProp<
        MaterialTopTabNavigationProp<RootSeasonalTopTabParamList, 'Last' | 'Now' | 'Up Coming' | 'Archive', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root'| 'AnimeDetailScreen' | 'MangaDetailScreen' | 'ListScreen' | 'SeasonalListScreen' | 'TopListScreen', undefined>
    > | any;
};