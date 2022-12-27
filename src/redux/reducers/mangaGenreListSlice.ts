import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GenresStateType } from '../../components/molecules/Genres/type';
import { fetchGenreList } from '../../utils/api';
import { RootState } from '../store';

interface MangaGenreListState {
  value: GenresStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MangaGenreListState = {
  value: [],
  status: 'idle',
};

export const mangaGenreListAsync = createAsyncThunk(
  'mangaGenreList',
  async () => {
    const data = await fetchGenreList('manga');
    return data;
  }
);

const mangaGenreListSlice = createSlice({
  name: 'mangaGenreList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangaGenreListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mangaGenreListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(mangaGenreListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMangaGenreList = (state: RootState) => state.mangaGenreList;

export default mangaGenreListSlice.reducer;