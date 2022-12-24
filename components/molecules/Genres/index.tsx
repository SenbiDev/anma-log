import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { GradientBackground, Gap } from '../../atoms';


function Genres({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [genreList, setGenreList] = useState<{ name: string; mal_id: string; }[]>();

    useEffect(() => {
        async function fetchGenres() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=genres`);
                const parseResult = await result.json();
                const filterResult = parseResult?.data.filter((result: any) => result.name !== 'Boys Love' && result.name !== 'Girls Love');
                const list = filterResult.map(({name, mal_id}: {name: string, mal_id: string}) => ({name, mal_id}));
                // console.log('Genres', JSON.stringify(genres, null, 4));
               
                setGenreList(list);
                
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(() => {
            fetchGenres()
        },1000)
    }, []);

    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {genreList?.map(({name, mal_id}, index) => (
                <View key={index} style={styles.button}>
                    <GradientBackground key={index} paddingHorizontal={18} paddingVertical={7} onPress={() => navigation.navigate('ListScreen', { type, mal_id })}>
                        <Text style={styles.text} >
                            {name}
                        </Text>
                    </GradientBackground>
                    <Gap width={10} />
                </View>
            ))}
            <Gap width={14} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        marginLeft: 24,
    },
    button : {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
})

export default Genres