import { MaterialIcons } from "@expo/vector-icons";

export type SolidMaterialIconsType = {
    name: React.ComponentProps<typeof MaterialIcons>['name'];
    color: string;
    sizes: number;
    boxHeight: number;
    isDisabled?: boolean;
    onPress?: () => void;
};