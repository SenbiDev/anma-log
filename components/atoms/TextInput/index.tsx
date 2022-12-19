import React from 'react'
import { TextInput as TextInputRNP } from 'react-native-paper'

function TextInput({ text, title, height = 38, width = 127, onChangeText }: { text: string, title: string, height?: number, width?: number,  onChangeText: (text: string) => void }) {
    return (
        <TextInputRNP
            mode='outlined'
            outlineColor='black'
            style={{ height: 38, width: 217, padding: 0, marginTop: -6, fontSize: 12, backgroundColor: 'transparent' }}
            value={text}
            placeholder={`Search ${title}`}
            // onChangeText={text => setText(text)}
            onChangeText={onChangeText}
        />
    )
}

export default TextInput