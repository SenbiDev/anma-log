import React from 'react';
import { View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Gap from '../../../../components/atoms/Gap';
import { FavoriteList } from '../../../../components';
import { RootFavoritesTopTabScreenProps } from '../../../../navigation/type';
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks';
import { selectAnimeFavoriteList, animeFavoriteListAsync } from '../../../../redux/reducers/animeFavoriteListSlice';

function AnimeFavoritesListScreen({ navigation }: RootFavoritesTopTabScreenProps<'Anime'>) {
    const animeFavoriteList = useAppSelector(selectAnimeFavoriteList);
    let dispatch: any = useAppDispatch();
  
    useFocusEffect(() => {
      dispatch(animeFavoriteListAsync());
      
      return () => {
        dispatch = null;
      }
    });
  
    return (
      <View style={{ flex: 1 }}>
        <Gap height={30} />
        <FavoriteList type='anime' list={animeFavoriteList} label={'Anime Favorite List'} navigation={navigation} />
      </View>
    )
  }

export default AnimeFavoritesListScreen;