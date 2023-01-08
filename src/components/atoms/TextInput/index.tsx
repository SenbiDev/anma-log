import React from 'react'
import { StyleSheet } from 'react-native';
import { TextInput as TextInputRNP } from 'react-native-paper'
import { useLightAppTheme } from '../../../themes'
import { TextInputType } from './type';

function TextInput({ text, title, onChangeText, onClearText }: TextInputType) {
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
        width: '73%',
        padding: 0,
        marginTop: -6,
        fontSize: 12,
        fontFamily: 'poppins-regular',
        backgroundColor: 'transparent',
        color: 'red'
    },
    iconRNP: (text: string) => ({
        height: 20,
        marginBottom: 3,
        alignItems: 'center',
        display: (text.length !== 0) ? 'flex' : 'none',
    })
});

export default TextInput