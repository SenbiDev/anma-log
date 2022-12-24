import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, StyleSheet } from 'react-native';

const GradientBackground = ({ paddingHorizontal, paddingVertical, width, height, alignItems, onPress, children }: { paddingHorizontal: number, paddingVertical: number, width?: number | string, height?: number | string, alignItems?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch', onPress: () => void, children: React.ReactNode }) => {
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
    linearGradient: ({ paddingHorizontal, paddingVertical, width, height, alignItems, onPress}: { paddingHorizontal: number, paddingVertical: number, width?: number | string, height?: number | string, alignItems?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch', onPress: () => void }) => ({
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