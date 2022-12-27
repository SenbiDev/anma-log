import React from "react";
import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";
import LastSeasonalList from "../../../../components/molecules/LastSeasonalList";


function LastSeasonalScreen({ navigation }: RootSeasonalTopTabScreenProps<'Last'>) {
    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <LastSeasonalList navigation={navigation} />
        </View>
    )
}

export default LastSeasonalScreen;