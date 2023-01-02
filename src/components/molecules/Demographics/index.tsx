import React from 'react'
import { View, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native'
import { Gap } from '../../atoms';
import { DemographicsType } from './type';

function Demographics({type, demographicList, navigation}: DemographicsType) {
    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {demographicList?.map(({name, mal_id}, index) => (
                <View key={index} style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListScreen', { type, mal_id })}>
                        <Text style={styles.text}>
                            {name}
                        </Text>
                    </TouchableOpacity>
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
    row : {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontFamily: 'poppins-semiBold',
    },
    button : {
        alignSelf: 'flex-start',
        borderRadius: 3,
        paddingHorizontal: 18,
        paddingVertical: 7,
        backgroundColor: 'rgba(0, 102, 255, 1)',
    },
})

export default Demographics