import React from 'react'
import { TextInput as TextInputRNP } from 'react-native-paper'
import { useLightAppTheme } from '../../../themes'

function TextInput({ text, title, height = 38, width = 127, onChangeText, onClearText }: { text: string, title: string, height?: number, width?: number,  onChangeText: (text: string) => void, onClearText: () => void }) {
    const lightTheme = useLightAppTheme();
    return (
        <TextInputRNP
            mode='outlined'
            textColor={lightTheme.textSolidPrimaryColor}
            outlineColor={lightTheme.textSolidPrimaryColor}
            style={{ height: 38, width: 217, padding: 0, marginTop: -6, fontSize: 12, backgroundColor: 'transparent' }}
            value={text}
            placeholderTextColor={lightTheme.textSolidPrimaryColor}
            placeholder={`Search ${title}`}
            onChangeText={onChangeText}
            right={ <TextInputRNP.Icon icon={'close'} iconColor={lightTheme.iconSolidPrimaryColor} style={{ height: 20, marginBottom: 3, alignItems: 'center', display: (text.length !== 0) ? 'flex' : 'none' }} onPress={onClearText} />}
        />
    )
}

export default TextInput