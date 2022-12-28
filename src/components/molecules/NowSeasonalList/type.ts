import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import { RootSeasonalTopTabParamList, RootStackParamList } from "../../../navigation/type"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type NowSeasonalListType = {
    navigation: CompositeNavigationProp<
        MaterialTopTabNavigationProp<RootSeasonalTopTabParamList, "Now", undefined>,
        NativeStackNavigationProp<RootStackParamList, 'Root', undefined>
    >
}