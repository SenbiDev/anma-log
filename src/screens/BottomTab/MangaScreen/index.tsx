import React, { useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { GradientText } from '../../../components';
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

function MangaScreen({ navigation }: RootBottomTabScreenProps<'Manga'>) {
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

    return (
        <ScrollView>
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#61dafb" /> */}
                <GradientText style={styles.recommendedGradientText} >Recommended Manga</GradientText>
                <Gap height={15} />
                <RecommendedList type='manga' recommendedList={recommendedList} navigation={navigation} />
                <Gap height={50} />
                <GradientText style={styles.genresGradientText} >Genres</GradientText>
                <Gap height={12} />
                <Genres type='manga' genreList={genreList} navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.themesGradientText} >Themes</GradientText>
                <Gap height={12} />
                <Themes type='manga' themeList={themeList} navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.demographicsGradientText} >Demographics</GradientText>
                <Gap height={12} />
                <Demographics type='manga' demographicList={demographicList} navigation={navigation} />
                <Gap height={50} />

                <View style={styles.row}>
                    <GradientText style={styles.topGradientText} >Top Manga</GradientText>
                    <TouchableOpacity onPress={() => navigation.navigate('TopListScreen', { types: 'manga' })}>
                        <Text style={styles.moreSolidText}>more</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={15} />
                <TopThree types='manga' topThreeList={topThreeList} navigation={navigation} />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    recommendedGradientText: {
        fontSize: 14,
        marginTop: 24,
        marginLeft: 24,
        fontWeight: '600'
    },
    genresGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    themesGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    demographicsGradientText: {
        fontSize: 14,
        marginLeft: 24,
        fontWeight: '600'
    },
    row: {
        marginHorizontal: 24,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between'
    },
    topGradientText: {
        fontSize: 14,
        fontWeight: '600',
    },
    moreSolidText: {
        fontSize: 12,
    },
});

export default MangaScreen;