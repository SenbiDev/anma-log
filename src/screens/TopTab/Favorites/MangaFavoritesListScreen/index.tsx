import React from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Gap from '../../../../components/atoms/Gap';
import { SeasonalOrFavoriteOfList } from '../../../../components';
import { RootFavoritesTopTabScreenProps } from '../../../../navigation/type';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { selectMangaFavoriteList, mangaFavoriteListAsync } from '../../../../redux/reducers/mangaFavoriteListSlice';

function MangaFavoritesListScreen({ navigation }: RootFavoritesTopTabScreenProps<'Manga'>) {
    const mangaFavoriteList = useAppSelector(selectMangaFavoriteList);
    let dispatch: any = useAppDispatch();
    console.log('check inifinite loop')

    useFocusEffect(() => {
        dispatch(mangaFavoriteListAsync());

        return () => {
            dispatch = null;
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