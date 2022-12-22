import React from 'react'
import { ScrollView, View, Text, TouchableOpacity }  from 'react-native';
import AnimeCard from './AnimeCard';
import Gap from '../../atoms/Gap/Gap';

function AnimeCardList({ seasonalList, seasonal, navigation }: { seasonalList: { mal_id: number, images: any, title: string, genreList: string[], aired: any, members: number, score: number, season?: string, year?: number }[], seasonal: string, navigation: any }) {
  // console.log('SADFASDFX:', JSON.stringify(seasonalList, null, 3))
  return (
    <View>
      <Text style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >{seasonal ?? 'Up Coming'}</Text>
      <Gap height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
          { seasonalList?.map(({ mal_id, images, title, genreList, aired, members, score }, index) => (
              <View key={index} >
                  <AnimeCard mal_id={mal_id} images={images} title={title} genres={genreList} aired={aired} members={members} score={score} navigation={navigation} />
                  <Gap height={15} />
              </View>
          ))}
          <Gap height={70} />
      </ScrollView>
    </View>
  )
}

export default AnimeCardList