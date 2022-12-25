import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { GradientBackgroundType } from './type';

const GradientBackground = ({ paddingHorizontal, paddingVertical, width, height, alignItems, onPress, children }: GradientBackgroundType) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <LinearGradient
                start={{ x: 0.3, y: 0.1 }}
                end={{ x: 1, y: 1 }}
                colors={['rgba(0, 216, 203, 1)', 'rgba(0, 102, 255, 1)']}
                style={styles.linearGradient({ alignSelf: 'flex-start', paddingHorizontal: paddingHorizontal, paddingVertical: paddingVertical, borderRadius: 3, width: width, height: height, alignItems: alignItems })}
            >
                {children}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create<any>({
    linearGradient: ({ paddingHorizontal, paddingVertical, width, height, alignItems }: Omit<GradientBackgroundType, 'onPress' | 'children'>) => ({
        alignSelf: 'flex-start',
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
        borderRadius: 3,
        width: width,
        height: height,
        alignItems: alignItems
    })
})

export default GradientBackground