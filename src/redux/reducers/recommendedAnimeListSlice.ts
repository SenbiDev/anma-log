import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RecommendedListStateType } from '../../components/molecules/RecommendedList/type';
import { fetchRecommendedList } from '../../utils/api';
import { RootState } from '../store';

interface RecommendedAnimeListState {
  value: RecommendedListStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: RecommendedAnimeListState = {
  value: [],
  status: 'idle',
};

export const recommendedAnimeListAsync = createAsyncThunk(
  'recommendedAnimeList',
  async () => {
    const data = await fetchRecommendedList('anime');
    return data;
  }
);

const recommendedAnimeListSlice = createSlice({
  name: 'recommendedAnimeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recommendedAnimeListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(recommendedAnimeListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(recommendedAnimeListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectRecommendedList = (state: RootState) => state.recommendedAnimeList;

export default recommendedAnimeListSlice.reducer;