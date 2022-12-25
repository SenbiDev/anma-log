import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import ImageBackground from '../ImageBackground'
import Gap from '../../atoms/Gap'
import { RecommendedListType, RecommendedListStateType } from './type'

function RecommendedList({type, navigation}: RecommendedListType) {
    const [recommendedAnimeList, setRecommendedAnimeList] = useState<RecommendedListStateType[]>([]);

    useEffect(() => {
        async function fetchRecommendedAnimeList() {
            const result = await fetch(`https://api.jikan.moe/v4/recommendations/${type}`);
            const parseResult = await result.json();
            const obj = [...parseResult.data.map((data: any) => data)]
            const entry = [...obj.map(({entry}: any) => entry)]
            const matriks1 = entry.map((matrik: any) => matrik[0])
            const matriks2 = entry.map((matrik: any) => matrik[1])

            // =2=
            const titleAndImageList = [...matriks1.map(({ mal_id, title, images }: any) => ({mal_id, title, images})), ...matriks2.map(({ mal_id, title, images }: any) => ({ mal_id, title, images }))]
            // console.log('Title and Image List:', JSON.stringify(titleAndImageList, null, 4))
            // console.log('Title and Image List Total:', titleAndImageList.length)
            const top10RecommendedAnimeList = []
            for (let i = 0; i < 10; i++) {
                top10RecommendedAnimeList.push(titleAndImageList[i])
            }
            setRecommendedAnimeList(top10RecommendedAnimeList.reverse());
        }
        
        setTimeout(() => {
            fetchRecommendedAnimeList()
        },500);
    }, []);

    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {recommendedAnimeList?.map(({ mal_id, title, images }, index) => (
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