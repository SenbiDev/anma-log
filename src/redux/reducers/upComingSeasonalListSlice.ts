import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SeasonalScreenStateType } from '../../screens/TopTab/Seasonal/type';
import { fetchUpComingSeasonalList } from '../../utils/api';
import { RootState } from '../store';

interface upComingSeasonalListState {
  value: SeasonalScreenStateType[];
  seasonalName: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: upComingSeasonalListState = {
  value: [],
  seasonalName: '',
  status: 'idle',
};

export const upComingSeasonalListAsync = createAsyncThunk(
  'upComingSeasonalList',
  async () => {
    const data = await fetchUpComingSeasonalList();
    return data;
  }
);

const upComingSeasonalListSlice = createSlice({
  name: 'upComingSeasonalList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upComingSeasonalListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(upComingSeasonalListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload.value;
        state.seasonalName = action.payload.seasonalName;
      })
      .addCase(upComingSeasonalListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUpComingSeasonalList = (state: RootState) => state.upComingSeasonalList;

export default upComingSeasonalListSlice.reducer;