import { ScrollView } from "react-native"
import { List } from "../../../components";

function ListScreen({ route, navigation }: any) {
    const { type, mal_id } = route.params
    return (
        <ScrollView>
            <List types={type} id={mal_id} navigation={navigation} />
        </ScrollView>
    )
}

export default ListScreen;