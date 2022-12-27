import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThemesStateType } from '../../components/molecules/Themes/type';
import { fetchThemeList } from '../../utils/api';
import { RootState } from '../store';

interface AnimeThemeListState {
  value: ThemesStateType | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AnimeThemeListState = {
  value: [],
  status: 'idle',
};

export const animeThemeListAsync = createAsyncThunk(
  'animeThemeList',
  async () => {
    const data = await fetchThemeList('anime');
    return data;
  }
);

const animeThemeListSlice = createSlice({
  name: 'animeThemeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animeThemeListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(animeThemeListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(animeThemeListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAnimeThemeList = (state: RootState) => state.animeThemeList;

export default animeThemeListSlice.reducer;