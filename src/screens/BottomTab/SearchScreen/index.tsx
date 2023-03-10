import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Gap from '../../../components/atoms/Gap';
import Accordion from "../../../components/atoms/Accordion";
import TextInput from "../../../components/atoms/TextInput";
import { SearchResult } from "../../../components";
import { useLightAppTheme } from "../../../themes";
import { RootBottomTabScreenProps } from '../../../navigation/type';

function SearchScreen({ navigation }: RootBottomTabScreenProps<'Search'>) {
    const ligthTheme = useLightAppTheme();
    const [title, setTitle] = useState('Anime');
    const [text, setText] = useState('');

    const onChangeText = (text: string) => {
        setText(text);
    }

    const onClearText = () => {
        setText('');
    }

    return (
        <View style={styles.container}>
            <Gap height={24} />
            <View style={styles.row}>
                <Accordion title={title} handleTitlePress={setTitle} />
                <Gap width={7} />
                <TextInput
                    title={title}
                    text={text}
                    onChangeText={onChangeText}
                    onClearText={onClearText}
                />
            </View>
            <Gap height={30} />
            <Text style={styles.text(ligthTheme.textSolidPrimaryColor)} >Result</Text>
            <Gap height={20} />
            <SearchResult types={title.toLowerCase()} letter={text} navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'transparent',
        paddingHorizontal: 24
    },
    text: (color: string) => ({
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: color,
        marginLeft: 24
    })
});

export default SearchScreen;