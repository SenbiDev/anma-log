import React from 'react'
import { Image, View as ViewDefault, Text as TextDefault } from 'react-native';
import { View, Text } from '../../Themed'
import Gap from '../../atoms/Gap/Gap';
import { SolidMaterialIcons } from '../../atoms/Solid';


function TopAnime({ images, title, type, episodes, volumes, aired, published, members, score }: { images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number }) {
    const epsOrVols = episodes ? `(${episodes ?? 'Unknown'} eps)` : `(${volumes ?? 'Unknown'} vols)`;
    return (
        <View style={{ width: 312, height: 118, marginLeft: 24, borderRadius: 5, elevation: 4, shadowOffset: { width: 0, height: 0 }, shadowColor: 'rgba(0, 0, 0, 0.25)', shadowOpacity: 1 }}>
            <View style={{ borderRadius: 5, flexDirection: 'row' }}>
                <Image source={{ uri: images.webp.image_url }} style={{ width: 84, height: 118, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
                <View style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 5 }}>
                    <Text style={{ width: 196, fontSize: 12 }}>
                        {title}
                    </Text>
                    <Gap height={5} />
                    <Text style={{ fontSize: 8, color: '#444444' }}>
                        {type ? `${type} ${epsOrVols}` : 'Unknown'}
                    </Text>
                    <Gap height={5} />
                    <Text style={{ fontSize: 8, color: '#444444' }}>
                        {
                            aired
                                ? aired.string
                                : published
                                    ? published.string
                                    : 'Unknown'
                        }
                    </Text>
                    <Gap height={5} />
                    <Text style={{ fontSize: 8, color: '#444444' }}>
                        {members ? `${members} members` : 'Unknown'}
                    </Text>
                    <Gap height={5} />

                    <ViewDefault style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <SolidMaterialIcons name='star' color='#FFC702' sizes={10} boxHeight={13} />
                        <Gap width={2} />
                        <TextDefault style={{ fontSize: 8, color: '#444444', height: 13 }}>
                            {score ? score : 'Unknown'}
                        </TextDefault>
                    </ViewDefault>
                </View>

            </View>
        </View>
    )
}

export default TopAnime