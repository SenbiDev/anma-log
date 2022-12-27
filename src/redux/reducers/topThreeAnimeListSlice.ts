import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TopThreeStateType } from '../../components/molecules/TopThree/type';
import { fetchTopThreeList } from '../../utils/api';
import { RootState } from '../store';

interface topThreeAnimeListState {
  value: TopThreeStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: topThreeAnimeListState = {
  value: [],
  status: 'idle',
};

export const topThreeAnimeListAsync = createAsyncThunk(
  'topThreeAnimeList',
  async () => {
    const data = await fetchTopThreeList('anime');
    return data;
  }
);

const topThreeAnimeListSlice = createSlice({
  name: 'topThreeAnimeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topThreeAnimeListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(topThreeAnimeListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(topThreeAnimeListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTopThreeAnimeList = (state: RootState) => state.topThreeAnimeList;

export default topThreeAnimeListSlice.reducer;