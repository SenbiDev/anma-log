import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ThemesType = {
    type: 'anime' | 'manga';
    themeList: ThemesStateType | [];
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Anime' | 'Manga', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
};

export type ThemesStateType = [
    [
        { name: string; mal_id: number; },
        { name: string; mal_id: number; }
    ]
];