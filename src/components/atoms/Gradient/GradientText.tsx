import { PoppinsMediumText } from '../../StyledText';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = (props: any) => {
  return (
    <MaskedView maskElement={<PoppinsMediumText {...props} />}>
      <LinearGradient
        colors={["rgba(0, 216, 203, 1)", "rgba(0, 102, 255, 1)"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.3, y: 0.9 }}
      >
        <PoppinsMediumText {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;