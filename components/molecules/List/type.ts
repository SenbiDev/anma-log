import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types";

export type ListType = {
    types: 'anime' | 'manga';
    id: number;
    navigation: NativeStackNavigationProp<
        RootStackParamList, "ListScreen", undefined
    >;
};

export type ListStateType = {
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