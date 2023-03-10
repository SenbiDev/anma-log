
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import TabItem from "../../atoms/TabItem";
import { useLightAppTheme } from '../../../themes';

const BottomTabNavigatorCustom = ({state, descriptors, navigation}: BottomTabBarProps) => {
  const lightTheme = useLightAppTheme();
    return (
      <View style={styles.container(lightTheme.bottomTabBackgroundColor)} >
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
  
          return (
            <TabItem
              key={index}
              title={label}
              active={isFocused}
              onPress={onPress}
              onLongPress={onLongPress}
            />
          );
        })}
      </View>
    );
  };
  
  export default BottomTabNavigatorCustom;

  const styles = StyleSheet.create<any>({
    container: (color: string) => ({
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 13,
      height: 67,
      backgroundColor: color,
      elevation: 10,
      shadowOffset: { width: 0, height: 7 },
      shadowColor: 'black',
      shadowOpacity: 1,
    }),
  });