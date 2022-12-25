import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ItemType = {
    types: 'anime' | 'manga';
    mal_id: number;
    images: any;
    title: string;
    type: string;
    episodes?: number;
    volumes?: number;
    aired?: any;
    published?: any;
    members: number;
    score: number;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Anime' | 'Favorites' | 'Manga' | 'Search' | 'Seasonal', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    > | 
    NativeStackNavigationProp<
        RootStackParamList,'Root' | 'TopListScreen' | 'AnimeDetailScreen' | 'ListScreen' | 'MangaDetailScreen' | 'SeasonalListScreen', undefined
    > | any;
};