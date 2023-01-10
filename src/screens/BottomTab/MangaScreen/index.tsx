import React, { useEffect } from 'react';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import Gap from '../../../components/atoms/Gap';
import { RecommendedList, Genres, Themes, Demographics, TopThree } from '../../../components';
import { RootBottomTabScreenProps } from '../../../navigation/type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectRecommendedMangaList } from '../../../redux/reducers/recommendedMangaListSlice';
import { selectMangaGenreList } from '../../../redux/reducers/mangaGenreListSlice';
import { selectMangaThemeList } from '../../../redux/reducers/mangaThemeListSlice';
import { selectMangaDemographicList } from '../../../redux/reducers/mangaDemographicListSlice';
import { selectTopThreeMangaList } from '../../../redux/reducers/topThreeMangaListSlice';
import { recommendedMangaListAsync } from '../../../redux/reducers/recommendedMangaListSlice';
import { mangaGenreListAsync } from '../../../redux/reducers/mangaGenreListSlice';
import { mangaThemeListAsync } from '../../../redux/reducers/mangaThemeListSlice';
import { mangaDemographicListAsync } from '../../../redux/reducers/mangaDemographicListSlice';
import { topThreeMangaListAsync } from '../../../redux/reducers/topThreeMangaListSlice';
import { useLightAppTheme } from '../../../themes';

function MangaScreen({ navigation }: RootBottomTabScreenProps<'Manga'>) {
    const lightTheme = useLightAppTheme();
    const recommendedList = useAppSelector(selectRecommendedMangaList);
    const genreList = useAppSelector(selectMangaGenreList);
    const themeList = useAppSelector(selectMangaThemeList);
    const demographicList = useAppSelector(selectMangaDemographicList);
    const topThreeList = useAppSelector(selectTopThreeMangaList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(recommendedMangaListAsync()), 500);
        setTimeout(() => dispatch(mangaGenreListAsync()), 1000);
        setTimeout(() => dispatch(mangaThemeListAsync()), 1500);
        setTimeout(() => dispatch(mangaDemographicListAsync()), 3000);
        setTimeout(() => dispatch(topThreeMangaListAsync()), 3500);
    }, [dispatch])

    function isLoading() {
        return recommendedList.status === 'loading' ||
            genreList.status === 'loading' ||
            themeList.status === 'loading' ||
            demographicList.status === 'loading' ||
            topThreeList.status === 'loading'
    }

    function wait() {
        setTimeout(() => dispatch(recommendedMangaListAsync()), 500);
        setTimeout(() => dispatch(mangaGenreListAsync()), 1000);
        setTimeout(() => dispatch(mangaThemeListAsync()), 1500);
        setTimeout(() => dispatch(mangaDemographicListAsync()), 3000);
        setTimeout(() => dispatch(topThreeMangaListAsync()), 3500);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl
                    progressViewOffset={StatusBar.currentHeight}
                    refreshing={isLoading()}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                <Text style={styles.recommended} >Recommended Manga</Text>
                <Gap height={15} />
                <RecommendedList type='manga' recommendedList={recommendedList.value} navigation={navigation} />
                <Gap height={50} />
                <Text style={styles.genres} >Genres</Text>
                <Gap height={12} />
                <Genres type='manga' genreList={genreList.value} navigation={navigation} />
                <Gap height={15} />
                <Text style={styles.themes} >Themes</Text>
                <Gap height={12} />
                <Themes type='manga' themeList={themeList.value} navigation={navigation} />
                <Gap height={15} />
                <Text style={styles.demographics} >Demographics</Text>
                <Gap height={12} />
                <Demographics type='manga' demographicList={demographicList.value} navigation={navigation} />
                <Gap height={50} />

                <View style={styles.row}>
                    <Text style={styles.top} >Top Manga</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('TopListScreen', { types: 'manga' })}>
                        <Text style={styles.more(lightTheme.textSolidPrimaryColor)}>more</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={15} />
                <TopThree types='manga' topThreeList={topThreeList.value} navigation={navigation} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create<any>({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    recommended: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: 'rgba(0, 102, 255, 1)',
        marginTop: 24,
        marginLeft: 24,
    },
    genres: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: 'rgba(0, 102, 255, 1)',
        marginLeft: 24,
    },
    themes: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: 'rgba(0, 102, 255, 1)',
        marginLeft: 24,
    },
    demographics: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: 'rgba(0, 102, 255, 1)',
        marginLeft: 24,
    },
    row: {
        marginHorizontal: 24,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    top: {
        fontSize: 14,
        fontFamily: 'poppins-medium',
        color: 'rgba(0, 102, 255, 1)',
    },
    more: (color: string) => ({
        fontSize: 12,
        fontFamily: 'poppins-regular',
        color: color,
    }),
});

export default MangaScreen;