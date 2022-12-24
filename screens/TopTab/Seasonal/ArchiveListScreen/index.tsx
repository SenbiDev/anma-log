import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { ArchiveList } from "../../../../components";

function ArchiveListScreen({ navigation }: any) {
    return (
      <View style={{ flex: 1 }} >
        <Gap height={30} />
        <ArchiveList navigation={navigation} />
      </View>
    )
  }

export default ArchiveListScreen;