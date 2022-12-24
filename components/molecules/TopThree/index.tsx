import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';

function TopThree({ types, navigation }: { types: 'anime' | 'manga', navigation: any }) {
    const [topThreeList, setTopThreeList] = useState<{ mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }[]>();

    useEffect(() => {
        async function fetchTopThree() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/top/${types}?type=tv`);
                const parseResult = await result.json();
                const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));
                // console.log('Top Anime List', JSON.stringify(list, null, 4));

                const topThree = [list[0], list[1], list[2]]
                setTopThreeList(topThree);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(async () => {
            fetchTopThree();
        }, 3500)
    }, [])
    
    return (
        <>
            {topThreeList?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <Item types={types} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopThree