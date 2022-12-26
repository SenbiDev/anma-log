import { configureStore } from '@reduxjs/toolkit';
import recommendedAnimeListReducer from '../reducers/recommendedAnimeListSlice';
import recommendedMangaListReducer from '../reducers/recommendedMangaListSlice';
import animeGenreListReducer from '../reducers/animeGenreListSlice';
import mangaGenreListReducer from '../reducers/mangaGenreListSlice';
import animeThemeListReducer from '../reducers/animeThemeListSlice';
import mangaThemeListReducer from '../reducers/mangaThemeListSlice';
import animeDemographicListReducer from '../reducers/animeDemographicListSlice';
import mangaDemographicListReducer from '../reducers/mangaDemographicListSlice';
import listReducer from '../reducers/listSlice';
import topListReducer from '../reducers/topListSlice';
import topThreeAnimeListReducer from '../reducers/topThreeAnimeListSlice';
import topThreeMangaListReducer from '../reducers/topThreeMangaListSlice';
import searchResultReducer from '../reducers/searchResultSlice';
import archiveListReducer from '../reducers/archiveListSlice';
import lastSeasonalListReducer from '../reducers/lastSeasonalListSlice';
import nowSeasonalListReducer from '../reducers/nowSeasonalListSlice';
import upComingSeasonalListReducer from '../reducers/upComingSeasonalListSlice';
import animeFavoriteListReducer from '../reducers/animeFavoriteListSlice';
import mangaFavoriteListReducer from '../reducers/mangaFavoriteListSlice';
import animeDetailReducer from '../reducers/animeDetailSlice';
import mangaDetailReducer from '../reducers/mangaDetailSlice';
import seasonalListReducer from '../reducers/seasonalListSlice';

export const store = configureStore({
  reducer: {
    recommendedAnimeList: recommendedAnimeListReducer,
    recommendedMangaList: recommendedMangaListReducer,
    animeGenreList: animeGenreListReducer,
    mangaGenreList: mangaGenreListReducer,
    animeThemeList: animeThemeListReducer,
    mangaThemeList: mangaThemeListReducer,
    animeDemographicList: animeDemographicListReducer,
    mangaDemographicList: mangaDemographicListReducer,
    list: listReducer,
    topList: topListReducer,
    topThreeAnimeList: topThreeAnimeListReducer,
    topThreeMangaList: topThreeMangaListReducer,
    searchResult: searchResultReducer,
    archiveList: archiveListReducer,
    lastSeasonalList: lastSeasonalListReducer,
    nowSeasonalList: nowSeasonalListReducer,
    upComingSeasonalList: upComingSeasonalListReducer,
    animeFavoriteList: animeFavoriteListReducer,
    mangaFavoriteList: mangaFavoriteListReducer,
    animeDetail: animeDetailReducer,
    mangaDetail: mangaDetailReducer,
    seasonalList: seasonalListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;