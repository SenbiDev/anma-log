import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ArchiveListStateType } from '../../components/molecules/ArchiveList/type';
import { fetchArchiveList } from '../../utils/api';
import { RootState } from '../store';

interface archiveListState {
  value: ArchiveListStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: archiveListState = {
  value: [],
  status: 'idle',
};

export const archiveListAsync = createAsyncThunk(
  'archiveList',
  async () => {
    const data = await fetchArchiveList();
    return data;
  }
);

const archiveListSlice = createSlice({
  name: 'archiveList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(archiveListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(archiveListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(archiveListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectArchiveList = (state: RootState) => state.archiveList;

export default archiveListSlice.reducer;