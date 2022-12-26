import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ListStateType } from '../../components/molecules/List/type';
import { fetchList } from '../../utils/api';
import { RootState } from '../store';

interface ListState {
  value: ListStateType[];
  limit: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ListState = {
  value: [],
  limit: 5,
  status: 'idle',
};

export const listAsync = createAsyncThunk(
  'list',
  async ({types, id, text}:{types: 'anime' | 'manga', id: number, text: string}) => {
    const data = await fetchList({types, id, text});
    return data;
  }
);

export const setListToInitial = createAsyncThunk(
    'setListToInitial',
    async () => {
        return [];
    }
)

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(listAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload?.list;
        state.limit = action.payload?.limit;
      })
      .addCase(listAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setListToInitial.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setListToInitial.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(setListToInitial.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectList = (state: RootState) => state.list;

export default listSlice.reducer;