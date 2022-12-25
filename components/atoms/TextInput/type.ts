export type TextInputType = {
    text: string;
    title: string;
    onChangeText: (text: string) => void;
    onClearText: () => void;
}