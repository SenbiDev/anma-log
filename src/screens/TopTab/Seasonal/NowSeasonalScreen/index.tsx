import React, { useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { SeasonalOrFavoriteOfList } from "../../../../components";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import { selectNowSeasonalList, nowSeasonalListAsync } from "../../../../redux/reducers/nowSeasonalListSlice";

function NowSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Now'>) {
    const seasonalList  = useAppSelector(selectNowSeasonalList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(nowSeasonalListAsync());
    }, [dispatch]);

    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='anime' list={seasonalList.value} label={seasonalList.seasonalName} navigation={navigation} />
        </View>
    )
}

export default NowSeasonalScreen;