import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GenresStateType } from '../../components/molecules/Genres/type';
import { fetchGenreList } from '../../utils/api';
import { RootState } from '../store';

interface AnimeGenreListState {
  value: GenresStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AnimeGenreListState = {
  value: [],
  status: 'idle',
};

export const animeGenreListAsync = createAsyncThunk(
  'animeGenreList',
  async () => {
    const data = await fetchGenreList('anime');
    return data;
  }
);

const animeGenreListSlice = createSlice({
  name: 'animeGenreList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animeGenreListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(animeGenreListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(animeGenreListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAnimeGenreList = (state: RootState) => state.animeGenreList.value;

export default animeGenreListSlice.reducer;