import React, { useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../components/atoms/Gap";
import { SeasonalOrFavoriteOfList } from "../../../components";
import { RootStackScreenProps } from "../../../navigation/type";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { selectSeasonalList, seasonalListAsync, setSeasonalListToInitial } from "../../../redux/reducers/seasonalListSlice";

function SeasonalListScreen({ route, navigation }: RootStackScreenProps<'SeasonalListScreen'>) {
    const { year, season } = route.params
    const seasonalList = useAppSelector(selectSeasonalList);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(seasonalListAsync({ year, season }));

        return () => {
            dispatch(setSeasonalListToInitial());
        }
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }} >
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='anime' list={seasonalList} label={`${season?.toUpperCase()} ${year}`} navigation={navigation} />
        </View>
    )
}

export default SeasonalListScreen;