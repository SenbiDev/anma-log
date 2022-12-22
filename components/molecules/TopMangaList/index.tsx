import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';

function TopMangaList({navigation}: any) {
    const [topManga, setTopManga] = useState<{  mal_id: number, images: any, title: string, type: string, volumes: number, published: any, members: number, score: number }[]>();

    useEffect(() => {
        async function fetchTopManga() {
            try {
                const result = await fetch('https://api.jikan.moe/v4/top/manga?type=manga');
                const parseResult = await result.json();
                const topMangaList = parseResult?.data?.map(({  mal_id, images, title, type, volumes, published, members, score }: {  mal_id: number, images: any, title: string, type: string, volumes: number, published: any, members: number, score: number }) => ({  mal_id, images, title, type, volumes, published, members, score }));
                // console.log('Top Manga List', JSON.stringify(topMangaList, null, 4));
                setTopManga(topMangaList);
            } catch {
                alert('Koneksi Jaringan Lambat');
            }
        }

        fetchTopManga();
    }, [])

    return (
        <>
            {topManga?.map(({  mal_id, images, title, type, volumes, published, members, score }, index) => (
                <View key={index}>
                    <TopAnime types='manga' mal_id={mal_id} images={images} title={title} type={type} volumes={volumes} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopMangaList