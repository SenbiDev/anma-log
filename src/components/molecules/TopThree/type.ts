import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TopThreeType = {
    types: 'anime' | 'manga';
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Anime' | 'Manga', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
};

export type TopThreeStateType = {
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
};