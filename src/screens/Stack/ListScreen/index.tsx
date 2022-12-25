import { ScrollView } from "react-native"
import { List } from "../../../components";
import { RootStackScreenProps } from "../../../navigation/type";

function ListScreen({ route, navigation }: RootStackScreenProps<'ListScreen'>) {
    const { type, mal_id } = route.params
    return (
        <ScrollView>
            <List types={type} id={mal_id} navigation={navigation} />
        </ScrollView>
    )
}

export default ListScreen;