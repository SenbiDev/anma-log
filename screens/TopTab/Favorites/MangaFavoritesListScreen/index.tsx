import React, { useState } from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getManga } from '../../../../utils/storage';
import Gap from '../../../../components/atoms/Gap';
import { SeasonalOrFavoriteOfList } from '../../../../components';
import { RootFavoritesTopTabScreenProps } from '../../../../types';
import { MangaFavoritesListScreenStateType } from './type';

function MangaFavoritesListScreen({ navigation }: RootFavoritesTopTabScreenProps<'Manga'>) {
    const [mangaFavoriteList, setMangaFavoriteList] = useState<MangaFavoritesListScreenStateType[]>([]);
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