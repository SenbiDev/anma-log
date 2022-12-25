import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import { GradientBackground, Gap } from '../../atoms';
import { ThemesType, ThemesStateType } from './type';

function Themes({type, navigation}: ThemesType) {
    const [themeList, setThemeList] = useState<ThemesStateType>();

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
       
                const mapResult = filterResult.map(({ name, mal_id }: { name: string, mal_id: number }) => ({ name, mal_id }));
                const list = mapResult.map(() => ([mapResult[first += 2], mapResult[second += 2]]));
                const listWithoutUndefined = list.filter((matrix: [{ name: string; mal_id: number; }, { name: string; mal_id: number; }]) => matrix[0] !== undefined && matrix[1] !== undefined);
    
                setThemeList(() => listWithoutUndefined);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        setTimeout(() => {
            fetchThemes()
        },1500)
    }, []);

    return (
        <ScrollView style={styles.scroll} horizontal showsHorizontalScrollIndicator={false}>
            {themeList?.map((theme, index) => (
                <View key={index} style={styles.buttonsColumn}>
                    <View>
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[0].mal_id })} >
                            <Text style={styles.text}>
                                {theme[0].name}
                            </Text>
                        </GradientBackground>
                        <Gap height={10} />
                        <GradientBackground paddingHorizontal={18} paddingVertical={7} width='100%' alignItems='center' onPress={() => navigation.navigate('ListScreen', { type, mal_id: theme[1].mal_id })} >
                            <Text style={styles.text}>
                                {theme[1].name}
                            </Text>
                        </GradientBackground>
                    </View>
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
    buttonsColumn : {
        flexDirection: 'row',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600',
    },
})

export default Themes