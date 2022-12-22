import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import Gap from '../../atoms/Gap/Gap';
import ImageBackground from '../ImageBackground/ImageBackground';
import { SolidMaterialIcons } from '../../atoms/Solid';
import { useLightAppTheme } from '../../../themes';

function AnimeCard({ type, mal_id, images, title, genres, aired, published, members, score, navigation }: { type: 'anime' | 'manga', mal_id: number, images: any, title: string, genres: string[], aired?: any, published: any, members: number, score: number, navigation: any }) {
    const lightTheme = useLightAppTheme();
    return (
        <Card style={{ backgroundColor: lightTheme.cardColor, width: 312, height: 257, marginHorizontal: 24, borderRadius: 5, elevation: 7, shadowOffset: { width: 0, height: 2 }, shadowColor: 'black', shadowOpacity: 1 }}>
        <TouchableOpacity onPress={() => navigation.navigate(type === 'anime' ? 'AnimeDetailScreen' : 'MangaDetailScreen', { mal_id })}>
          <ImageBackground key={200} size='l' source={{ uri: images.webp.large_image_url }} >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 10, paddingBottom: 10 }}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <SolidMaterialIcons name='account-circle' color='white' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  {members} members
                </Text>
              </View>
              <Gap width={8} />
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <SolidMaterialIcons name='star' color='#FFC702' sizes={20} boxHeight={24} />
                <Gap width={6} />
                <Text style={{ color: 'white', fontSize: 12, height: 20 }}>
                  {score ?? 'Unknown'}
                </Text>
              </View>
            </View>
          </ImageBackground>
          <Gap height={15} />
          <Card.Content style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 15 }}>
            <View>
              <Text style={{ width: 178, fontSize: 12, color: lightTheme.textSolidPrimaryColor }} numberOfLines={2}>
                {title}
              </Text>
              <Gap height={5} />
              <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
                {genres.join(', ')}
              </Text>
            </View>

            <Text style={{ fontSize: 8, color: lightTheme.textSolidPrimaryColor }}>
              {
                aired
                  ? aired.string
                  : published
                    ? published.string
                    : 'Unknown'
              }
            </Text>
          </Card.Content>
        </TouchableOpacity>
      </Card>
    )
}

export default AnimeCard