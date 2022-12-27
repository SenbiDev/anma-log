import React from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import NowSeasonalList from "../../../../components/molecules/NowSeasonalList";

function NowSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Now'>) {

    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <NowSeasonalList navigation={navigation} />
        </View>
    )
}

export default NowSeasonalScreen;