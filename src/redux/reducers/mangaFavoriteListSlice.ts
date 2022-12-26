import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MangaFavoritesListScreenStateType } from '../../screens/TopTab/Favorites/MangaFavoritesListScreen/type';
import { fetchMangaFavoriteList } from '../../utils/api';
import { RootState } from '../store';

interface mangaFavoriteListState {
  value: MangaFavoritesListScreenStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: mangaFavoriteListState = {
  value: [],
  status: 'idle',
};

export const mangaFavoriteListAsync = createAsyncThunk(
  'mangaFavoriteList',
  async () => {
    const data = await fetchMangaFavoriteList();
    return data;
  }
);

const mangaFavoriteListSlice = createSlice({
  name: 'mangaFavoriteList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangaFavoriteListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mangaFavoriteListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(mangaFavoriteListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMangaFavoriteList = (state: RootState) => state.mangaFavoriteList.value;

export default mangaFavoriteListSlice.reducer;