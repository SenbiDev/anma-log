import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SeasonalScreenStateType } from '../../screens/TopTab/Seasonal/type';
import { fetchLastSeasonalList } from '../../utils/api';
import { RootState } from '../store';

interface lastSeasonalListState {
  value: SeasonalScreenStateType[];
  seasonalName: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: lastSeasonalListState = {
  value: [],
  seasonalName: '',
  status: 'idle',
};

export const lastSeasonalListAsync = createAsyncThunk(
  'lastSeasonalList',
  async () => {
    const data = await fetchLastSeasonalList();
    return data;
  }
);

const lastSeasonalListSlice = createSlice({
  name: 'lastSeasonalList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(lastSeasonalListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(lastSeasonalListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.value;
        state.seasonalName = action.payload.seasonalName;
      })
      .addCase(lastSeasonalListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectLastSeasonalList = (state: RootState) => state.lastSeasonalList;

export default lastSeasonalListSlice.reducer;