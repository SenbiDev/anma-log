import React, { useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { SeasonalOrFavoriteOfList } from "../../../../components";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { selectUpComingSeasonalList, upComingSeasonalListAsync } from "../../../../redux/reducers/upComingSeasonalListSlice";

function UpComingSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Up Coming'>) {
    const seasonalList  = useAppSelector(selectUpComingSeasonalList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(upComingSeasonalListAsync());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='anime' list={seasonalList.value} label={seasonalList.seasonalName} navigation={navigation} />
        </View>
    )
}

export default UpComingSeasonalScreen;