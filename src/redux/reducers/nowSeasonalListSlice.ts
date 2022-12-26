import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SeasonalScreenStateType } from '../../screens/TopTab/Seasonal/type';
import { fetchNowSeasonalList } from '../../utils/api';
import { RootState } from '../store';

interface nowSeasonalListState {
  value: SeasonalScreenStateType[];
  seasonalName: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: nowSeasonalListState = {
  value: [],
  seasonalName: '',
  status: 'idle',
};

export const nowSeasonalListAsync = createAsyncThunk(
  'nowSeasonalList',
  async () => {
    const data = await fetchNowSeasonalList();
    return data;
  }
);

const nowSeasonalListSlice = createSlice({
  name: 'nowSeasonalList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(nowSeasonalListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(nowSeasonalListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.value;
        state.seasonalName = action.payload.seasonalName;
      })
      .addCase(nowSeasonalListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectNowSeasonalList = (state: RootState) => state.nowSeasonalList;

export default nowSeasonalListSlice.reducer;