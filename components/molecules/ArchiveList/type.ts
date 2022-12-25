import { CompositeNavigationProp } from "@react-navigation/native";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RootBottomTabParamList, RootSeasonalTopTabParamList, RootStackParamList } from "../../../types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type ArchiveListType = {
    navigation: CompositeNavigationProp<
        MaterialTopTabNavigationProp<RootSeasonalTopTabParamList, "Archive", undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >
};

export type ArchiveListStateType = {
    year: number;
    seasons: ["winter"] | ["winter", "spring"] |["winter", "spring", "summer"] | ["winter", "spring", "summer", "fall"];
}