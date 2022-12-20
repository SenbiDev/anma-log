import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';

function TopThreeAnime() {
    const [topAnime, setTopAnime] = useState<{ images: any, title: string, type: string, episodes: number, aired: any, members: number, score: number }[]>();

    useEffect(() => {
        async function fetchTopAnime() {
            try {
                const result = await fetch('https://api.jikan.moe/v4/top/anime?type=tv');
                const parseResult = await result.json();
                const topAnimeList = parseResult?.data?.map(({ images, title, type, episodes, aired, members, score }: { images: any, title: string, type: string, episodes: number, aired: any, members: number, score: number }) => ({ images, title, type, episodes, aired, members, score }));
                // console.log('Top Anime List', JSON.stringify(topAnimeList, null, 4));

                const topThreeAnime = [topAnimeList[0], topAnimeList[1], topAnimeList[2]]
                setTopAnime(topThreeAnime);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(async () => {
            fetchTopAnime();
        }, 3500)
    }, [])

    return (
        <>
            {topAnime?.map(({ images, title, type, episodes, aired, members, score }, index) => (
                <View key={index}>
                    <TopAnime images={images} title={title} type={type} episodes={episodes} aired={aired} members={members} score={score} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopThreeAnime