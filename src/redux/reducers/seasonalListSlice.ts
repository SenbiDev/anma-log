import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SeasonalListScreenStateType } from '../../screens/Stack/SeasonalListScreen/type';
import { fetchSeasonalList } from '../../utils/api';
import { RootState } from '../store';

interface SeasonalListState {
  value: SeasonalListScreenStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: SeasonalListState = {
  value: [],
  status: 'idle',
};

export const seasonalListAsync = createAsyncThunk(
  'seasonalList',
  async ({ year, season }: { year: number, season: "fall" | "winter" | "spring" | "summer" | undefined }) => {
    const data = await fetchSeasonalList({ year, season });
    return data;
  }
);

export const setSeasonalListToInitial = createAsyncThunk(
    'setSeasonalListToInitial',
    async () => {
        return [];
    }
);

const seasonalListSlice = createSlice({
  name: 'seasonalList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(seasonalListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(seasonalListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload!!;
      })
      .addCase(seasonalListAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setSeasonalListToInitial.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      });
  },
});

export const selectSeasonalList = (state: RootState) => state.seasonalList;

export default seasonalListSlice.reducer;