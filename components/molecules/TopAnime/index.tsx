import React from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Gap from '../../atoms/Gap/Gap';
import { SolidMaterialIcons } from '../../atoms/Solid';
import { useLightAppTheme } from '../../../themes';


function TopAnime({ types, mal_id, images, title, type, episodes, volumes, aired, published, members, score, navigation }: { types: 'anime' | 'manga', mal_id: number, images: any, title: string, type: string, episodes?: number, volumes?: number, aired?: any, published?: any, members: number, score: number, navigation: any }) {
    const lightTheme = useLightAppTheme();
    const epsOrVols = episodes ? `(${episodes ?? 'Unknown'} eps)` : `(${volumes ?? 'Unknown'} vols)`;
    return (
        <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 118, marginLeft: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
        <TouchableOpacity style={{ borderRadius: 5, flexDirection: 'row' }} onPress={() => navigation.navigate( types === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <Image source={{ uri: images.webp.image_url }} style={{ width: 84, height: 118, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
          <View style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 5 }}>
            <Text style={{ width: 196, fontSize: 12, color: lightTheme.textSolidPrimaryColor }}>
              {title}
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {type ? `${type} ${epsOrVols}` : 'Unknown'}
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
            <Gap height={5} />
            <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor }}>
              {members ? `${members} members` : 'Unknown'}
            </Text>
            <Gap height={5} />

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <SolidMaterialIcons name='star' color='#FFC702' sizes={10} boxHeight={13} />
              <Gap width={2} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidSecondaryColor, height: 13 }}>
                {score ? score : 'Unknown'}
              </Text>
            </View>
          </View>

        </TouchableOpacity>
      </Card>
    )
}

export default TopAnime