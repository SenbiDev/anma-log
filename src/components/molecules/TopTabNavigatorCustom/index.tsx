import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs/lib/typescript/src/types';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useLightAppTheme } from '../../../themes';
import { GradientText } from '../../atoms';

function TopTabNavigatorCustom({ state, descriptors, navigation }: MaterialTopTabBarProps) {
    const lightTheme = useLightAppTheme()
    
    return (
        <View style={styles.container(lightTheme.topTabBackgroundColor)}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
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
                        canPreventDefault: true
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
                    <View key={index} style={styles.tab(lightTheme.topTabBackgroundColor)} >
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={styles.touchable}>
                            {isFocused ? <GradientText style={styles.gradientText} >{(label as string)}</GradientText> :
                                <Text style={styles.solidText(lightTheme.textSolidPrimaryColor)} >{(label as string)}</Text>}
                            <LinearGradient
                                // Background Linear Gradient
                                start={{ x: 0.3, y: 0.1 }}
                                end={{ x: 1, y: 1 }}
                                colors={['rgba(0, 216, 203, 1)', 'rgba(0, 102, 255, 1)']}
                                style={styles.linearGradient(isFocused)}
                            />
                            <View>
                            </View>

                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

const styles =  StyleSheet.create<any>({
    container: (color: string) => ({
        flexDirection: 'row',
        backgroundColor: color,
        paddingTop: 15,
        elevation: 7,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 1
    }),
    tab: (color: string) => ({
        flex: 1, flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: color,
        marginTop: StatusBar.currentHeight || 0
    }),
    touchable: {
        width: '100%'
    },
    gradientText: {
        paddingBottom: 12,
        textAlign: 'center'
    },
    solidText: (color: string) => ({
        paddingBottom: 12,
        fontFamily: 'poppins-regular',
        textAlign: 'center',
        color: color
    }),
    linearGradient: (isFocused: boolean) => (
        isFocused && { height: 2, width: '100%' }
    ),
})

export default TopTabNavigatorCustom;