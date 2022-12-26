import React, { useEffect } from 'react'
import { View, ScrollView } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { SearchResultType } from './type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectSearchResult, searchResultListAsync } from '../../../redux/reducers/searchResultSlice';

function SearchResult({ types, letter, navigation }: SearchResultType) {
    const searchlist = useAppSelector(selectSearchResult)
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        setTimeout(() => dispatch(searchResultListAsync({ types, letter })), 500)
    }, [dispatch, types, letter])


    return (
        <ScrollView>
            {searchlist?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index} >
                    <Item types={(types as 'anime' | 'manga')} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
        </ScrollView>
    )
}

export default SearchResult