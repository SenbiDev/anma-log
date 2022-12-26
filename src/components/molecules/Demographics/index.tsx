import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { GradientBackground, Gap } from '../../atoms';
import { DemographicsType } from './type';

function Demographics({type, demographicList, navigation}: DemographicsType) {
    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {demographicList?.map(({name, mal_id}, index) => (
                <View key={index} style={styles.button}>
                    <GradientBackground paddingHorizontal={18} paddingVertical={7} onPress={() => navigation.navigate('ListScreen', { type, mal_id })}>
                        <Text style={styles.text}>
                            {name}
                        </Text>
                    </GradientBackground>
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
    button : {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'poppins-semiBold',
    },
})

export default Demographics