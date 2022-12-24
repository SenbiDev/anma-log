import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

function SolidMaterialIcons(props: {
    name: React.ComponentProps<typeof MaterialIcons>['name'];
    color: string;
    sizes: number;
    boxHeight: number;
    isDisabled?: boolean;
    onPress?: () => void;
  }) {
    return (
      <TouchableOpacity>
        <MaterialIcons size={props.sizes} style={{ height: props.boxHeight }} {...props} onPress={props.onPress} disabled={props.isDisabled} />
      </TouchableOpacity>
    );
  }

  export default SolidMaterialIcons