import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';

function SearchResult({ type, letter }: { type: string, letter: string }) {
    const [searchlist, setSearchList] = useState<{ images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }[]>();
    console.log('check infinite loop on SEARCH LIST')

    useEffect(() => {
        async function fetchSearchList() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/${type}?letter=${letter}`);
                const parseResult = await result.json();
                const list = parseResult?.data?.map(({ images, title, type, episodes, volumes, aired, published, members, score }: { images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }) => ({ images, title, type, episodes, volumes, aired, published, members, score }));
                // console.log('Search List', JSON.stringify(list, null, 4));

                setSearchList(list);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        fetchSearchList();
    }, [type, letter])

    return (
        <ScrollView>
            {searchlist?.map(({ images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index}>
                    <TopAnime images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} />
                    <Gap height={15} />
                </View>
            ))}
        </ScrollView>
    )
}

export default SearchResult