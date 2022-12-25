import { MaterialIcons } from '@expo/vector-icons';

export type GradientBackgroundType = {
    paddingHorizontal: number;
    paddingVertical: number;
    width?: number | string;
    height?: number | string;
    alignItems?: 'baseline' | 'center' | 'flex-start' | 'flex-end' | 'stretch';
    onPress: () => void;
    children: React.ReactNode
}

export type GradientMaterialIconsType = {
    name: React.ComponentProps<typeof MaterialIcons>['name'];
}