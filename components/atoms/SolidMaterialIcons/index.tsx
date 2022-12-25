import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { SolidMaterialIconsType } from './type';

function SolidMaterialIcons(props: SolidMaterialIconsType) {
    return (
      <TouchableOpacity>
        <MaterialIcons size={props.sizes} style={{ height: props.boxHeight }} {...props} onPress={props.onPress} disabled={props.isDisabled} />
      </TouchableOpacity>
    );
  }

  export default SolidMaterialIcons