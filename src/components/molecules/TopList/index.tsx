import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { TopListType, TopListStateType } from './type';

function TopList({ types, navigation }: TopListType) {
    const [topList, setTopList] = useState<TopListStateType[]>();

    useEffect(() => {
        async function fetchTopList() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/top/${types}?type=tv`);
                const parseResult = await result.json();
                const list = parseResult?.data?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }: { mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }) => ({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }));
                // console.log('Top Anime List', JSON.stringify(list, null, 4));

                setTopList(list);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(async () => {
            fetchTopList();
        }, 3500)
    }, [])
    
    return (
        <>
            {topList?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <Item types={types} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </>
    )
}

export default TopList