import { ScrollView } from "react-native"
import { TopList } from "../../../components";
import { RootStackScreenProps } from "../../../types";

function TopListScreen({ route, navigation }: RootStackScreenProps<'TopListScreen'>) {
    const { types } = route.params
    return (
        <ScrollView>
            <TopList types={types} navigation={navigation} />
        </ScrollView>
    )
}

export default TopListScreen;