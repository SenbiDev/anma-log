import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';

function TopThreeManga() {
    const [topManga, setTopManga] = useState<{ images: any, title: string, type: string, volumes: number, published: any, members: number, score: number }[]>();

    useEffect(() => {
        async function fetchTopManga() {
            try {
                setTimeout(async () => {
                    const result = await fetch('https://api.jikan.moe/v4/top/manga?type=manga');
                    const parseResult = await result.json();
                    const topMangaList = parseResult?.data?.map(({ images, title, type, volumes, published, members, score }: { images: any, title: string, type: string, volumes: number, published: any, members: number, score: number }) => ({ images, title, type, volumes, published, members, score }));
                    // console.log('Top Manga List', JSON.stringify(topMangaList, null, 4));

                    const topThreeManga = [topMangaList[0], topMangaList[1], topMangaList[2]]
                    setTopManga(topThreeManga);

                }, 2500)

            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        fetchTopManga();
    }, [])

    return (
        <>
            {topManga?.map(({ images, title, type, volumes, published, members, score }, index) => (
                <View  key={index}>
                    <TopAnime images={images} title={title} type={type} volumes={volumes} published={published} members={members} score={score} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopThreeManga