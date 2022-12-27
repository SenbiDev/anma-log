import { View } from "react-native"
import { TopList } from "../../../components";
import { RootStackScreenProps } from "../../../navigation/type";
import { Gap } from "../../../components";

function TopListScreen({ route, navigation }: RootStackScreenProps<'TopListScreen'>) {
    const { types } = route.params
    return (
        <View>
            <Gap height={24} />
            <TopList types={types} navigation={navigation} />
        </View>
    )
}

export default TopListScreen;