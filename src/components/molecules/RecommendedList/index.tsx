import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import ImageBackground from '../ImageBackground'
import Gap from '../../atoms/Gap'
import { RecommendedListType } from './type'

function RecommendedList({type, recommendedList, navigation}: RecommendedListType) {       
    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {recommendedList?.map(({ mal_id, title, images }, index) => (
                <TouchableOpacity key={index} style={styles.touchable} onPress={() => navigation.navigate(type === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })} >
                    <ImageBackground size='m' source={{ uri: images.webp.large_image_url }} >
                        <View style={styles.imageBackgroundContent}>
                            <Text style={styles.text}>
                                {title}
                            </Text>
                        </View>
                    </ImageBackground>
                    <Gap width={15} />
                </TouchableOpacity>
            ))}
            <Gap width={9} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginLeft: 24 
    },
    touchable: {
        flexDirection: 'row'
    },
    imageBackgroundContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 8,
        paddingBottom: 20
    },
    text: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'poppins-regular',
    },
})

export default RecommendedList