import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { CompositeNavigationProp } from "@react-navigation/native";
import { RootBottomTabParamList, RootStackParamList } from "../../../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TopListType = {
    types: 'anime' | 'manga';
    navigation: CompositeNavigationProp<
        BottomTabNavigationProp<RootBottomTabParamList, 'Anime', undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    > | 
    NativeStackNavigationProp<
        RootStackParamList, "TopListScreen", undefined
    >;
};

export type TopListStateType = {
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