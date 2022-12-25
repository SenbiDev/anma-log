import React, { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { SearchResultType, SearchResultStateType } from './type';

function SearchResult({ types, letter, navigation }: SearchResultType) {
    const [searchlist, setSearchList] = useState<SearchResultStateType[]>([]);
    
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
        setTimeout(() => fetchSearchList(), 500)
        
    }, [types, letter])


    return (
        <ScrollView>
            {searchlist?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index} >
                    <Item types={(types as 'anime' | 'manga')} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </ScrollView>
    )
}

export default SearchResult