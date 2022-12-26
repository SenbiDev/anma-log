import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TopListStateType } from '../../components/molecules/TopList/type';
import { fetchTopList } from '../../utils/api';
import { RootState } from '../store';

interface topListState {
  value: TopListStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: topListState = {
  value: [],
  status: 'idle',
};

export const topListAsync = createAsyncThunk(
  'topList',
  async (types: 'anime' | 'manga') => {
    const data = await fetchTopList(types);
    return data;
  }
);

export const setTopListToInitial = createAsyncThunk(
    'setTopListToInitial',
    async () => {
        return [];
    }
)

const topListSlice = createSlice({
  name: 'topList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(topListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(topListAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setTopListToInitial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setTopListToInitial.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setTopListToInitial.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTopList = (state: RootState) => state.topList.value;

export default topListSlice.reducer;