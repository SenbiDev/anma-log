import React, { useEffect } from 'react';
import { ScrollView, RefreshControl, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { GradientText } from '../../../components';
import Gap from '../../../components/atoms/Gap';
import { RecommendedList, Genres, Themes, Demographics, TopThree } from '../../../components';
import { RootBottomTabScreenProps } from '../../../navigation/type';
import { useAppSelector, useAppDispatch } from '../../../redux/hooks';
import { selectRecommendedList } from '../../../redux/reducers/recommendedAnimeListSlice';
import { selectAnimeGenreList } from '../../../redux/reducers/animeGenreListSlice';
import { selectAnimeThemeList } from '../../../redux/reducers/animeThemeListSlice';
import { selectAnimeDemographicList } from '../../../redux/reducers/animeDemographicListSlice';
import { selectTopThreeAnimeList } from '../../../redux/reducers/topThreeAnimeListSlice';
import { recommendedAnimeListAsync } from '../../../redux/reducers/recommendedAnimeListSlice';
import { animeGenreListAsync } from '../../../redux/reducers/animeGenreListSlice';
import { animeThemeListAsync } from '../../../redux/reducers/animeThemeListSlice';
import { animeDemographicListAsync } from '../../../redux/reducers/animeDemographicListSlice';
import { topThreeAnimeListAsync } from '../../../redux/reducers/topThreeAnimeListSlice';

function AnimeScreen({ navigation }: RootBottomTabScreenProps<'Anime'>) {
    const recommendedList = useAppSelector(selectRecommendedList);
    const genreList = useAppSelector(selectAnimeGenreList);
    const themeList = useAppSelector(selectAnimeThemeList);
    const demographicList = useAppSelector(selectAnimeDemographicList);
    const topThreeList = useAppSelector(selectTopThreeAnimeList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(recommendedAnimeListAsync()), 500);
        setTimeout(() => dispatch(animeGenreListAsync()), 1000);
        setTimeout(() => dispatch(animeThemeListAsync()), 1500);
        setTimeout(() => dispatch(animeDemographicListAsync()), 3000);
        setTimeout(() => dispatch(topThreeAnimeListAsync()), 3500);
    }, [dispatch])

    function isLoading() {
        return recommendedList.status === 'loading' ||
            genreList.status === 'loading' ||
            themeList.status === 'loading' ||
            demographicList.status === 'loading' ||
            topThreeList.status === 'loading'
    }

    function wait() {
        setTimeout(() => dispatch(recommendedAnimeListAsync()), 500);
        setTimeout(() => dispatch(animeGenreListAsync()), 1000);
        setTimeout(() => dispatch(animeThemeListAsync()), 1500);
        setTimeout(() => dispatch(animeDemographicListAsync()), 3000);
        setTimeout(() => dispatch(topThreeAnimeListAsync()), 3500);
    }

    const onRefresh = React.useCallback(() => {
        wait();
    }, []);

    console.log('Anime IS LOADING:', isLoading());

    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    progressViewOffset={24}
                    refreshing={isLoading()}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.container}>
                {/* <StatusBar backgroundColor="#61dafb" /> */}
                <GradientText style={styles.recommendedGradientText} >Recommended Anime</GradientText>
                <Gap height={15} />
                <RecommendedList type='anime' recommendedList={recommendedList.value} navigation={navigation} />
                <Gap height={50} />
                <GradientText style={styles.genresGradientText} >Genres</GradientText>
                <Gap height={12} />
                <Genres type='anime' genreList={genreList.value} navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.themesGradientText} >Themes</GradientText>
                <Gap height={12} />
                <Themes type='anime' themeList={themeList.value} navigation={navigation} />
                <Gap height={15} />
                <GradientText style={styles.demographicsGradientText} >Demographics</GradientText>
                <Gap height={12} />
                <Demographics type='anime' demographicList={demographicList.value} navigation={navigation} />
                <Gap height={50} />

                <View style={styles.row}>
                    <GradientText style={styles.topGradientText} >Top Anime</GradientText>
                    <TouchableOpacity onPress={() => navigation.navigate('TopListScreen', { types: 'anime' })}>
                        <Text style={styles.moreSolidText}>more</Text>
                    </TouchableOpacity>
                </View>
                <Gap height={15} />
                <TopThree types='anime' topThreeList={topThreeList.value} navigation={navigation} />
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

    },
    genresGradientText: {
        fontSize: 14,
        marginLeft: 24,
    },
    themesGradientText: {
        fontSize: 14,
        marginLeft: 24,
    },
    demographicsGradientText: {
        fontSize: 14,
        marginLeft: 24,
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

    },
    moreSolidText: {
        fontSize: 12,
        fontFamily: 'poppins-regular',
    },
});

export default AnimeScreen;