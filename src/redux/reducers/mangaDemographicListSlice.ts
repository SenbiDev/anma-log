import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DemographicsStateType } from '../../components/molecules/Demographics/type';
import { fetchDemographicList } from '../../utils/api';
import { RootState } from '../store';

interface MangaDemographicListState {
  value: DemographicsStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: MangaDemographicListState = {
  value: [],
  status: 'idle',
};

export const mangaDemographicListAsync = createAsyncThunk(
  'mangaDemographicList',
  async () => {
    const data = await fetchDemographicList('manga');
    return data;
  }
);

const mangaDemographicListSlice = createSlice({
  name: 'mangaDemographicList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mangaDemographicListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(mangaDemographicListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(mangaDemographicListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectMangaDemographicList = (state: RootState) => state.mangaDemographicList;

export default mangaDemographicListSlice.reducer;