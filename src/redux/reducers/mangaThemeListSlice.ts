import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ThemesStateType } from '../../components/molecules/Themes/type';
import { fetchThemeList } from '../../utils/api';
import { RootState } from '../store';

interface MangaThemeListState {
  value: ThemesStateType | [];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MangaThemeListState = {
  value: [],
  status: 'idle',
};

export const mangaThemeListAsync = createAsyncThunk(
  'mangaThemeList',
  async () => {
    const data = await fetchThemeList('manga');
    return data;
  }
);

const mangaThemeListSlice = createSlice({
  name: 'mangaThemeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangaThemeListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mangaThemeListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(mangaThemeListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMangaThemeList = (state: RootState) => state.mangaThemeList;

export default mangaThemeListSlice.reducer;