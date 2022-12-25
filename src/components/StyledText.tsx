import { Text, TextProps } from 'react-native';

export function PoppinsRegularText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins-regular' }]} />;
}

export function PoppinsMediumText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins-medium' }]} />;
}

export function PoppinsSemiBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins-semiBold' }]} />;
}

export function PoppinsBoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: 'poppins-bold' }]} />;
}
