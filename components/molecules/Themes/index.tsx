import React, { useState, useEffect } from 'react'
import { View, Text as TextDefault, ScrollView } from 'react-native'
import { GradientBackground } from '../../atoms/Gradient'
import Gap from '../../atoms/Gap/Gap'

function Themes({type, navigation}: {type: 'anime' | 'manga', navigation: any}) {
    const [themes, setThemes] = useState<[[{ name: string; mal_id: string; }, { name: string; mal_id: string; }]]>();
    // console.log('R:', (['hi', 'gojou'] !== [null, null]))
    useEffect(() => {
        async function fetchThemes() {
            try {
                
                const result = await fetch(`https://api.jikan.moe/v4/genres/${type}?filter=themes`);
                const parseResult = await result.json();
                const filterResult = parseResult?.data
                    .filter((result: any) =>
                        result.name !== 'Childcare' && result.name !== 'Combat sports' &&
                        result.name !== 'Crossdressing' && result.name !== 'Delinquents' &&
                        result.name !== 'Idols (Female)' && result.name !== 'Idols (Male)' &&
                        result.name !== 'Love Polygon' && result.name !== 'Magical Sex Shift' &&
                        result.name !== 'Mahou Shoujo' && result.name !== 'Performing Arts' &&
                        result.name !== 'Pets' && result.name !== 'Reverse Harem' && result.name !== 'Showbiz'
                    );
                let first = -2;
                let second = -1;
                /*
                    [0,1]
                    [2,3]
                    [4,5]
                    [6,7]
                */
                const mapResult = filterResult.map(({ name, mal_id }: { name: string, mal_id: string }) => ({ name, mal_id }));
                const themeList = mapResult.map(() => ([mapResult[first += 2], mapResult[second += 2]]));
                const deleteUndefined = themeList.filter((matrix: [{ name: string; mal_id: string; }, { name: string; mal_id: string; }]) => matrix[0] !== undefined && matrix[1] !== undefined);
    
                setThemes(() => deleteUndefined);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        fetchThemes()
    }, []);

    return (
        <ScrollView style={{ marginLeft: 24 }} horizontal showsHorizontalScrollIndicator={false}>
            {themes?.map((theme, index) => (
                <View key={index} style={{ flexDirection: 'row' }}>
                    <View>
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('AnimeListScreen', { type, mal_id: theme[0].mal_id })} >
                            <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                {theme[0].name}
                            </TextDefault>
                        </GradientBackground>
                        <Gap height={10} />
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('AnimeListScreen', { type, mal_id: theme[1].mal_id })} >
                            <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                {theme[1].name}
                            </TextDefault>
                        </GradientBackground>
                    </View>
                    <Gap width={10} />
                </View>
            ))}
            <Gap width={14} />
        </ScrollView>
    )
}

export default Themes