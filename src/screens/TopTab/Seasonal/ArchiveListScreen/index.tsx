import { View } from "react-native";
import Gap from "../../../../components/atoms/Gap";
import { ArchiveList } from "../../../../components";
import { RootSeasonalTopTabScreenProps } from "../../../../navigation/type";

function ArchiveListScreen({ navigation }: RootSeasonalTopTabScreenProps<'Archive'>) {
    return (
      <View style={{ flex: 1 }} >
        <Gap height={30} />
        <ArchiveList navigation={navigation} />
      </View>
    )
  }

export default ArchiveListScreen;