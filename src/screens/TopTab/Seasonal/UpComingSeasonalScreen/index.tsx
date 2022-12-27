import React from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import UpComingSeasonalList from "../../../../components/molecules/UpComingSeasonalList";

function UpComingSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Up Coming'>) {
    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <UpComingSeasonalList navigation={navigation} />
        </View>
    )
}

export default UpComingSeasonalScreen;