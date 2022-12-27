import React, { useEffect } from "react";
import { View } from "react-native";
import Gap from "../../../components/atoms/Gap";
import { RootStackScreenProps } from "../../../navigation/type";
import SeasonalList from "../../../components/molecules/SeasonalList";

function SeasonalListScreen({ route, navigation }: RootStackScreenProps<'SeasonalListScreen'>) {
    const { year, season } = route.params

    return (
        <View style={{ flex: 1 }} >
            <Gap height={30} />
            <SeasonalList year={year} season={season!!} navigation={navigation} />
        </View>
    )
}

export default SeasonalListScreen;