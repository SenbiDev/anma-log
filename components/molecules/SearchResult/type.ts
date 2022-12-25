import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type SearchResultType = {
    types: 'anime' | 'manga' | string;
    letter: string;
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, "Search", undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >;
};

export type SearchResultStateType = {
    mal_id: number;
    images: any;
    title: string;
    type: string;
    episodes: number;
    volumes: number;
    aired: any;
    published: any;
    members: number;
    score: number;
};