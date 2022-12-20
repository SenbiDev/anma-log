import React, { useState, useEffect } from 'react'
import { View as ViewDefault, Text as TextDefault, ScrollView } from 'react-native';
import { GradientBackground } from '../../atoms/Gradient';
import Gap from '../../atoms/Gap/Gap';

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
                <ViewDefault key={index} style={{ marginHorizontal: 24 }}>
                    <ViewDefault style={{ flexDirection: 'row' }}>
                        {seasons[0] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[0] })}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {year}
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {/* Winter */}
                                    {seasons[0]}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[1] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[1] })}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {year}
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {/* Spring */}
                                    {seasons[1]}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[2] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[2] })}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {year}
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {/* Summer */}
                                    {seasons[2]}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        }
                        <Gap width={12} />
                        {seasons[3] &&
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40} onPress={() => navigation.navigate('SeasonalListScreen', { year, season: seasons[3] })}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {year}
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    {/* Fall */}
                                    {seasons[3]}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        }
                    </ViewDefault>
                    <Gap height={15} />
                </ViewDefault>
            ))}
        </ScrollView>
    )
}

export default ArchiveList