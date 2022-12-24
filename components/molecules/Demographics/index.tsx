import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { GradientBackground, Gap } from '../../atoms';


function Demographics({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [demographicList, setDemographicList] = useState<{ name: string; mal_id: string; }[]>();

    useEffect(() => {
        async function fetchDemographics() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=demographics`);
                const parseResult = await result.json();
                const list = parseResult?.data.map(({name, mal_id}: {name: string, mal_id: string}) => ({name, mal_id}));
                // console.log('Demographics', JSON.stringify(demographics, null, 4));
               
                setDemographicList(list);
                
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(() => {
            fetchDemographics()
        },2000)
    }, []);

    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {demographicList?.map(({name, mal_id}, index) => (
                <View key={index} style={styles.button}>
                    <GradientBackground paddingHorizontal={18} paddingVertical={7} onPress={() => navigation.navigate('ListScreen', { type, mal_id })}>
                        <Text style={styles.text}>
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

export default Demographics