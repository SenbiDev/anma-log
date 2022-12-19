import React from 'react'
import { View as ViewDefault, Text as TextDefault, ScrollView } from 'react-native';
import { GradientBackground } from '../../atoms/Gradient';
import Gap from '../../atoms/Gap/Gap';

function ArchiveList() {
    // const year = data[0].year
    // const winter = data[0].seasons[0]
    // const spring = data[0].seasons[1]
    // const summer = data[0].seasons[2]
    // const fall = data[0].seasons[3]
    // const year = data[1].year
    // const winter = data[1].seasons[0]
    // const spring = data[1].seasons[1]
    // const summer = data[1].seasons[2]
    // const fall = data[1].seasons[3]
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {Array.from(Array(20)).map((_, index) => (
                <ViewDefault key={index} style={{ marginHorizontal: 24 }}>
                    <ViewDefault style={{ flexDirection: 'row' }}>
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    2022
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    Winter
                                    {/* seasons[0] */}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        <Gap width={12} />
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    2022
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    Spring
                                    {/* seasons[1] */}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        <Gap width={12} />
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    2022
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    Summer
                                    {/* seasons[2] */}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                        <Gap width={12} />
                        <GradientBackground paddingHorizontal={15} paddingVertical={5} width={69} height={40}>
                            <ViewDefault style={{ alignItems: 'center' }}>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    2022
                                    {/* data[0].year atau year */}
                                </TextDefault>
                                <TextDefault style={{ color: 'white', fontSize: 10, fontWeight: '600' }}>
                                    Fall
                                    {/* seasons[3] */}
                                </TextDefault>
                            </ViewDefault>
                        </GradientBackground>
                    </ViewDefault>
                    <Gap height={15} />
                </ViewDefault>
            ))}
        </ScrollView>
    )
}

export default ArchiveList