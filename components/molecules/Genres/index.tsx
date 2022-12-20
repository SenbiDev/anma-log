import React, { useState, useEffect } from 'react'
import { View, Text as TextDefault, ScrollView } from 'react-native'
import { GradientBackground } from '../../atoms/Gradient'
import Gap from '../../atoms/Gap/Gap'


function Genres({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [genres, setGenres] = useState<{ name: string; mal_id: string; }[]>();

    useEffect(() => {
        async function fetchGenres() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=genres`);
                const parseResult = await result.json();
                const filterResult = parseResult?.data.filter((result: any) => result.name !== 'Boys Love' && result.name !== 'Girls Love');
                const genres = filterResult.map(({name, mal_id}: {name: string, mal_id: string}) => ({name, mal_id}));
                // console.log('Genres', JSON.stringify(genres, null, 4));
               
                setGenres(genres);
                
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(() => {
            fetchGenres()
        },1000)
    }, []);

    return (
        <ScrollView style={{ marginLeft: 24 }} horizontal showsHorizontalScrollIndicator={false}>
            {genres?.map(({name, mal_id}, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <GradientBackground key={index} paddingHorizontal={18} paddingVertical={7} onPress={() => navigation.navigate('AnimeListScreen', { type, mal_id })}>
                        <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }} >
                            {name}
                        </TextDefault>
                    </GradientBackground>
                    <Gap width={10} />
                </View>
            ))}
            <Gap width={14} />
        </ScrollView>
    )
}

export default Genres