import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecommendedListStateType } from '../../components/molecules/RecommendedList/type';
import { fetchRecommendedList } from '../../utils/api';
import { RootState } from '../store';

interface RecommendedMangaListState {
  value: RecommendedListStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RecommendedMangaListState = {
  value: [],
  status: 'idle',
};

export const recommendedMangaListAsync = createAsyncThunk(
  'recommendedMangaList',
  async () => {
    const data = await fetchRecommendedList('manga');
    return data;
  }
);

const recommendedMangaListSlice = createSlice({
  name: 'recommendedMangaList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recommendedMangaListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(recommendedMangaListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(recommendedMangaListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectRecommendedMangaList = (state: RootState) => state.recommendedMangaList;

export default recommendedMangaListSlice.reducer;