import React from 'react'
import { View as ViewDefault, Text as TextDefault } from 'react-native';
import { View, Text } from '../../Themed';
import Gap from '../../atoms/Gap/Gap';
import ImageBackground from '../ImageBackground/ImageBackground';
import { SolidMaterialIcons } from '../../atoms/Solid';

function AnimeCard({ images, title, genres, aired, members, score }: { images: any, title: string, genres: [], aired: any, members: number, score: number }) {
    return (
        <View style={{ width: 312, height: 257, marginHorizontal: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
            <ImageBackground key={200} size='l' source={{ uri: images.webp.large_image_url }} >
                <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>
                    <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                        <Gap width={6} />
                        <TextDefault style={{ color: 'white', fontSize: 12, height: 20 }}>
                            {members} members
                        </TextDefault>
                    </ViewDefault>
                    <Gap width={8} />
                    <ViewDefault style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                        <Gap width={6} />
                        <TextDefault style={{ color: 'white', fontSize: 12, height: 20 }}>
                            {score ?? 'Unknown'}
                        </TextDefault>
                    </ViewDefault>
                </ViewDefault>
            </ImageBackground>

            <Gap height={15} />

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 15 }}>
                <View>
                    <Text style={{ width: 178, fontSize: 12 }} numberOfLines={2}>
                        {title}
                    </Text>
                    <Gap height={5} />
                    <Text style={{ fontSize: 8 }}>
                        {genres.join(', ')}
                    </Text>
                </View>

                <Text style={{ fontSize: 8 }}>
                    {aired.string}
                </Text>
            </View>

        </View>
    )
}

export default AnimeCard