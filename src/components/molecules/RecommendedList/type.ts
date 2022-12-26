import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RecommendedListType = {
    type: 'anime' | 'manga';
    recommendedList: {
        mal_id: number;
        title: string;
        images: any;
    }[];
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Anime' | 'Manga', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
};

export type RecommendedListStateType = {
    mal_id: number;
    title: string;
    images: any;
};