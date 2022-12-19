import { MaterialIcons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientMaterialIcons = (props: any & {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
}) => {
  return (
    <MaskedView maskElement={<MaterialIcons {...props} />}>
      <LinearGradient
        colors={["rgba(0, 216, 203, 1)", "rgba(0, 102, 255, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <MaterialIcons {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>

    </MaskedView>
  );
};

export default GradientMaterialIcons;