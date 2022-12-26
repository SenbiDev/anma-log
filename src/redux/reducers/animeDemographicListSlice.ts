import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DemographicsStateType } from '../../components/molecules/Demographics/type';
import { fetchDemographicList } from '../../utils/api';
import { RootState } from '../store';

interface AnimeDemographicListState {
  value: DemographicsStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AnimeDemographicListState = {
  value: [],
  status: 'idle',
};

export const animeDemographicListAsync = createAsyncThunk(
  'animeDemographicList',
  async () => {
    const data = await fetchDemographicList('anime');
    return data;
  }
);

const animeDemographicListSlice = createSlice({
  name: 'animeDemographicList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animeDemographicListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(animeDemographicListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(animeDemographicListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAnimeDemographicList = (state: RootState) => state.animeDemographicList.value;

export default animeDemographicListSlice.reducer;