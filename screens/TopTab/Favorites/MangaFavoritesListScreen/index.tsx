import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getManga } from '../../../../utils/storage';
import Gap from '../../../../components/atoms/Gap';
import { SeasonalOrFavoriteOfList } from '../../../../components';

function MangaFavoritesListScreen({ navigation }: any) {
    const [mangaFavoriteList, setMangaFavoriteList] = useState<{ mal_id: number, images: any, title: string, genreList: string[], published: any, members: number, score: number }[]>([]);
    console.log('check inifinite loop')

    useFocusEffect(() => {
        let getMangaFavoriteList: any = async () => {
            try {
                const getMangaFavorites = await getManga();
                setMangaFavoriteList(getMangaFavorites)
            } catch {
                alert('Koneksi Jaringan Lambat')
            }
        }
        getMangaFavoriteList()

        return () => {
            getMangaFavoriteList = null;
        }
    });

    return (
        <View style={{ flex: 1 }}>
            <Gap height={30} />
            <SeasonalOrFavoriteOfList type='manga' list={mangaFavoriteList} label={'Manga Favorite List'} navigation={navigation} />
        </View>
    )
}

export default MangaFavoritesListScreen;