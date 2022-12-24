import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAnime } from '../../../../utils/storage';
import Gap from '../../../../components/atoms/Gap';
import { SeasonalOrFavoriteOfList } from '../../../../components';

function AnimeFavoritesListScreen({ navigation }: any) {
    const [animeFavoriteList, setAnimeFavoriteList] = useState<{ mal_id: number, images: any, title: string, genreList: string[], aired: any, members: number, score: number }[]>([]);
    console.log('check inifinite loop')
  
    useFocusEffect(() => {
      let getAnimeFavoriteList: any = async () => {
        try {
          const getAnimeFavorites = await getAnime();
          setAnimeFavoriteList(getAnimeFavorites)
        } catch {
          alert('Koneksi Jaringan Lambat')
        }
      }
      getAnimeFavoriteList()
  
      return () => {
        getAnimeFavoriteList = null;
      }
    });
  
    return (
      <View style={{ flex: 1 }}>
        <Gap height={30} />
        <SeasonalOrFavoriteOfList type='anime' list={animeFavoriteList} label={'Anime Favorite List'} navigation={navigation} />
      </View>
    )
  }

export default AnimeFavoritesListScreen;