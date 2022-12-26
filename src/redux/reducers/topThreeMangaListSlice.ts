import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TopThreeStateType } from '../../components/molecules/TopThree/type';
import { fetchTopThreeList } from '../../utils/api';
import { RootState } from '../store';

interface topThreeMangaListState {
  value: TopThreeStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: topThreeMangaListState = {
  value: [],
  status: 'idle',
};

export const topThreeMangaListAsync = createAsyncThunk(
  'topThreeMangaList',
  async () => {
    const data = await fetchTopThreeList('manga');
    return data;
  }
);

const topThreeMangaListSlice = createSlice({
  name: 'topThreeMangaList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topThreeMangaListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(topThreeMangaListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(topThreeMangaListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTopThreeMangaList = (state: RootState) => state.topThreeMangaList.value;

export default topThreeMangaListSlice.reducer;