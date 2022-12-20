import React from 'react'
import { ScrollView, View, Text }  from 'react-native';
import AnimeCard from './AnimeCard';
import Gap from '../../atoms/Gap/Gap';

function AnimeCardList({ seasonalList, seasonal }: { seasonalList: { images: any, title: string, genreList: [], aired: any, members: number, score: number, season: string, year: number }[], seasonal: string }) {
  return (
    <View>
      <Text style={{ fontSize: 14, marginLeft: 24, fontWeight: '600' }} >{seasonal ?? 'Up Coming'}</Text>
      <Gap height={20} />
      <ScrollView showsVerticalScrollIndicator={false}>
          { seasonalList?.map(({ images, title, genreList, aired, members, score }, index) => (
              <View key={index}>
                  <AnimeCard images={images} title={title} genres={genreList} aired={aired} members={members} score={score} />
                  <Gap height={15} />
              </View>
          ))}
          <Gap height={70} />
      </ScrollView>
    </View>
  )
}

export default AnimeCardList