import React, { useEffect } from 'react'
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native';
import Item from '../Item';
import Gap from '../../atoms/Gap';
import { SearchResultType } from './type';
import { useLightAppTheme } from '../../../themes';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectSearchResult, searchResultListAsync } from '../../../redux/reducers/searchResultSlice';

function SearchResult({ types, letter, navigation }: SearchResultType) {
    const lightTheme = useLightAppTheme();
    const searchlist = useAppSelector(selectSearchResult)
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(searchResultListAsync({ types, letter })), 500)
    }, [dispatch, types, letter])

    function isLoading() {
        return searchlist.status === 'loading'
    }

    function wait() {
        setTimeout(() => dispatch(searchResultListAsync({ types, letter })), 500);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    return (
        <ScrollView
            style={styles.scroll}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    progressViewOffset={-64}
                    refreshing={isLoading()}
                    onRefresh={onRefresh}
                />
            }
        >
            {searchlist.value?.map(({ mal_id, images, title, type, episodes, volumes, aired, published, members, score }, index) => (
                <View key={index} >
                    <Item types={(types as 'anime' | 'manga')} mal_id={mal_id} images={images} title={title} type={type} episodes={episodes} volumes={volumes} aired={aired} published={published} members={members} score={score} navigation={navigation} />
                    <Gap height={15} />
                </View>
            ))}
            {searchlist.value?.length === 0 &&
                <View style={styles.textContainer}>
                    <Text style={styles.text(lightTheme.textSolidPrimaryColor)} >Not Found</Text>
                </View>
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create<any>({
    scroll: {
        marginHorizontal: 24,
    },
    textContainer: {
        alignItems: 'center',
    },
    text: (color: string) => ({
        fontFamily: 'poppins-regular',
        fontSize: 14,
        color: color,
    })
})

export default SearchResult