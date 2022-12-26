import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { GradientBackground, Gap } from '../../atoms';
import { ThemesType } from './type';

function Themes({type, themeList, navigation}: ThemesType) {
    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {themeList?.map((theme, index) => (
                <View key={index} style={styles.buttonsColumn}>
                    <View>
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[0].mal_id })} >
                            <Text style={styles.text}>
                                {theme[0].name}
                            </Text>
                        </GradientBackground>
                        <Gap height={10} />
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[1].mal_id })} >
                            <Text style={styles.text}>
                                {theme[1].name}
                            </Text>
                        </GradientBackground>
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
})

export default Themes