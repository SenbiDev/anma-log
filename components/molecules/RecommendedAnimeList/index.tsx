import React, { useState, useEffect } from 'react'
import { View as ViewDefault, Text as TextDefault, ScrollView, TouchableOpacity } from 'react-native'
import ImageBackground from '../ImageBackground/ImageBackground'
import Gap from '../../atoms/Gap/Gap'

function RecommendedAnimeList({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [recommendedAnimeList, setRecommendedAnimeList] = useState<{ mal_id: number, title: string; images: any; }[]>();

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
        <ScrollView style={{ marginLeft: 24 }} horizontal showsHorizontalScrollIndicator={false}>
            {recommendedAnimeList?.map(({ mal_id, title, images }, index) => (
                <TouchableOpacity key={index} style={{ flexDirection: 'row' }} onPress={() => navigation.navigate(type === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })} >
                    <ImageBackground size='m' source={{ uri: images.webp.large_image_url }} >
                        <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 8, paddingBottom: 20 }}>
                            <TextDefault style={{ color: 'white', fontSize: 12 }}>
                                {title}
                            </TextDefault>
                        </ViewDefault>
                    </ImageBackground>
                    <Gap width={15} />
                </TouchableOpacity>
            ))}
            <Gap width={9} />
        </ScrollView>
    )
}

export default RecommendedAnimeList