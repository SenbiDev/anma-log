import React, { useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { SeasonalOrFavoriteOfList } from "../../../../components";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { selectLastSeasonalList, lastSeasonalListAsync } from "../../../../redux/reducers/lastSeasonalListSlice";

function LastSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Last'>) {
    const seasonalList  = useAppSelector(selectLastSeasonalList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(lastSeasonalListAsync());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='anime' list={seasonalList.value} label={seasonalList.seasonalName} navigation={navigation} />
        </View>
    )
}

export default LastSeasonalScreen;