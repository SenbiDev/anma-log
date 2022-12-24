import { ScrollView } from "react-native"
import { TopList } from "../../../components";

function TopListScreen({ route, navigation }: any) {
    const { types } = route.params
    return (
        <ScrollView>
            <TopList types={types} navigation={navigation} />
        </ScrollView>
    )
}

export default TopListScreen;