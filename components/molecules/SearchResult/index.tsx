import React, { useState, useEffect } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native';
import TopAnime from '../TopAnime';
import Gap from '../../atoms/Gap/Gap';

function SearchResult({ types, letter, navigation }: { types: string, letter: string, navigation: any }) {
    const [searchlist, setSearchList] = useState<{ mal_id: number, images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }[]>();
    
    useEffect(() => {
        async function fetchSearchList() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/${types}?letter=${letter}`);
                const parseResult = await result.json();
                const list = parseResult?.data?.map(({  mal_id, images, title, type, episodes, volumes, aired, published, members, score }: {  mal_id: number, images: any, title: string, type: string, episodes: number, volumes: number, aired: any, published: any, members: number, score: number }) => ({  mal_id, images, title, type, episodes, volumes, aired, published, members, score }));
                // console.log('Search List', JSON.stringify(list[0].mal_id, null, 4));

                setSearchList(list);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        fetchSearchList();
    }, [types, letter])


    return (
        <ScrollView>
            {searchlist?.map(({  mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <TouchableOpacity key={index} onPress={() => navigation.navigate( types === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
                    <TopAnime images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} />
                    <Gap height={15} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default SearchResult