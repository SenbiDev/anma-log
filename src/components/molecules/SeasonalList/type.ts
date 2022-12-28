import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/type";

export type SeasonalListType = {
    year: number;
    season: 'winter' | 'spring' | 'summer' | 'fall';
    navigation: NativeStackNavigationProp<RootStackParamList, 'SeasonalListScreen', undefined>;
}