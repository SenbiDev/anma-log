import React from 'react'
import { ScrollView, View as ViewDefault }  from 'react-native';
import AnimeCard from './AnimeCard';
import Gap from '../../atoms/Gap/Gap';

function AnimeCardList() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        { Array.from(Array(10)).map((_, index) => (
            <ViewDefault key={index}>
                <AnimeCard />
                <Gap height={15} />
            </ViewDefault>
        ))}
    </ScrollView>
  )
}

export default AnimeCardList