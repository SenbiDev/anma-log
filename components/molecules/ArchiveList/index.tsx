import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { GradientBackground, Gap } from '../../atoms';

function ArchiveList({navigation}: any) {
    const [archives, setArchives] = useState<{ year: number, seasons:  | ["winter"] | ["winter", "spring"] | ["winter", "spring", "summer"] | ["winter", "spring", "summer", "fall"] }[]>([]);

    useEffect(() => {
        async function fetchArchives() {
            try {

                const result = await fetch('https://api.jikan.moe/v4/seasons');
                const parseResult = await result.json();
                const filterResult = parseResult.data.filter(({ year }: { year: number }) => year >= 1999);

                // console.log(JSON.stringify(parseResult.data, null, 3));
                setArchives(() => filterResult);
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }

        // setTimeout(() => {
            fetchArchives()
        // }, 1500)
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {archives?.map(({ year, seasons }, index) => (
                <View key={index} style={styles.container}>
                    <View style={styles.butonsRow}>
                        {seasons[0] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[0] })}>
                            <View style={styles.column}>
                                <Text style={styles.text}>
                                    {year}
                                </Text>
                                <Text style={styles.text}>
                                    {seasons[0]}
                                </Text>
                            </View>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[1] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[1] })}>
                            <View style={styles.column}>
                                <Text style={styles.text}>
                                    {year}
                                </Text>
                                <Text style={styles.text}>
                                    {seasons[1]}
                                </Text>
                            </View>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[2] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[2] })}>
                            <View style={styles.column}>
                                <Text style={styles.text}>
                                    {year}
                                </Text>
                                <Text style={styles.text}>
                                    {seasons[2]}
                                </Text>
                            </View>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[3] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[3] })}>
                            <View style={styles.column}>
                                <Text style={styles.text}>
                                    {year}
                                </Text>
                                <Text style={styles.text}>
                                    {seasons[3]}
                                </Text>
                            </View>
                        </GradientBackground>
                        }
                    </View>
                    <Gap height={15} />
                </View>
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 24,
    },
    butonsRow: {
        flexDirection: 'row',
    },
    column: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '600'
    }
})

export default ArchiveList