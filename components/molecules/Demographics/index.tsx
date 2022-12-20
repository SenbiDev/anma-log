import React, { useState, useEffect } from 'react'
import { View, Text as TextDefault, ScrollView } from 'react-native'
import { GradientBackground } from '../../atoms/Gradient'
import Gap from '../../atoms/Gap/Gap'


function Demographics({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [demographics, setDemographics] = useState<{ name: string; mal_id: string; }[]>();

    useEffect(() => {
        async function fetchDemographics() {
            try {
                const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=demographics`);
                const parseResult = await result.json();
                const demographicList = parseResult?.data.map(({name, mal_id}: {name: string, mal_id: string}) => ({name, mal_id}));
                // console.log('Demographics', JSON.stringify(demographics, null, 4));
               
                setDemographics(demographicList);
                
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(() => {
            fetchDemographics()
        },2000)
    }, []);

    return (
        <ScrollView style={{ marginLeft: 24 }} horizontal showsHorizontalScrollIndicator={false}>
            {demographics?.map(({name, mal_id}, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <GradientBackground paddingHorizontal={18} paddingVertical={7} onPress={() => navigation.navigate('AnimeListScreen', { type, mal_id })}>
                        <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
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

export default Demographics