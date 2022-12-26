import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AnimeFavoritesListScreenStateType } from '../../screens/TopTab/Favorites/AnimeFavoritesListScreen/type';
import { fetchAnimeFavoriteList } from '../../utils/api';
import { RootState } from '../store';

interface animeFavoriteListState {
  value: AnimeFavoritesListScreenStateType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: animeFavoriteListState = {
  value: [],
  status: 'idle',
};

export const animeFavoriteListAsync = createAsyncThunk(
  'animeFavoriteList',
  async () => {
    const data = await fetchAnimeFavoriteList();
    return data;
  }
);

const animeFavoriteListSlice = createSlice({
  name: 'animeFavoriteList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(animeFavoriteListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(animeFavoriteListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value = action.payload;
      })
      .addCase(animeFavoriteListAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectAnimeFavoriteList = (state: RootState) => state.animeFavoriteList.value;

export default animeFavoriteListSlice.reducer;