import React from 'react'
import { StyleSheet } from 'react-native';
import { TextInput as TextInputRNP } from 'react-native-paper'
import { useLightAppTheme } from '../../../themes'

function TextInput({ text, title, onChangeText, onClearText }: { text: string, title: string, onChangeText: (text: string) => void, onClearText: () => void }) {
    const lightTheme = useLightAppTheme();
    return (
        <TextInputRNP
            mode='outlined'
            textColor={lightTheme.textSolidPrimaryColor}
            outlineColor={lightTheme.textSolidPrimaryColor}
            style={styles.textInputRNP}
            value={text}
            placeholderTextColor={lightTheme.textSolidPrimaryColor}
            placeholder={`Search ${title}`}
            onChangeText={onChangeText}
            right={ <TextInputRNP.Icon icon={'close'} iconColor={lightTheme.iconSolidPrimaryColor} style={styles.iconRNP(text)} onPress={onClearText} />}
        />
    )
}

const styles = StyleSheet.create<any>({
    textInputRNP: {
        height: 38,
        width: 217,
        padding: 0,
        marginTop: -6,
        fontSize: 12,
        backgroundColor: 'transparent'
    },
    iconRNP: (text: string) => ({
        height: 20,
        marginBottom: 3,
        alignItems: 'center',
        display: (text.length !== 0) ? 'flex' : 'none',
    })
});

export default TextInput