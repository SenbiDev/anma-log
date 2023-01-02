import React from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
import { Gap } from '../../atoms';
import { ThemesType } from './type';

function Themes({type, themeList, navigation}: ThemesType) {
    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {themeList?.map((theme, index) => (
                <View key={index} style={styles.buttonsColumn}>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[0].mal_id })} >
                            <Text style={styles.text}>
                                {theme[0].name}
                            </Text>
                        </TouchableOpacity>
                        <Gap height={10} />
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[1].mal_id })} >
                            <Text style={styles.text}>
                                {theme[1].name}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Gap width={10} />
                </View>
            ))}
            <Gap width={14} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginLeft: 24,
    },
    buttonsColumn : {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'poppins-semiBold',
    },
    button: {
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingHorizontal: 18,
        paddingVertical: 7,
        backgroundColor: 'rgba(0, 102, 255, 1)',
        width: '100%',
        alignItems: 'center'
    },
})

export default Themes